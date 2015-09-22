var domain          = 'your-site.tld';  // Set this to your local development domain.

// Gulp and node.
var gulp            = require('gulp');
var run             = require('gulp-run');
var install         = require('gulp-install');
var plumber         = require('gulp-plumber');
var watch           = require('gulp-watch');
var gulpFilter      = require('gulp-filter');
var runSequence     = require('run-sequence');
var gutil           = require('gulp-util');
var notify          = require('gulp-notify');

// Basic workflow.
var sass            = require('gulp-sass');
var sourcemaps      = require('gulp-sourcemaps');
var autoprefixer    = require('gulp-autoprefixer');
var browserSync     = require('browser-sync');
var reload          = browserSync.reload;
var bs              = require('browser-sync').create();

// Performance.
var postcss         = require('gulp-postcss');
var imageop         = require('gulp-image-optimization');
var svgmin          = require('gulp-svgmin');

// Error handling.
// Lifted directly from https://github.com/mikaelbr/gulp-notify/issues/81#issuecomment-100422179.
var reportError = function (error) {
    var lineNumber = (error.lineNumber) ? 'LINE ' + error.lineNumber + ' -- ' : '';

    notify({
        title: 'Task Failed [' + error.plugin + ']',
        message: lineNumber + 'See console.',
        sound: 'Sosumi' // See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
    }).write(error);

    gutil.beep(); // Beep 'sosumi' again

    // Inspect the error object
    //console.log(error);

    // Easy error reporting
    //console.log(error.toString());

    // Pretty error reporting
    var report = '';
    var chalk = gutil.colors.white.bgRed;

    report += chalk('TASK:') + ' [' + error.plugin + ']\n';
    report += chalk('PROB:') + ' ' + error.message + '\n';
    if (error.lineNumber) { report += chalk('LINE:') + ' ' + error.lineNumber + '\n'; }
    if (error.fileName)   { report += chalk('FILE:') + ' ' + error.fileName + '\n'; }
    console.error(report);

    // Prevent the 'watch' task from stopping
    this.emit('end');
};

// Paths.
var paths = {
    drupalStyle: {
        src:        'sass/',
        dest:       'css/'
    },
    drupalScripts: {
        src:        'js-src',
        dest:       'js/'
    },
    drupalImages: {
        src:        'img-src/',
        dest:       'images/'
    },
    drupalTemplates: {
        dest:       'templates/'
    },
    plStyle: {
        src:        'pattern-lab/source/css/',
        dest:       'pattern-lab/source/css/'
    },
    plScripts: {
        src:        'pattern-lab/source/js/'
    },
    plPatterns: {
        src:        'pattern-lab/source/_patterns/'
    },
    plComponents: {
        src:        'pattern-lab/source/_twig-components/'
    }
};

// Files with paths.
var files = {
    drupalStyleDest:    paths.drupalStyle.dest + 'style.css',
    drupalStyleSrc:     paths.drupalStyle.src + '**/*.scss',
    drupalScriptsSrc:   paths.drupalScripts.src + '*.js',
    drupalScriptsDest:  paths.drupalScripts.dest + '*.js',
    drupalTemplateDest: paths.drupalTemplates.dest + '**/*.twig',
    plStyleSrc:         paths.plStyle.src + 'style.scss',
    plStyleDest:        paths.plStyle.dest + 'style.css',
    imagesSrc:          paths.drupalImages.src + '*.*',
    imagesDest:         paths.drupalImages.dest  + '*.*',
    patterns:           paths.plPatterns.src + '**/*.twig',
    twigComponents:     paths.plComponents.src + '**/*.twig'
};

// Files to watch.
var watchfiles = [
    files.drupalScriptsSrc,
    files.drupalScriptsDest,
    files.drupalStyleDest,
    files.drupalStyleSrc,
    files.imagesSrc,
    files.imagesDest,
    files.drupalTemplateDest,
    files.plStyleSrc,
    files.plStyleDest
];

// Fire up Browser Sync.
gulp.task('browser-sync', function() {
    browserSync.init( {
        // Browsersync with a php server.
        proxy: domain,
        notify: true
    });
});

// Automatically install npm and bower packages found in package.json and bower.json.
gulp.task('install-all', function () {
    return gulp.src(['./bower.json', './package.json'])
        .pipe(install());
});
 
