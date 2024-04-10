'use strict';
// npm installation
// npm install -g gulp-cli 
// npm install -g browser-sync

// npm init -y

// npm install 
// npm install --save-dev gulp sass gulp-sass postcss gulp-postcss gulp-autoprefixer postcss-sort-media-queries gulp-clean-css 
// npm install --save-dev gulp-babel @babel/core @babel/register @babel/preset-env gulp-concat gulp-terser  
// npm i --save-dev gulp-imagemin@7.1.0 
// npm i --save-dev gulp-webp@4.0.1
// npm install --save-dev sharp
// npm install --save-dev gulp-ttf2woff2
// npm install --save-dev @fortawesome/fontawesome-free (not used)
// npm install --save-dev gulp-rename gulp-replace gulp-line-ending-corrector gulp-sourcemaps browser-sync
// npm i --save-dev gulp-filter@6.0.0
// npm install --save-dev gulp-remember
// npm install --save-dev gulp-notify gulp-plumber 

// * Gulpfile.
// *
// * Implements:
// *      1. Live reloads browser with BrowserSync.
// *      2. HTML: replaces strings regarding the file path of CSS, JS and images.
// *      2. CSS: Scss to CSS conversion, error catching, autoprefixing, sourcemaps,
// *         merge media queries, and minification.
// *      3. JS: Babelifies, concatenates & minifies JS files.
// *      4. Images: Minifies PNG, JPEG, GIF and SVG images. Generates WEBP images for TIFF and optimized PNG and JPEG.
// *      5. Watches files for changes in HTML, CSS, JS or images.
// *      6. Corrects the line endings.

/**
 * Load Gulp Configuration.
 *
 * TODO: Customize your project in the gulp.config.js file.
 */
const config = require('./gulp.config.js');

// * Load gulp plugins and passing them semantic names.
import gulp from 'gulp';  // Gulp of-course.
const { lastRun } = require('gulp');

// CSS related plugins.
const sass = require('gulp-sass')(require('sass')); // Gulp plugin for Sass compilation.
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
const sortMediaQueries = require('postcss-sort-media-queries');
const cleanCSS = require('gulp-clean-css'); // Minifies CSS files.

// JS related plugins.
const babel = require('gulp-babel'); // Compiles ESNext to browser compatible JS.
const concat = require('gulp-concat'); // Concatenates JS files.
const terser = require('gulp-terser'); // Minifies JS files.

// Image related plugins.
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

// Font related plugins.
const ttf2woff2 = require('gulp-ttf2woff2');

// Utility related plugins.
const rename = require('gulp-rename'); // Renames files E.g. style.css -> style.min.css.
const replace = require('gulp-replace'); // Replace strings inside file.
const lineec = require('gulp-line-ending-corrector'); // Consistent Line Endings for non UNIX systems. Gulp Plugin for Line Ending Corrector (A utility that makes sure your files have consistent line endings).
const sourcemaps = require('gulp-sourcemaps'); // Maps code in a compressed file (E.g. style.css) back to it’s original position in a source file (E.g. structure.scss, which was later combined with other css files to generate style.css).
const browsersync = require('browser-sync').create(); // Reloads browser and injects CSS. Time-saving synchronized browser testing.
const remember = require('gulp-remember'); //  Adds all the files it has ever seen back into the stream.
const notify = require('gulp-notify'); // Sends message notification to you.
const plumber = require('gulp-plumber'); // Prevent pipe breaking caused by errors from gulp plugins.
// const cache = require('gulp-cache'); // Cache files in stream for later use. (not used for clearing cache of photos)


/**
 * Custom Error Handler.
 *
 * @param Mixed err
 */
const errorHandler = r => {
    notify.onError('\n\n❌  ===> ERROR: <%= error.message %>\n')(r);
    // this.emit('end');
};

/**
 * Task: `browser-sync`.
 *
 * Live Reloads, CSS injections, Localhost tunneling.
 * @link http://www.browsersync.io/docs/options/
 *
 * @param {Mixed} done Done.
 */
const browserSync = done => {
    browsersync.init({
        server: {
            baseDir: config.productURL //preset: '.'
        },
        open: config.browserAutoOpen, //preset: false
        injectChanges: config.injectChanges, //preset: true
        watchEvents: ['change', 'add', 'unlink', 'addDir', 'unlinkDir']
    });
    done();
};

