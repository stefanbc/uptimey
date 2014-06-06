<?php

$totalSeconds = shell_exec("/usr/bin/cut -d. -f1 /proc/uptime");
$totalMin   = $totalSeconds / 60;
$totalHours = $totalMin / 60;

$days  = floor($totalHours / 24);
$hours = floor($totalHours - ($days * 24));
$min   = floor($totalMin - ($days * 60 * 24) - ($hours * 60));

$formatUptime = '';
if ($days != 0) {
    $formatUptime .= "<span class='days'>$days days </span>";
}

if ($hours != 0) {
    $formatUptime .= "<span class='hours'>$hours hours </span>";
}

if ($min != 0) {
    $formatUptime .= "<span class='minutes'>$min minutes</span>";
}

echo $formatUptime;

?>