var gulp = require('gulp');
var jslint = require('gulp-jslint');
var fs = require('fs');

gulp.task('lint', function (cb) {
    return gulp.src(['./src/**/*.js'])
        .pipe(jslint({
            node: true,
            stupid: true
        }))
        .pipe(jslint.reporter('default', {}));
    cb();
});

//gulp.task('make-dirs', function () {
//    return fs.mkdir('./dist/logs', function (err) {
//        if (err) {
//            console.log('Adding directories failed' + err);
//        }
//    });
//});

gulp.task('copy-src', function () {
    return gulp.src('./src/**/**')
        .pipe(gulp.dest('./dist'));
});

//gulp.task('copy-configs', function () {
//    return gulp.src('./conf/**/**')
//        .pipe(gulp.dest('./dist/conf'));
//});

gulp.task('build', ['copy-src',  'lint']);

gulp.task('default', ['build']);
