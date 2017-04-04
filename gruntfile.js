module.exports = function(grunt) {

    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            prod: {
                src: [
                    './public/styles/*',
                    './public/scripts/*'
                ]
            }
        },

        sass: {
            prod: {
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
            prod: {
                options: {
                    browsers : ['last 4 versions']
                },
                files: {
                    './public/styles/uptimey.min.css' : './public/styles/uptimey.min.css'
                },
            },
        },

        cssmin: {
            prod: {
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
            options: {
                jshintrc: true
            },
            dev: {
                options: {
                    debug: true
                },
                src: [
                    './app/helpers/**/*.js',
                    './app/controllers/**/*.js',
                    './app/app.js',
                ]
            },
            prod: {
                options: {
                    debug: false
                },
                src: [
                    'Gruntfile.js',
                    './app/helpers/**/*.js',
                    './app/controllers/**/*.js',
                    './app/app.js',
                ]
            }
        },

        puglint: {
            default: {
                options: {
                    extends: '.pug-lintrc'
                },
                src: ['./app/templates/**/*.pug']
            }
        },

        browserify: {
            dev: {
                options: {
                    browserifyOptions: { debug: true },
                    transform: [
                        ['babelify', {
                            presets: ['es2015'],
                            sourceMaps: true
                        }]
                    ]
                },
                files: {
                    './public/scripts/uptimey.min.js': [
                        './app/helpers/**/*.js',
                        './app/controllers/**/*.js',
                        './app/app.js',
                    ]
                }
            },
            prod: {
                options: {
                    browserifyOptions: { debug: false },
                    transform: [
                        ['babelify', {
                            presets: ['es2015'],
                            sourceMaps: false
                        }]
                    ]
                },
                files: {
                    './public/scripts/uptimey.min.js': [
                        './app/helpers/**/*.js',
                        './app/controllers/**/*.js',
                        './app/app.js',
                    ]
                }
            }
        },

        uglify: {
            dev: {
                options: {
                    mangle: {},
                    screwIE8: true,
                    sourceMap: true,
                },
                files: {
                    './public/scripts/uptimey.min.js': [
                        './public/scripts/uptimey.min.js'
                    ]
                }
            },
            prod: {
                options: {
                    mangle: {},
                    screwIE8: true,
                    preserveComments: false,
                    compress: {
                        drop_console: true
                    },
                    sourceMap: false,
                },
                files: {
                    './public/scripts/uptimey.min.js': [
                        './public/scripts/uptimey.min.js'
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
            tasks: [
                'clean',
                'sass:dev',
                'autoprefixer',
                'cssmin:dev',
                'browserify:dev',
                'jshint:dev',
                'puglint',
                'uglify:dev'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-puglint');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', ['clean', 'jshint:dev', 'puglint']);
    grunt.registerTask('dev', [
        'clean',
        'sass:dev',
        'autoprefixer',
        'cssmin:dev',
        'jshint:dev',
        'puglint',
        'browserify:dev',
        'uglify:dev'
    ]);
    grunt.registerTask('default', [
        'clean',
        'sass:prod',
        'autoprefixer',
        'cssmin:prod',
        'jshint:prod',
        'puglint',
        'browserify:prod',
        'uglify:prod'
    ]);

    grunt.registerTask('server', 'Start a custom web server', function() {
        grunt.log.writeln('Started web server on port 3000');
        require('./app/index.js').listen(3000);
    });
};