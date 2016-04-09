module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    minifyJS: true,
                    removeComments: true
                },
                files: {
                    'index.html': 'core/client/lib/view/mainview.html'
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'core/dest/css/global.min.css' : 'core/client/lib/style/global.scss'
                }
            }
        },
        coffee: {
            compileJoined: {
                options: {
                    join : true
                },
                files: {
                    'core/dest/js/app.min.js': ['core/client/lib/*.coffee']
                }
            }  
        },
        uglify: {
            js: {
                files: {
                    'core/dest/js/app.min.js': ['core/dest/js/app.min.js']
                }
            }
        },
        watch: {
            files: ['core/client/lib/view/*.html', 'core/client/lib/style/*.scss', 'core/client/lib/*.coffee'],
            tasks: ['htmlmin', 'sass', 'coffee', 'uglify']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['htmlmin', 'sass', 'coffee', 'uglify']);
};