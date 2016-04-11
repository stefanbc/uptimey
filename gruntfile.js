module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jade: {
            compile: {
                files: {
                    'index.html': 'core/client/lib/views/index.jade'
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'core/build/css/global.min.css' : 'core/client/lib/style/global.scss'
                }
            }
        },
        coffee: {
            compileJoined: {
                options: {
                    join : true
                },
                files: {
                    'core/build/app.min.js': 
                    [
                        'core/client/lib/helpers/*.coffee', 
                        'core/client/lib/controllers/*.coffee'
                    ]
                }
            }  
        },
        uglify: {
            js: {
                files: {
                    'core/build/app.min.js': ['core/build/app.min.js']
                }
            }
        },
        watch: {
            files: [
                'core/client/lib/controllers/*.coffee',
                'core/client/lib/helpers/*coffee',
                'core/client/lib/style/*.scss',
                'core/client/lib/views/*.jade'
            ],
            tasks: ['jade', 'sass', 'coffee', 'uglify']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['jade', 'sass', 'coffee', 'uglify']);
};