// Helper function to allow browser reload with Gulp 4.
const reload = done => {
    browsersync.reload();
    done();
};

/**
 * Task: `htmlIndexTask`. (for the index.html file)
 *
 * Change the file path of css and js files inside index.html
 * 
 * This task does the following:
 *    1. Gets the source html file
 *    2. Replaces the source path of css and js files files
 *    3. Generates the amended file in dist folder
 */

gulp.task('htmlIndexTask', () => {
    return gulp.src(config.htmlIndexSRC)
        .pipe(replace('./dist/', './'))
        .pipe(replace('.css', '.min.css'))
        .pipe(replace('.js', '.min.js'))
        .pipe(gulp.dest(config.htmlDestination))
        .pipe(
            notify({
                message: '\n\n✅  ===> HTML INDEX — completed!\n',
                onLast: true
            })
        );
});

/**
 * Task: `cssDevTask`.
 *
 * Autoprefixes very critical CSS and/or noscript CSS file(s).
 *
 * This task does the following:
 *    1. Gets the source of css file(s)
 *    2. Autoprefixes the file(s) 
 *    3. Generates .css file(s) in dist folder
 */
gulp.task('cssDevTask', () => {
    return gulp
        .src(config.styleCSSSRC, { allowEmpty: true }, { since: lastRun('cssDevTask') }) // Only run on changed files.
        .pipe(plumber(errorHandler))
        .pipe(postcss([autoprefixer(config.BROWSERS_LIST)]))
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest(config.styleProdDestination))
        .pipe(
            notify({
                message: '\n\n✅  ===> VERY CRITICAL STYLES AND/OR NOSCRIPT STYLES WITH PREFIXES — completed!\n',
                onLast: true
            })
        );
});

/**
 * Task: `cssProdTask`.
 *
 * Minifies very critical CSS and/or noscript CSS file(s).
 *
 * This task does the following:
 *    1. Gets the critical css file with prefixes
 *    2. Renames the CSS file with file extension .min.css
 *    3. Merge and sort the media queries
 *    4. Minifies the CSS file 
 *    6. Generates critical.style.css in dist folder
 */
gulp.task('cssProdTask', () => {
    return gulp
        .src(config.styleCSSInterFilePath)
        .pipe(plumber(errorHandler))
        .pipe(postcss([
            sortMediaQueries({
                sort: 'mobile-first' // or 'desktop-first' or your custom sorting function
            })
        ]))// Merge and Sort Media Queries for .min.css version.
        .pipe(cleanCSS())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest(config.styleProdDestination))
        .pipe(
            notify({
                message: '\n\n✅  ===> MINIFIED VERY CRITICAL STYLES AND/OR NOSCRIPT STYLES WITH PREFIXES — completed!\n',
                onLast: true
            })
        );
});

/**
 * Task: `scssCRDevTask`.
 *
 * Compiles critical Scss and Autoprefixes CSS.
 *
 * This task does the following:
 *    1. Gets the source critical scss file
 *    2. Compiles Scss to CSS
 *    3. Autoprefixes it 
 *    4. Writes sourcemaps for it
 *    5. Generates critical.style.css in dist folder
 */
gulp.task('scssCRDevTask', () => {
    return gulp
        .src(config.styleCRSRC, { allowEmpty: true })
        .pipe(plumber(errorHandler))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(
            sass({
                errLogToConsole: config.errLogToConsole,
                outputStyle: config.outputStyle,
                precision: config.precision
            })
        )
        .on('error', sass.logError)
        .pipe(postcss([autoprefixer(config.BROWSERS_LIST)]))
        .pipe(sourcemaps.write('./')) // Output sourcemap for style.css.
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest(config.styleProdDestination))
        .pipe(
            notify({
                message: '\n\n✅  ===> CRITICAL STYLES WITH PREFIXES — completed!\n',
                onLast: true
            })
        );
});

/**
 * Task: `scssCRProdTask`.
 *
 * Minifies auto-prefixed critical CSS.
 *
 * This task does the following:
 *    1. Gets the critical css file with prefixes
 *    2. Renames the CSS file with file extension .min.css
 *    3. Merge and sort the media queries
 *    4. Minifies the CSS file 
 *    5. Writes sourcemaps for it 
 *    6. Generates critical.style.css in dist folder
 */
