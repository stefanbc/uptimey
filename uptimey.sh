#!/usr/bin/env fish
#
# # uptimey - uptimey management script
#

if test (count $argv) -lt 1
    echo ""
    echo "uptimey command required. See the following command for help"
    echo "./uptimey help"
    echo ""
else
  switch $argv[1]
    case "help"
        echo ""
        echo "Commands:"
        echo ""
        echo "init # Initialize uptimey"
        echo ""
        echo "Example of uptimey init command:"
        echo ""
        echo "./uptimey.sh install"
        echo ""
    exit 0

    case "init"
        echo ""
        if test $argv[2] = "latest"
            echo "Getting the latest uptimey version"
            and git pull
        end
        and echo ""

        and echo "Installing dependencies"
        and rm -rf node_modules
        and rm -rf bower_components
        and rm -rf .sass-cache
        and rm npm-debug.log
        and npm cache clean

        and npm install --production
        and bower install
        and grunt
        and echo ""

        and echo "Starting uptimey"
        and npm start
        and echo ""

        or begin
            set -l err $status
            echo "uptimey init encountered an error. Exit status: $err."
            exit $err
        end
    exit 0
  end
end