module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'core/dest/css/screen.min.css': 'core/sass/screen.scss'
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
            files: ['core/sass/*', 'core/js/*'],
            tasks: ['sass', 'concat', 'uglify']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['sass', 'concat', 'uglify']);
};