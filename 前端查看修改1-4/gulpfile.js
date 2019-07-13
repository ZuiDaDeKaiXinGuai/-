var gulp = require('gulp');
var webser = require('gulp-webserver');

gulp.task('webser', function() {
    return gulp.src('./detdel')
        .pipe(webser({
            port: 8080,
            open: true,
            proxies: [{
                source: '/api/add',
                target: 'http://192.168.0.39:3000/api/add'
            }, {
                source: '/api/del',
                target: 'http://192.168.0.39:3000/api/del'
            }, {
                source: '/api/list',
                target: 'http://192.168.0.39:3000/api/list'
            }, {
                source: '/api/detail',
                target: 'http://192.168.0.39:3000/api/detail'
            }]
        }))
})