gulp.task('scssCRProdTask', () => {
    return gulp
        .src(config.styleCRInterFilePath)
        .pipe(plumber(errorHandler))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(postcss([
            sortMediaQueries({
                sort: 'mobile-first' // or 'desktop-first' or your custom sorting function
            })
        ]))// Merge and Sort Media Queries for .min.css version.
        .pipe(cleanCSS())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(sourcemaps.write('./')) // Output sourcemap for style.min.css.
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest(config.styleProdDestination))
        .pipe(
            notify({
                message: '\n\n✅  ===> MINIFIED CRITICAL STYLES WITH PREFIXES — completed!\n',
                onLast: true
            })
        );
});

/**
 * Task: `scssNCDevTask`.
 *
 * Compiles non-critical Scss and Autoprefixes CSS.
 *
 * This task does the following:
 *    1. Gets the source non-critical scss file
 *    2. Compiles Scss to CSS
 *    3. Autoprefixes it 
 *    4. Writes sourcemaps for it
 *    5. Generates non-critical.style.css in dist folder
 */
gulp.task('scssNCDevTask', () => {
    return gulp
        .src(config.styleNCSRC, { allowEmpty: true })
        .pipe(plumber(errorHandler))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(
            sass({
                // includePaths: 'node_modules/@fortawesome', (using npm and gulp)
                errLogToConsole: config.errLogToConsole,
                outputStyle: config.outputStyle,
                precision: config.precision
            })
        )
        .on('error', sass.logError)
        .pipe(postcss([autoprefixer(config.BROWSERS_LIST)]))
        .pipe(sourcemaps.write('./')) // Output sourcemap for style.css.
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest(config.styleProdDestination))
        .pipe(
            notify({
                message: '\n\n✅  ===> NON-CRITICAL STYLES WITH PREFIXES — completed!\n',
                onLast: true
            })
        );
});

/**
 * Task: `scssNCProdTask`.
 *
 * Minifies auto-prefixed non-critical CSS.
 *
 * This task does the following:
 *    1. Gets the non-critical css file with prefixes
 *    2. Renames the CSS file with file extension .min.css
 *    3. Merge and sort the media queries
 *    4. Minifies the CSS file 
 *    5. Writes sourcemaps for it 
 *    6. Generates non-critical.style.css in dist folder
 */
gulp.task('scssNCProdTask', () => {
    return gulp
        .src(config.styleNCInterFilePath)
        .pipe(plumber(errorHandler))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(postcss([
            sortMediaQueries({
                sort: 'mobile-first' // or 'desktop-first' or your custom sorting function
            })
        ]))// Merge and Sort Media Queries for .min.css version.
        .pipe(cleanCSS())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(sourcemaps.write('./')) // Output sourcemap for style.min.css.
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest(config.styleProdDestination))
        .pipe(
            notify({
                message: '\n\n✅  ===> MINIFIED NON-CRITICAL STYLES WITH PREFIXES — completed!\n',
                onLast: true
            })
        );
});

/**
 * Task: `jsCRLegacyDevTask`.
 *
 * Babelifies and concatenates critical JS.
 *
 * This task does the following:
 *     1. Gets the source folder for critical JS files
 *     2. Babelifies the JS files
 *     3. Concatenates all the JS files 
 *     4. Writes sourcemap for it 
 *     5. Generates critical-legacy-script.js in dist folder
 */
gulp.task('jsCRLegacyDevTask', () => {
    return gulp
        .src(config.jsCRSRC, { since: lastRun('jsCRLegacyDevTask') }) // Only run on changed files.
        .pipe(plumber(errorHandler))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(
            babel({
                presets: [
                    [
                        '@babel/preset-env', // Preset to compile your modern JS to ES5.
                        {
                            targets: { browsers: config.BROWSERS_LIST } // Target browser list to support.
                        }
                    ]
                ]
            })
        )
        .pipe(remember(config.jsCRSRC)) // Bring all files back to stream.
        .pipe(concat(config.jsCRLegacyFileName + '.js')) // Concatenate and rename file
        .pipe(sourcemaps.write('./')) // Output sourcemap for critical-legacy-script.js.
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest(config.jsProdDestination))
        .pipe(
            notify({
                message: '\n\n✅  ===> CRITICAL LEGACY JS — completed!\n',
                onLast: true
            })
        );
});

