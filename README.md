uptimey 
=======

[![Build Status](https://travis-ci.org/stefanbc/uptimey.svg?branch=dev)](https://travis-ci.org/stefanbc/uptimey) [![Dependency Status](https://www.versioneye.com/user/projects/572c7efaa0ca35004cf77288/badge.svg?style=flat)](https://www.versioneye.com/user/projects/572c7efaa0ca35004cf77288)

If you're proud of your server uptime, because you put a lot of time into configuring it, then you can showcase it with **uptimey** - a beautiful Server Uptime Monitor!

Just clone the repo on your web server and then access your server's host followed by `/uptimey`, in your browser. Simple as that!

Features
--

* The background image is a random image from [Unsplash](http://unsplash.com)!
* Works on Linux, Windows, Mac OS servers.
* Automatically gathers data from the server.
* Knows if it's nighttime or daytime.
* Knows your aprox server location (based on IP).
* Tweet your awesome uptime!
* Screenshot the server uptime and show it to your devops buddies! :)
* Configure it to your liking. You can modify the `client/bin/settings.json` file.

![Screenshot](https://i.imgur.com/BdIzEkg.png)

Requirements
--

* Apache server
* PHP
* Access to the Internet

Developers
--

Make sure you have Node and npm installed. You'll need to have Grunt and Sass installed. Use these commands:

```
npm install -g grunt-cli
gem install sass
```

You can then install all the project dependencies using:

```
npm install
```

Available Grunt tasks:

* `grunt` - will build the whole project.
* `grunt watch` - will watch for any file modifications and will build. Will also build on start.
* `grunt test` - will test the main app js file using `jshint` (more tests are comming soon).

For local development you can use Vagrant and you can check if the build passes using Travis-CI.
