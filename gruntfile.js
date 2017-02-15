module.exports = function(grunt) {

    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: {
                src: [
                    './dist/css/*',
                    './dist/js/app.min.js',
                    './dist/index.html'
                ]
            },
            test: {
                src: ['./dist/js/app.min.js']
            }
        },

        jade: {
            build: {
                files: {
                    './dist/index.html': './app/templates/index.jade'
                }
            }
        },

        sass: {
            build: {
                options: {
                    style     : 'compressed',
                    sourcemap : 'none'
                },
                files: {
                    './dist/css/style.min.css' : './app/styles/index.scss'
                }
            },
            dev: {
                options: {
                    style     : 'expanded'
                },
                files: {
                    './dist/css/style.min.css' : './app/styles/index.scss'
                }
            }
        },

        coffee: {
            build: {
                options: {
                    join : true
                },
                files: {
                    './dist/js/app.min.js':
                    [
                        './app/helpers/*.coffee',
                        './app/controllers/*.coffee'
                    ]
                }
            }
        },

        uglify: {
            build: {
                files: {
                    './dist/js/app.min.js': ['./dist/js/app.min.js']
                }
            }
        },

        jshint: {
            files: ['gruntfile.js', './dist/js/app.min.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },

        watch: {
            options: {
                atBegin: true
            },
            files: [
                './app/helpers/*.coffee',
                './app/controllers/*.coffee',
                './app/styles/*.scss',
                './app/templates/*.jade'
            ],
            tasks: ['clean:build', 'jade', 'sass:dev', 'coffee', 'uglify']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', ['clean:test', 'coffee', 'jshint', 'uglify']);
    grunt.registerTask('default', ['clean:build', 'jade', 'sass:build', 'coffee', 'jshint', 'uglify']);
};