// Drupal theme Sass task.
gulp.task('sass-drupal', function () {
    return gulp.src(files.drupalStyleSrc)
        .pipe(plumber({
            errorHandler: reportError
        }))
        .pipe(sass({
            //outputStyle: 'compressed',
            outputStyle: 'nested',
            precision: 10
        }))
        .on('error', reportError)
        .pipe(gulp.dest(paths.drupalStyle.dest))
        .pipe(gulpFilter(files.drupalStyleDest))
});
 
// Sync JS files in Drupal with Pattern Lab. If new files are added, you will need to edit
// pattern-lab/source/_meta/_00-head.twig or pattern-lab/source/_meta/_01-footer.twig
gulp.task('rsync-js', function () {
    return gulp.src(files.drupalScriptsSrc)
        .pipe(run('rsync -r js-src/* js/'))
        .pipe(run('rsync -r js/* pattern-lab/source/js/'))
});

// Process Pattern Lab patterns.
gulp.task('pattern-lab-patterns', function () {
    return gulp.src(files.patterns)
        .pipe(watch(files.patterns))
        .pipe(run('php pattern-lab/core/console --generate'))
});

// Pattern Lab Sass task.
// This isn't necessary under regular circumstances and is not currently used.
gulp.task('sass-pattern-lab', function () {
    return gulp.src(files.drupalStyleSrc)
        .pipe(plumber({
            errorHandler: reportError
        }))
        .pipe(sass({
            //outputStyle: 'compressed',
            outputStyle: 'nested',
            precision: 10
        }))
        .on('error', reportError)
        .pipe(gulp.dest(paths.plStyle.dest))
        .pipe(gulpFilter(files.plStyleDest))
});

// Autoprefixer.
gulp.task('autoprefixer', function () {
    // Prevent reading sourcemaps to autoprefix them or make sourcemaps of sourcemaps
    var filter = gulpFilter(['*.css', '!*.map']);
    return gulp.src(files.drupalStyleSrc)
        .pipe(plumber({
            errorHandler: reportError
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(filter)
        .pipe(autoprefixer({ browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'], cascade: true }))
        .pipe(sourcemaps.write('.'))
        .pipe(filter.restore())
        .on('error', reportError)
        .pipe(gulp.dest(paths.drupalStyle.dest))
});

// Optimize PNG, JPG and GIF images.
gulp.task('optimize-images', function(cb) {
    gulp.src(paths.drupalImages.src + '*.{gif,jpg,jpeg,png}').pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    }))
    .pipe(gulp.dest(paths.drupalImages.dest)).on('end', cb).on('error', cb);
});

// Optimize SVG images.
gulp.task('optimize-images-svg', function(cb) {
    gulp.src(paths.drupalImages.src + '*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest(paths.drupalImages.dest)).on('end', cb).on('error', cb);
});

// Test.
// This doesn't do anything right now, but it gets triggered during commits.
gulp.task('test', function () {
});

// Sass.
gulp.task('run-sass', ['sass-drupal', 'autoprefixer']);

// Generate Pattern Lab.
gulp.task('generate-pattern-lab', function () {
    run('php pattern-lab/core/console --generate').exec()
});

// Use Drush to clear Drupal cache.
gulp.task('clear-cache', function () {
    run('drush cache-rebuild').exec()
});

// When Drupal template files are updated we need to clear cache and the refresh the browser.
// We use a command line method of reloading Browser Sync so that we can add a delay before it fires.
// Otherwise, Browser Sync will fire before the cache is cleared.
gulp.task('templates-watch', ['clear-cache'], function () {
    run('sleep 15s && browser-sync reload').exec()
});

// Watch file changes and trigger Browser Sync.
gulp.task('reload-bs', ['run-sass'], browserSync.reload);

// The files being watched.
gulp.task('watch-files', ['run-sass'], function () {
    // Make browsers reload after tasks are complete.
    gulp.watch(files.drupalStyleSrc, ['reload-bs']);
    gulp.watch(files.drupalScriptsSrc, ['rsync-js']).on('change', browserSync.reload);
    gulp.watch(files.imagesSrc, ['optimize-images', 'optimize-images-svg']).on('change', browserSync.reload);
    gulp.watch(files.drupalTemplateDest, ['templates-watch']);
    gulp.watch(files.patterns, ['generate-pattern-lab']).on('change', browserSync.reload);
    gulp.watch(files.twigComponents, ['generate-pattern-lab']).on('change', browserSync.reload);
});

// Run 'gulp build-dev' during development.
gulp.task('build-dev', function (callback) {
    runSequence(
        'run-sass',
        'rsync-js',
        'generate-pattern-lab',
        'browser-sync',
        'watch-files',
        callback
    );
});