/**
 * Task: `jsCRLegacyProdTask`.
 *
 * Minifies babelified and concatenated critical JS.
 *
 * This task does the following:
 *     1. Gets the babelified and concatenated critical JS
 *     2. Renames the JS file with file extension .min.js
 *     3. Minifies the JS file 
 *     4. Writes sourcemaps for it 
 *     5. Generates critical-legacy-script.min.js in dist folder
 */
gulp.task('jsCRLegacyProdTask', () => {
    return gulp
        .src(config.jsCRLegacyInterFilePath)
        .pipe(plumber(errorHandler))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(terser())
        .pipe(
            rename({
                basename: config.jsCRLegacyFileName,
                extname: '.min.js'
            })
        )
        .pipe(sourcemaps.write('./')) // Output sourcemap for critical-legacy-script.min.js.
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest(config.jsProdDestination))
        .pipe(
            notify({
                message: '\n\n✅  ===> MINIFIED CRITICAL LEGACY JS — completed!\n',
                onLast: true
            })
        );
});

/**
 * Task: `jsCRModernDevTask`.
 *
 * Concatenates critical JS.
 *
 * This task does the following:
 *     1. Gets the source folder for critical JS files
 *     2. Concatenates all the JS files 
 *     3. Writes sourcemap for it 
 *     4. Generates critical-modern-script.js in dist folder
 */
gulp.task('jsCRModernDevTask', () => {
    return gulp
        .src(config.jsCRSRC)
        .pipe(plumber(errorHandler))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(concat(config.jsCRModernFileName + '.js'))
        .pipe(sourcemaps.write('./')) // Output sourcemap for critical-modern-script.js.
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest(config.jsProdDestination))
        .pipe(
            notify({
                message: '\n\n✅  ===> CRITICAL MODERN JS — completed!\n',
                onLast: true
            })
        );
});

/**
 * Task: `jsCRModernProdTask`.
 *
 * Minifies critical concatenated JS.
 *
 * This task does the following:
 *     1. Gets the concatenated critical JS
 *     2. Renames the JS file with file extension .min.js
 *     3. Minifies the JS file 
 *     4. Writes sourcemaps for it 
 *     5. Generates critical-modern-script.min.js in dist folder
 */
gulp.task('jsCRModernProdTask', () => {
    return gulp
        .src(config.jsCRModernInterFilePath)
        .pipe(plumber(errorHandler))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(terser())
        .pipe(
            rename({
                basename: config.jsCRModernFileName,
                extname: '.min.js'
            })
        )
        .pipe(sourcemaps.write('./')) // Output sourcemap for script.min.js.
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest(config.jsProdDestination))
        .pipe(
            notify({
                message: '\n\n✅  ===> MINIFIED CRITICAL MODERN JS — completed!\n',
                onLast: true
            })
        );
});

/**
 * Task: `jsNCLegacyDevTask`.
 *
 * Babelifies and concatenates non-critical JS.
 *
 * This task does the following:
 *     1. Gets the source folder for non-critical JS files
 *     2. Babelifies the JS files
 *     3. Concatenates all the JS files 
 *     4. Writes sourcemap for it 
 *     5. Generates non-critical-legacy-script.js in dist folder
 */
gulp.task('jsNCLegacyDevTask', () => {
    return gulp
        .src(config.jsNCSRC, { since: lastRun('jsNCLegacyDevTask') }) // Only run on changed files.
        .pipe(plumber(errorHandler))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(
            babel({
                presets: [
                    [
                        '@babel/preset-env', // Preset to compile your modern JS to ES5.
                        {
                            targets: { browsers: config.BROWSERS_LIST } // Target browser list to support.
                        }
                    ]
                ]
            })
        )
        .pipe(remember(config.jsNCSRC)) // Bring all files back to stream.
        .pipe(concat(config.jsNCLegacyFileName + '.js')) // Concatenate and rename file
        .pipe(sourcemaps.write('./')) // Output sourcemap for non-critical-legacy-script.js.
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest(config.jsProdDestination))
        .pipe(
            notify({
                message: '\n\n✅  ===> NON-CRITICAL LEGACY JS — completed!\n',
                onLast: true
            })
        );
});

/**
 * Task: `jsNCLegacyProdTask`.
 *
 * Minifies babelified and concatenated non-critical JS.
 *
 * This task does the following:
 *     1. Gets the babelified and concatenated non-critical JS
 *     2. Renames the JS file with file extension .min.js
 *     3. Minifies the JS file 
 *     4. Writes sourcemaps for it 
 *     5. Generates non-critical-legacy-script.min.js in dist folder
 */
