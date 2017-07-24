module.exports = function (grunt) {

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            default: {
                src: [
                    './public/scripts/*',
                    './public/styles/*'
                ]
            },
            scripts: { src: ['./public/scripts/*'] },
            styles: { src: ['./public/styles/*'] }
        },

        sasslint: {
            options: {
                configFile: './.sass-lint.yml',
            },
            target: ['./app/styles/**/*.scss']
        },

        sass: {
            prod: {
                options: { sourcemap : 'none' },
                dist: {
                    files: {
                        './public/styles/uptimey.min.css' : './app/styles/main.scss'
                    }
                }
            },
            dev: {
                dist: {
                    files: {
                        './public/styles/uptimey.min.css' : './app/styles/main.scss'
                    }
                }
            }
        },

        autoprefixer: {
            prod: {
                options: { browsers : ['last 4 versions'] },
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
                        './bower_components/spectre/docs/dist/spectre.css',
                        './bower_components/animate.css/animate.css'
                    ]
                }
            },
            dev: {
                options: { sourceMap: true },
                files: {
                    './public/styles/uptimey.min.css': './public/styles/uptimey.min.css',
                    './public/styles/vendor.min.css': [
                        './bower_components/normalize-css/normalize.css',
                        './bower_components/spectre/docs/dist/spectre.css',
                        './bower_components/animate.css/animate.css'
                    ]
                }
            }
        },

        eslint: {
            options: {
                configFile: './.eslintrc.js',
            },
            target: ['./app/**/*.js']
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

        puglint: {
            default: {
                options: {
                    extends: '.pug-lintrc'
                },
                src: ['./app/**/*.pug']
            }
        },

        watch: {
            options: {
                atBegin: true,
                livereload: true
            },
            scripts: {
                files: ['./app/**/*.js'],
                tasks: [
                    'clean:scripts',
                    'eslint',
                    'browserify:dev',
                    'uglify:dev'
                ]
            },
            styles: {
                files: ['./app/styles/**/*.scss'],
                tasks: [
                    'clean:styles',
                    'sasslint',
                    'sass:dev',
                    'autoprefixer',
                    'cssmin:dev'
                ]
            },
            templates: {
                files: ['./app/templates/**/*.pug'],
                tasks: ['puglint']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-sass-lint');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-puglint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', ['eslint', 'sasslint', 'puglint']);
    grunt.registerTask('dev', [
        'clean',
        'sasslint',
        'sass:dev',
        'autoprefixer',
        'cssmin:dev',
        'eslint',
        'browserify:dev',
        'uglify:dev',
        'puglint'
    ]);
    grunt.registerTask('default', [
        'clean',
        'sasslint',
        'sass:prod',
        'autoprefixer',
        'cssmin:prod',
        'eslint',
        'browserify:prod',
        'uglify:prod',
        'puglint'
    ]);
};