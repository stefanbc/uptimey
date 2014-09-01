module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: 'sass',
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.min.css'
                }]
            }
        },
        uglify: {
            js: {
                files: {
                    'script/base.min.js': ['script/base.js'],
                    'script/functions.min.js': ['script/functions.js']
                }
            }
        },
        watch: {
            files: ['sass/*', 'script/*'],
            tasks: ['sass', 'uglify']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['sass', 'uglify:js']);
};