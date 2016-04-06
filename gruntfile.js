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
                    'index.html': 'core/client/lib/template/mainview.html'
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
        concat: {
            dist: {
                src  : ['core/client/lib/js/actioncontroller.js', 'core/client/lib/js/initcontroller.js'],
                dest : 'core/dest/js/app.min.js'
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
            files: ['core/client/lib/template/*.html', 'core/client/lib/style/*.scss', 'core/client/lib/js/*.js'],
            tasks: ['htmlmin', 'sass', 'concat', 'uglify']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['htmlmin', 'sass', 'concat', 'uglify']);
};