<?php

/*
Uptimey - https://github.com/stefanbc/uptimey

Licensed under the MIT license

Copyright (c) 2014 Stefan Cosma

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// Check if it is an ajax request
if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest')
    die('No direct access allowed!');

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

switch($action){
    case 'image':
        // Load the XML file from Bing
        $bingImage = simplexml_load_file('http://www.bing.com/HPImageArchive.aspx?format=xml&idx=0&n=1&mkt=en-US');
        // Return the image and copyright to jQuery
        echo 'http://www.bing.com' . $bingImage->image->urlBase. '_1366x768.jpg;' . $bingImage->image->copyright;
        // Set session
        $_SESSION['image'] = 'http://www.bing.com' . $bingImage->image->urlBase. '_1366x768.jpg;' . $bingImage->image->copyright  . ';session;';
    break;
    case 'location':
        // Get the IP
        if(function_exists('curl_version')) {
            // From third party
            $getIP = shell_exec('curl http://ipecho.net/plain; echo');
        } else {
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
        /* Initialy Based on linux-dashboard (https://github.com/afaqurk/linux-dash) */
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
        if ($days != 0)
            $formatUptime .= $days . ";";
        else
            $formatUptime .= "0;";
        
        if ($hours != 0)
            $formatUptime .= $hours . ";";
        else
            $formatUptime .= "0;";
        
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
        // Pretty server date
        $currentDate = date("F j, Y");
        // Pretty server time
        $currentTime = date("g:i a");
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
        echo "<span class='notif fa fa-warning'>This section is in development. Checkout the <a href='https://github.com/stefanbc/uptimey/tree/dev' target='_blank'>dev branch</a> for more info.</span>";
    break;
    case 'clear':
        unset($_SESSION['last']);
        unset($_SESSION['uptime']);
        unset($_SESSION['time']);
        session_unset();
        session_destroy();
    break;
}
?>