module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    minifyJS: true
                },
                files: {
                    'index.html': 'core/template/main.html'
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'core/dest/css/screen.min.css' : 'core/sass/screen.scss'
                }
            }
        },
        concat: {
            dist: {
                src: ['core/js/functions.js', 'core/js/base.js'],
                dest: 'core/dest/js/app.min.js',
            },
        },
        uglify: {
            js: {
                files: {
                    'core/dest/js/app.min.js': ['core/dest/js/app.min.js']
                }
            }
        },
        watch: {
            files: ['core/template/*', 'core/sass/*', 'core/js/*'],
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