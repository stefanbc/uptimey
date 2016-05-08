<?php
// Check if it is an ajax request
if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest')
    die('No direct access allowed!');

function readConfig($returnObject = false, $property){
    $file       = file_get_contents('../../bin/settings.json');
    $jsonObject = json_decode($file, true);
    
    if ($returnObject) {
        return $jsonObject;
    } else {
        return $jsonObject[$property];
    }
}

// Get the type of request
$action = $_REQUEST['action'];
// Get flag if it's set for exception
$flag = $_REQUEST['flag'];

// If it's been less than a minute between request, kill the execution but display last saved uptime or picture
session_start();
if (!empty($_SESSION['last']) && time() - $_SESSION['last'] < 60 && empty($flag)) {
    if ($action == 'image')
        echo $_SESSION['image'];
    elseif ($action == 'location')
        echo $_SESSION['location'];
    elseif ($action == 'uptime')
        echo $_SESSION['uptime'];
    elseif ($action == 'time')
        echo $_SESSION['time'];
    die();
}

$configTimezone = readConfig(false, 'display_timezone');
if (isset($configTimezone) && !empty($configTimezone)) {
    date_default_timezone_set($configTimezone);
}

switch($action){
    case 'override':
        $configObject = readConfig(true);
        echo json_encode($configObject);
    break;
    case 'image':
        // Get image from config file
        $configImage = readConfig(false, 'background_image');
        // Check if it's set
        if (isset($configImage) && !empty($configImage)) {
            // Set it
            $getImage = $configImage;
        } else {
            // Load random image from Unsplash
            $getImage = 'https://source.unsplash.com/category/nature/1366x768';
        }
        // Return the image
        echo $getImage;
        // Set the session image
        $_SESSION['image'] = $getImage . ';session;';
    break;
    case 'location':
        // Get the IP
        // From third party
        $getIP = shell_exec('wget -qO- ifconfig.co');
        // Backup
        if (empty($getIP)) {
            // Using PHP var
            $getIP = gethostbyname($_SERVER['SERVER_NAME']);
        }
        // Check for localhost
        if ($getIP == "127.0.0.1") {
            // Execute command that feteches IP without sudo
            $getIP = trim(shell_exec('dig +short myip.opendns.com @resolver1.opendns.com'));
        }
        // Return it
        echo $getIP;
        // Set the session for location
        $_SESSION['location'] = $getIP;
    break;
    case 'uptime':
        // Execute the uptime command
        // Get the seconds, minutes, hours
        // Different methods of getting uptime based on OS
        switch(PHP_OS) {
            case 'Linux':
                $totalSeconds = trim(shell_exec('/usr/bin/cut -d. -f1 /proc/uptime'));
            break;
            case 'Darwin':
                $totalSeconds = time() - shell_exec('sysctl -n kern.boottime | cut -d \',\' -f1 | cut -d \'=\' -f2');
            break;
            case 'WINNT':
                $statistics = shell_exec('net statistics workstation');
                $statistics = strtotime(substr($statistics,strpos($statistics,'Statistics since ') + 17, 19));
                $totalSeconds = time() - $statistics;
            break;
            default:
                $totalSeconds = 0;
        }

        $totalMin   = $totalSeconds / 60;
        $totalHours = $totalMin / 60;
        // Calculate the proper times
        $days  = floor($totalHours / 24);
        $hours = floor($totalHours - ($days * 24));
        $min   = floor($totalMin - ($days * 60 * 24) - ($hours * 60));
        // Output each of them
        $formatUptime = '';
        // Days
        if ($days != 0)
            $formatUptime .= $days . ";";
        else
            $formatUptime .= "0;";
        // Hours
        if ($hours != 0)
            $formatUptime .= $hours . ";";
        else
            $formatUptime .= "0;";
        // Minutes
        if ($min != 0)
            $formatUptime .= $min . ";";
        else
            $formatUptime .= "0;";
        // Return the formated time
        echo $formatUptime;
        // Set last response
        $_SESSION['uptime'] = $formatUptime . "session;";
        $_SESSION['uptimeSeconds'] = $totalSeconds;
    break;
    case 'time':
        // Get time format from config file
        $configTime = readConfig(true);
        // Pretty server date
        $currentDate = date("F j, Y");
        // Pretty server time
        if ($configTime['use_24h_clock']) {
            $currentTime = date("G:i ");
        } else {
            $currentTime = date("g:i ");
        }
        if ($configTime['show_am_pm']) {
            $currentTime .= date("a");
        }
        // What's the date the server went online
        $sinceDate = date("F j, Y", time() - $_SESSION['uptimeSeconds']);
        // Return the server times
        echo $currentDate . ';' . $currentTime . ';' . $sinceDate;
        // Set the session
        $_SESSION['time'] = $currentDate . ';' . $currentTime . ';' . $sinceDate . ';session;';
        // Set last time the request was sent
        if (empty($flag)) {
            $_SESSION['last'] = time();
        }
    break;
    case 'advanced':
        // Set a notification for in dev section
        echo "Hostname: " . shell_exec('/bin/hostname') . "<br>";
        echo "OS: " . shell_exec('/usr/bin/lsb_release -ds;/bin/uname -r')  . "<br>";
        echo "External IP: " . shell_exec('wget -qO- ifconfig.co') . "<br>";
        echo "<br>";
        echo "Checkout the <a href='https://github.com/stefanbc/uptimey/tree/dev' target='_blank'>dev branch</a> for more info.</span>";
    break;
    case 'clear':
        unset($_SESSION['last']);
        unset($_SESSION['uptime']);
        unset($_SESSION['time']);
        session_unset();
        session_destroy();
    break;
    case 'ping':
        $server = 'localhost';
        $port = '80';
        $status = 'unavailable';
        $fp = @fsockopen($server, $port, $errno, $errstr, 5);
        if ($fp) {
            $status = 'alive, but not responding';
            fwrite($fp, "HEAD / HTTP/1.0\r\n");
            fwrite($fp, "Host: $server:$port\r\n\r\n");
            if (strlen(@fread($fp, 1024)) > 0) {
                $status = 'alive and kicking';
            }
            fclose($fp);
        }
        echo "The server is $status.";
    break;
}
?>