gulp.task('jsNCLegacyProdTask', () => {
    return gulp
        .src(config.jsNCLegacyInterFilePath)
        .pipe(plumber(errorHandler))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(terser())
        .pipe(
            rename({
                basename: config.jsNCLegacyFileName,
                extname: '.min.js'
            })
        )
        .pipe(sourcemaps.write('./')) // Output sourcemap for non-critical-legacy-script.min.js.
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest(config.jsProdDestination))
        .pipe(
            notify({
                message: '\n\n✅  ===> MINIFIED NON-CRITICAL LEGACY JS — completed!\n',
                onLast: true
            })
        );
});

/**
 * Task: `jsNCModernDevTask`.
 *
 * Concatenates non-critical JS.
 *
 * This task does the following:
 *     1. Gets the source folder for non-critical JS files
 *     2. Concatenates all the JS files 
 *     3. Writes sourcemap for it 
 *     4. Generates non-critical-modern-script.js in dist folder
 */
gulp.task('jsNCModernDevTask', () => {
    return gulp
        .src(config.jsNCSRC)
        .pipe(plumber(errorHandler))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(concat(config.jsNCModernFileName + '.js'))
        .pipe(sourcemaps.write('./')) // Output sourcemap for non-critical-modern-script.js.
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest(config.jsProdDestination))
        .pipe(
            notify({
                message: '\n\n✅  ===> NON-CRITICAL MODERN JS — completed!\n',
                onLast: true
            })
        );
});

/**
 * Task: `jsNCModernProdTask`.
 *
 * Minifies non-critical concatenated JS.
 *
 * This task does the following:
 *     1. Gets the concatenated non-critical JS
 *     2. Renames the JS file with file extension .min.js
 *     3. Minifies the JS file 
 *     4. Writes sourcemaps for it 
 *     5. Generates non-critical-modern-script.min.js in dist folder
 */
gulp.task('jsNCModernProdTask', () => {
    return gulp
        .src(config.jsNCModernInterFilePath)
        .pipe(plumber(errorHandler))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(terser())
        .pipe(
            rename({
                basename: config.jsNCModernFileName,
                extname: '.min.js'
            })
        )
        .pipe(sourcemaps.write('./')) // Output sourcemap for script.min.js.
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest(config.jsProdDestination))
        .pipe(
            notify({
                message: '\n\n✅  ===> MINIFIED NON-CRITICAL MODERN JS — completed!\n',
                onLast: true
            })
        );
});

/**
 * Task: `imageOptiTask`.
 *
 * Minifies PNG, JPEG, GIF and SVG images.
 *
 * This task does the following:
 *     1. Gets the source of images raw folder
 *     2. Optimizes (re-sized) PNG and JPEG, as well as raw GIF and SVG images
 *     3. Generates and saves the optimized images in images optimized folder
 *
 * Read the following to change these options.
 * @link https://github.com/sindresorhus/gulp-imagemin
 */
gulp.task('imageOptiTask', () => {
    return gulp
        .src(config.imgResizedSRC)
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ],
            { verbose: true }
        ))
        .pipe(gulp.dest(config.imgProdDestination))
        .pipe(
            notify({
                message: '\n\n✅  ===> IMAGES OPTIMIZATION — completed!\n',
                onLast: true
            })
        );
});

/**
 * Task: `webpImage`.
 *
 * Convert PNG, JPEG and TIFF images to WebP images.
 * 
 *  * This task does the following:
 *     1. Gets the optimized images (PNG and JPEG) and unoptimized images (TIFF) in dist folder
 *     2. Converts PNG, JPEG and TIFF images to WebP images
 *     3. Saves the WebP images in dist folder
 * 
 */
gulp.task('webpImage', () => {
    return gulp
        .src(`${config.imgProdDestination}/*.{jpeg,jpg,png,tiff}`) // Only run on changed files.
        .pipe(webp())
        .pipe(gulp.dest(config.imgProdDestination))
        .pipe(
            notify({
                message: '\n\n✅  ===> WEBP IMAGES  — completed!\n',
                onLast: true
            })
        );
});

