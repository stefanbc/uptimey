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
        coffee: {
            compileJoined: {
                options: {
                    join: true
                },
                files: {
                    'core/dest/js/app.min.js': ['core/coffee/*.coffee']
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
            files: ['core/template/*', 'core/sass/*', 'core/coffee/*'],
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