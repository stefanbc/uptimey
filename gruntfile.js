module.exports = function(grunt) {

    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        clean: {
            build: {
                src: [
                    'bin/css/style.min.css',
                    'bin/js/app.min.js'
                ]
            },
            test: {
                src: ['bin/js/app.min.js']
            }
        },
        
        jade: {
            build: {
                files: {
                    'index.html': 'lib/views/index.jade'
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
                    'bin/css/style.min.css' : 'lib/style/index.scss'
                }
            },
            dev: {
                options: {
                    style     : 'expanded'
                },
                files: {
                    'bin/css/style.min.css' : 'lib/style/index.scss'
                }
            }
        },
        
        coffee: {
            build: {
                options: {
                    join : true
                },
                files: {
                    'bin/js/app.min.js': 
                    [
                        'lib/helpers/*.coffee', 
                        'lib/controllers/*.coffee'
                    ]
                }
            }  
        },
        
        uglify: {
            build: {
                files: {
                    'bin/js/app.min.js': ['bin/js/app.min.js']
                }
            }
        },
        
        jshint: {
            files: ['gruntfile.js', 'bin/js/app.min.js'],
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
                'lib/helpers/*.coffee',
                'lib/controllers/*.coffee',
                'lib/style/*.scss',
                'lib/views/*.jade',
                'lib/views/layouts/*.jade'
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