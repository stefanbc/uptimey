module.exports = function(grunt) {

    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: {
                src: [
                    './public/styles/*',
                    './public/scripts/*'
                ]
            }
        },

        sass: {
            build: {
                options: {
                    sourcemap : 'none'
                },
                files: {
                    './public/styles/uptimey.min.css' : './app/styles/main.scss'
                }
            },
            dev: {
                files: {
                    './public/styles/uptimey.min.css' : './app/styles/main.scss'
                }
            }
        },

        autoprefixer: {
            build: {
                options: {
                    browsers : ['last 4 versions']
                },
                files: {
                    './public/styles/uptimey.min.css' : './public/styles/uptimey.min.css'
                },
            },
        },

        cssmin: {
            build: {
                files: {
                    './public/styles/uptimey.min.css': './public/styles/uptimey.min.css',
                    './public/styles/vendor.min.css': [
                        './bower_components/normalize-css/normalize.css',
                        './bower_components/spectre.css/dist/spectre.css',
                        './bower_components/animate.css/animate.css'
                    ]
                }
            },
            dev: {
                options: {
                    sourceMap: true
                },
                files: {
                    './public/styles/uptimey.min.css': './public/styles/uptimey.min.css',
                    './public/styles/vendor.min.css': [
                        './bower_components/normalize-css/normalize.css',
                        './bower_components/spectre.css/dist/spectre.css',
                        './bower_components/animate.css/animate.css'
                    ]
                }
            }
        },

        jshint: {
            files: [
                'Gruntfile.js',
                './app/helpers/**/*.js',
                './app/controllers/**/*.js',
                './app/app.js',
            ],
            options: {
                jshintrc: true
            }
        },

        browserify: {
            build: {
                files: {
                    './public/scripts/uptimey.min.js': [
                        './app/helpers/**/*.js',
                        './app/controllers/**/*.js',
                        './app/app.js',
                    ]
                }
            }
        },

        watch: {
            options: {
                atBegin: true,
                livereload: true
            },
            files: [
                './app/controllers/**/*.js',
                './app/helpers/**/*.js',
                './app/app.js',
                './app/styles/**/*.scss',
                './app/templates/**/*.pug',
            ],
            tasks: ['clean:build', 'sass:dev', 'autoprefixer:build', 'cssmin:dev', 'browserify', 'jshint']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', ['clean', 'jshint']);
    grunt.registerTask('dev', ['clean', 'sass:dev', 'autoprefixer', 'cssmin:dev', 'jshint', 'browserify']);
    grunt.registerTask('default', ['clean', 'sass:build', 'autoprefixer', 'cssmin:build', 'jshint', 'browserify']);

    grunt.registerTask('server', 'Start a custom web server', function() {
        grunt.log.writeln('Started web server on port 3000');
        require('./app/index.js').listen(3000);
    });
};