/**
 * Task: `copyFont`. (run on demand)
 *
 * Convert font files from src folder to dist foler.
 * 
 *  * This task does the following:
 *     1. Gets the source font files
 *     2. Saves the files in dist folder
 * 
 */
gulp.task('copyFont', function (done) {
    gulp.src(config.fontAllSRC)
        .pipe(gulp.dest(config.fontAllProdDestination))
        .pipe(
            notify({
                message: '\n\n✅  ===> COPY FONT — completed!\n',
                onLast: true
            })
        );
    done();
});

/**
 * Task: `changeGoogleFontFormat`. (especially for google font, run on demand)
 *
 * Convert TTF to WOFF2.
 * 
 *  * This task does the following:
 *     1. Gets the source TTF
 *     2. Converts TTF to WOFF2
 *     3. Saves the WOFF2 in dist folder
 * 
 */
gulp.task('changeGoogleFontFormat', function (done) {
    gulp.src(config.fontGoogleSRC)
        .pipe(ttf2woff2())
        .pipe(gulp.dest(config.fontGoogleProdDestination))
        .pipe(
            notify({
                message: '\n\n✅  ===> CHANGE GOOGLE FONT FORMAT  — completed!\n',
                onLast: true
            })
        );
    done();
});

/**
 * Watch Tasks
 * 
 * Watches for file changes and runs specific tasks.
 * 
 */

gulp.task('watchFiles', function () {
    // Watch HTML files and reload browserSync on change
    gulp.watch(config.watchHtml, reload); // Reload on HTML file changes.
    gulp.watch(config.watchCssStyles, gulp.series('cssDevTask', reload)); // Reload on CSS file changes.
    gulp.watch(config.watchCRStyles, gulp.series('scssCRDevTask', reload)); // Reload on SCSS file changes.
    gulp.watch(config.watchCommonStyles, gulp.series('scssCRDevTask', 'scssNCDevTask', reload)); // Reload on SCSS file changes.
    gulp.watch(config.watchNCStyles, gulp.series('scssNCDevTask', reload)); // Reload on SCSS file changes.
    gulp.watch(config.watchCRJs, gulp.series('jsCRModernDevTask', reload)); // Reload on JS file changes.
    // gulp.watch(config.watchCRJs, gulp.series('jsCRLegacyDevTask','jsCRModernDevTask', reload)); // Reload on JS file changes.
    gulp.watch(config.watchNCJs, gulp.series('jsNCLegacyDevTask', 'jsNCModernDevTask', reload)); // Reload on JS file changes.
    gulp.watch(config.imgResizedSRC, gulp.series('imageOptiTask', 'webpImage', reload)); // Reload on image file changes.
    gulp.watch(config.fontAllSRC, gulp.series('copyFont', 'changeGoogleFontFormat', reload)); // Reload on font file changes.
});

/**
 * Default Task with Dev tasks and Watch Tasks
 * 
 * Initial project setup and start watching file changes.
 * 
 */

gulp.task('default', gulp.series(
    gulp.parallel(
        // 'cssDevTask',
        'scssCRDevTask',
        'scssNCDevTask',
        // // 'jsCRLegacyDevTask', //legacy code same as modern code in this project
        // 'jsCRModernDevTask',
        // 'jsNCLegacyDevTask',
        // 'jsNCModernDevTask',
        // gulp.series('imageOptiTask', 'webpImage'),
        // 'copyFont',
        // 'changeGoogleFontFormat',
        browserSync
    ),
    'watchFiles' // after initial setup
));

/**
 * Build Task with Dev tasks and Prod Tasks
 * 
 * Output all the production files to dist folder.
 * 
 */

gulp.task('build', gulp.parallel(
    // 'htmlIndexTask',
    // gulp.series('cssDevTask', 'cssProdTask'),
    gulp.series('scssCRDevTask', 'scssCRProdTask'),
    gulp.series('scssNCDevTask', 'scssNCProdTask'),
    // gulp.series('jsCRLegacyDevTask', 'jsCRLegacyProdTask'), //legacy code same as modern code in this project
    gulp.series('jsNCLegacyDevTask', 'jsNCLegacyProdTask'),
    gulp.series('jsCRModernDevTask', 'jsCRModernProdTask'),
    gulp.series('jsNCModernDevTask', 'jsNCModernProdTask'),
    // gulp.series('imageOptiTask', 'webpImage'),
    // 'copyFont',
    // 'changeGoogleFontFormat',
));
