# uptimey
> Simple server uptime monitor

[![Build Status](https://travis-ci.org/stefanbc/uptimey.svg?branch=master)](https://travis-ci.org/stefanbc/uptimey) [![Dependency Status](https://dependencyci.com/github/stefanbc/uptimey/badge)](https://dependencyci.com/github/stefanbc/uptimey) [![Code Climate](https://codeclimate.com/github/stefanbc/uptimey/badges/gpa.svg)](https://codeclimate.com/github/stefanbc/uptimey)

With **uptimey** you can easily monitor your server's uptime. It will output usefull data that you might need during your day, while you intereact with your server. Don't believe me, check out the screenshot bellow.

**Import note:** it works on systems that run macOS, Linux and Windows.

![Screenshot](http://i.imgur.com/bxBd87M.png)

## Prerequisites

You will need the following things properly installed on your machine.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/)
* [Yarn](https://yarnpkg.com/en/)

## Installation

* `git clone git@github.com:stefanbc/uptimey.git` this repository
* `cd uptimey`
* `yarn install`

## Running

* `yarn start`
* Open [http://localhost:3000](http://localhost:3000) and behold uptimey in all it's simple glory.

or alternatively you can keep it alive permanantly by using these commands:

* `yarn add pm2 -g`
* `pm2 start yarn -- start`

For more info checkout the [pm2 repo](https://github.com/Unitech/pm2).

## Development

You'll need to have Grunt installed. Use these commands:

* `npm install -g grunt-cli`

### Running Tests

* `grunt test`

### Building

* `grunt dev` (development)
* `grunt` (production)

## Meta

Stefan Cosma – [@stefanbc](https://twitter.com/stefanbc) – uptimey@stefancosma.xyz

Distributed under the MIT license. See ``LICENSE`` for more information.
