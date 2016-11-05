var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    typescript = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    tscConfig = require('./tsconfig.json')
    gutil = require('gulp-util'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    concat = require('gulp-concat');
    path = require('path');


var env,
    jsSources,
    sassSources,
    htmlSources,
    outputDir,
    sassStyle,
    tsSrc;

env = 'development';

if (env==='development') {
    outputDir = 'builds/development/';
    sassStyle = 'expanded';
} else {
    outputDir = 'builds/production/';
    sassStyle = 'compressed';
}

tsSrc = 'components/scripts/';
sassSources = ['components/sass/style.scss'];
htmlSources = [outputDir + '*.html'];

jsSources = [
    'node_modules/es6-shim/es6-shim.min.js',
    'node_modules/systemjs/dist/system-polyfills.js',
    'node_modules/angular2/bundles/angular2-polyfills.js',
    'node_modules/systemjs/dist/system.src.js',
    'node_modules/rxjs/bundles/Rx.js',
    'node_modules/angular2/bundles/angular2.dev.js'
];

gulp.task('copylibs', function() {
  return gulp
    .src(jsSources)
    .pipe(gulp.dest(outputDir + 'js/lib/angular2'));
});

gulp.task('typescript', function () {
  return gulp
    .src(tsSrc + '**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(outputDir + 'js/'));
});

//gulp.task('js', function() {
//    gulp.src(jsSources)
//        .pipe(concat('script.js'))
//        .pipe(browserify())
//        .on('error', gutil.log)
//        .pipe(gulpif(env === 'production', uglify()))
//        .pipe(gulp.dest(outputDir + 'js'))
//        .pipe(connect.reload())
//});

gulp.task('compass', function() {
    gulp.src(sassSources)
        .pipe(compass({
            sass: 'components/sass',
            css: outputDir + 'css',
            image: outputDir + 'images',
            style: sassStyle,
            require: ['susy', 'breakpoint']
        })
            .on('error', gutil.log))
        //    .pipe(gulp.dest( outputDir + 'css'))
        .pipe(connect.reload())
});


gulp.task('html', function() {
    gulp.src('builds/development/*.html')
        .pipe(gulpif(env === 'production', minifyHTML()))
        .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
        .pipe(connect.reload())
});

gulp.task('watch', function() {
  gulp.watch(tsSrc + '**/*.ts', ['typescript']);
  gulp.watch(['components/sass/*.scss', 'components/sass/*/*.scss'], ['compass']);
  gulp.watch(outputDir + '**/*.html', ['html']);
});

gulp.task('webserver', function() {
  gulp.src(outputDir)
    .pipe(webserver({
      livereload: true,
      open: false
    }));
});

gulp.task('default', ['copylibs', 'typescript', 'html','compass', 'watch', 'webserver']);
