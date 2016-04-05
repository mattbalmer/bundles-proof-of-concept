'use strict';

const gulp = require('gulp');
const path = require('path');
const sync = require('gulp-sync')(gulp).sync;
var recipe = (name, config) => require('./gulp/recipes/' + name)(config);

const CONFIG = {
    NODE_MODULES: [],
    BUNDLES: [
        'index',
        'pages/home',
        'pages/contact',
        'pages/about'
    ]
};

gulp.task('env', recipe('env', {
    NODE_PATH: 'source/js:'
}));

gulp.task('css', recipe('stylus', {
    input: './source/css/index.styl',
    output: './dist/css',
    name: 'source.css'
}));

gulp.task('js:node_modules', recipe('browserify', {
    input: '',
    require: CONFIG.NODE_MODULES.concat(CONFIG.BUNDLES),
    output: './dist/js',
    name: 'node_modules.js'
}));

gulp.task('js:source', CONFIG.BUNDLES.map(bundle => {
    let taskname = `js:bundle:${bundle}`;

    gulp.task(taskname, recipe('babelify', {
        input: `./source/js/${bundle}.js`,
        external: CONFIG.NODE_MODULES.concat(CONFIG.BUNDLES).filter(b => b != bundle),
        output: './dist/js',
        name: `${bundle}.js`,
        transform: {
            stage: 1
        }
    }));

    return taskname;
}));

gulp.task('inject', recipe('inject', {
    cwd: './dist',
    file: './source/views/**/*.html',
    sources: [[
        'js/node_modules.js'
    ], [
        'css/**/*',
        'js/index.js'
    ]],
    output: './dist'
}));

gulp.task('server', recipe('server', {
    source: './dist',
    port: 3000
}));

gulp.task('watch', () => {
    gulp.watch('./source/**/*.styl', ['css']);
    gulp.watch('./source/**/*.js', ['js:source']);
    gulp.watch([
        './source/**/*.html',
        './dist/js/**/*',
        './dist/css/**/*'
    ], ['inject']);
});

gulp.task('compile:source', ['env', 'js:source', 'css']);
gulp.task('compile', sync(['compile:source', 'js:node_modules', 'inject']) );
gulp.task('compile-watch', ['compile:source', 'inject', 'watch']);
gulp.task('default', ['compile-watch', 'server']);