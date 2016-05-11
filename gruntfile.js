module.exports = function(grunt) {

    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jade: {
            compile: {
                files: {
                    'index.html': 'client/lib/views/index.jade'
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style     : 'compressed',
                    sourcemap : 'none'
                },
                files: {
                    'client/bin/css/global.min.css' : 'client/lib/style/*.scss'
                }
            }
        },
        coffee: {
            compileJoined: {
                options: {
                    join : true
                },
                files: {
                    'client/bin/app.min.js': 
                    [
                        'client/lib/helpers/*.coffee', 
                        'client/lib/controllers/*.coffee'
                    ]
                }
            }  
        },
        uglify: {
            js: {
                files: {
                    'client/bin/app.min.js': ['client/bin/app.min.js']
                }
            }
        },
        jshint: {
            files: ['gruntfile.js', 'client/bin/app.min.js'],
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
                'client/lib/controllers/*.coffee',
                'client/lib/helpers/*coffee',
                'client/lib/style/*.scss',
                'client/lib/views/*.jade',
                'client/lib/views/panels/*.jade'
            ],
            tasks: ['jade', 'sass', 'coffee', 'uglify']
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('test', ['coffee', 'jshint', 'uglify']);
    grunt.registerTask('default', ['jade', 'sass', 'coffee', 'jshint', 'uglify']);
};