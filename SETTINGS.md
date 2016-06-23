Settings
===

If you want to change the way uptimey behaves and looks you can use the `/bin/settings.json` file. This file once modified will adjust various things.

Below are the things that can be modified and the explanation to each one of them.

File structure
---

By default this is how the file should look. By removing any of the lines, you might break the app.

```
{
    "background_color" : "",
    "background_image" : "",
    "buttons": [{
        "refresh"     : true,
        "advanced"    : true,
        "twitter"     : true,
        "google-plus" : false,
        "facebook"    : false,
        "screenshot"  : true
    }],
    "debug_mode"       : false,
    "default_view"     : "default",
    "display_timezone" : "Europe/Bucharest",
    "font_color"       : "",
    "font_family"      : "",
    "menu_placement"   : "top",
    "remove_menu"      : false, 
    "show_am_pm"       : true,
    "show_location"    : true,
    "show_menu_always" : false,
    "use_24h_clock"    : false
}
```

Parameters
---

```
background_color
```
**(string) (optional)** You can set the desired background color for the app in a HEX or RGB format.

**Default**: empty

---

```
background_image
```
**(string) (optional)** By default the app uses a random image from [Unsplash](http://unsplash.com) but you can specify an URL to another image.

**Default**: empty

---

```
buttons
```
**(bool) (required)** If you want you can disable or enable one of the buttons in the top menu using a boolean value. Available buttons are: refresh, advanced, twitter, google-plus, facebook, screenshot.

**Default**:

```
"refresh"     : true,
"advanced"    : true,
"twitter"     : true,
"google-plus" : false,
"facebook"    : false,
"screenshot"  : true
```

---

```
debug_mode
```
**(bool) (optional)** You can enable the debug mode for the app.

**Default**: false

---

```
default_view
```
**(string) (required)** Changed the default view of the app. Available options include: default, advanced.

**Default**: default

---

```
display_timezone
```
**(string) (required)** Set the display timezone for all dates and time featured in the app. You can use the timezones featured [here](http://php.net/manual/en/timezones.php).

**Default**: Europe/Bucharest

---

```
font_color
```
**(string) (optional)** You can set the desired font color for the app in a HEX or RGB format.

**Default**: empty

---

```
font_family
```
**(string) (optional)** You can set the desired font family for the app.

**Default**: empty

---

```
menu_placement
```
**(string) (required)** Set the default placement for the top menu. Available options include: top, bottom, left, right.

**Default**: top

---

```
remove_menu
```
**(bool) (optional)** Remove the main buttons menu entirely.

**Default**: false

---

```
show_am_pm
```
**(bool) (required)** Use this to show or hide the AM / PM operators when showing the time.

**Default**: true

---

```
show_location
```
**(bool) (required)** If you want to show or hide the location of your server you can use this parameter.

**Default**: true

---

```
show_menu_always
```
**(bool) (optional)** Use this parameter if you want to main button menu to be always toggled and opened.

**Default**: false

---

```
use_24h_clock
```
**(bool) (optional)** You can show the clock in a 24h format if you don't want to show it in a 12h format.

**Default**: false
