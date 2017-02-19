import config from '../config.js';
import gulp from 'gulp';
import util from 'gulp-util';

gulp.task('css:prod', () => {
    return gulp.src(config.paths.src.css)
        .pipe(gulp.dest(config.paths.builds.tmp.css))
        .on('error', util.log);
});
