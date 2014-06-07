<?php

/*
Uptimey - https://github.com/stefanbc/uptimey

Licensed under the MIT license

Copyright (c) 2014 Stefan Cosma

Permission is hereby granted, free of charge, to any person obtaining a copy 
of this software and associated documentation files (the "Software"), to deal 
in the Software without restriction, including without limitation the rights to 
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of 
the Software, and to permit persons to whom the Software is furnished to do so, 
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all 
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE 
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/* Get the type of request */
$type = $_GET['type'];

switch($type){
    case 'image':
        // Load the XML file from Bing
        $bingImage = simplexml_load_file('http://www.bing.com/HPImageArchive.aspx?format=xml&idx=0&n=1&mkt=en-US');
        // Return the image and copyrightto jQuery
        echo 'http://www.bing.com' . $bingImage->image->urlBase. '_1366x768.jpg;' . $bingImage->image->copyright;
    break;
    case 'uptime':
        /* Based on linux-dashboard (https://github.com/afaqurk/linux-dash) */
        // Execute the uptime command
        // Get the seconds, minutes, hours
        $totalSeconds = shell_exec("/usr/bin/cut -d. -f1 /proc/uptime");
        $totalMin   = $totalSeconds / 60;
        $totalHours = $totalMin / 60;
        
        // Calculte the proper times
        $days  = floor($totalHours / 24);
        $hours = floor($totalHours - ($days * 24));
        $min   = floor($totalMin - ($days * 60 * 24) - ($hours * 60));
        
        // OUtput each of them
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
    break;
}
?>