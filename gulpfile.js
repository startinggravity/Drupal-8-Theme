var gulp        = require("gulp");
var sass        = require("gulp-sass");
var filter      = require('gulp-filter');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require("browser-sync");
var reload      = browserSync.reload;
var shell = require('gulp-shell');
var autoprefixer = require('gulp-autoprefixer');
 
// Drupal theme Sass task.
gulp.task('sass-drupal', function () {
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
 
// Process JS files in Drupal and return the stream.
gulp.task('js-drupal', function () {
    return gulp.src('js/*js')
        .pipe(gulp.dest('js'));
});

// PatternLab Sass task.
gulp.task('sass-patternlab', function () {
    return gulp.src('patternlab-twig/scss/**/*.scss')
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
        .pipe(gulp.dest('patternlab-twig/css'))
        .pipe(filter('patternlab-twig/scss**/*.css')) // Filtering stream to only css files
        .pipe(browserSync.reload({stream:true}));
});

// Update PatternLab pages.
gulp.task('generate-patternlab', shell.task([
  'php patternlab-twig/core/console --generate'
]));

// Sync PatternLab Sass with Drupal Sass.
gulp.task('sync-sass', shell.task([
    'rsync -r patternlab-twig/sass/* sass/'
]));

// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src('js/*js')
        .pipe(gulp.dest('js'));
});
 
// run drush to clear the theme registry.
gulp.task('drush', shell.task([
  'drush cache-clear theme-registry'
]));
 
// BrowserSync.
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

// Autoprefixer.
gulp.task('autoprefixer', function () {
    return gulp.src('src/app.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'));
});
 
 
// Default task to be run with `gulp`.
gulp.task('default', ['sass-drupal', 'js-drupal', 'drush', 'browser-sync'], function () {
    gulp.watch("scss/**/*.scss", ['sass']);
    gulp.watch("js/*.js", ['js']);
});
