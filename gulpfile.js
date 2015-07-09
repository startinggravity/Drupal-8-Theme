var gulp        = require("gulp");
var sass        = require("gulp-sass");
var filter      = require('gulp-filter');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require("browser-sync");
var reload      = browserSync.reload;
var shell = require('gulp-shell');
var autoprefixer = require('gulp-autoprefixer');
 
// sass task
gulp.task('sass', function () {
    return gulp.src('scss/**/*.scss')
        .pipe(sourcemaps.init())
            .pipe(autoprefixer())
            .pipe(sass({
                //outputStyle: 'compressed',
                outputStyle: 'nested',
                precision: 10,
                onError: function (err) {
                    notify().write(err);
                }
            }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'))
        .pipe(filter('scss**/*.css')) // Filtering stream to only css files
        .pipe(browserSync.reload({stream:true}));
});
 
// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src('js/*js')
        .pipe(gulp.dest('js'));
});
 
// run drush to clear the theme registry.
gulp.task('drush', shell.task([
  'drush cache-clear theme-registry'
]));
 
// BrowserSync
gulp.task('browser-sync', function() {
    //watch files
    var files = [
    'css/style.css',
    'js/*js',
    'img/**/*',
    'templates/*.twig'
    ];
 
    //initialize browsersync
    browserSync.init(files, {
    //browsersync with a php server
    proxy: "drupal.loc",
    notify: true
    });
});

// Autoprefixer
gulp.task('autoprefixer', function () {
    return gulp.src('src/app.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'));
});
 
 
// Default task to be run with `gulp`
gulp.task('default', ['sass', 'js', 'drush', 'browser-sync'], function () {
    gulp.watch("scss/**/*.scss", ['sass']);
    gulp.watch("js/*.js", ['js']);
});
