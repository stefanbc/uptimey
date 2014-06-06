<?php

if($_GET['type'] == 'image'){
    
    $bingImage = simplexml_load_file('http://www.bing.com/HPImageArchive.aspx?format=xml&idx=0&n=1&mkt=en-US');
    echo 'http://www.bing.com' . $bingImage->image->urlBase. '_1366x768.jpg;' . $bingImage->image->copyright;
    
} else {
    $totalSeconds = shell_exec("/usr/bin/cut -d. -f1 /proc/uptime");
    $totalMin   = $totalSeconds / 60;
    $totalHours = $totalMin / 60;
    
    $days  = floor($totalHours / 24);
    $hours = floor($totalHours - ($days * 24));
    $min   = floor($totalMin - ($days * 60 * 24) - ($hours * 60));
    
    $formatUptime = '';
    if ($days != 0) {
        $formatUptime .= $days . ";";
    } else {
        $formatUptime .= "0;";
    }
    
    if ($hours != 0) {
        $formatUptime .= $hours . ";";
    } else {
        $formatUptime .= "0;";
    }
    
    if ($min != 0) {
        $formatUptime .= $min . ";";
    } else {
        $formatUptime .= "0;";
    }
    
    echo $formatUptime;
}

?>