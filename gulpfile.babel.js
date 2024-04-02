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
// npm install --save-dev gulp-rename gulp-replace gulp-line-ending-corrector gulp-sourcemaps browser-sync
// npm install --save-dev gulp-remember gulp-load-plugins
// npm install --save-dev gulp-notify gulp-plumber 

// npm install --save-dev @fortawesome/fontawesome-free


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


import plugins from 'gulp-load-plugins';
// const pluginsLoaded = plugins(); // Load all gulp plugins into pluginsLoaded
// import loadPlugins from 'gulp-load-plugins';
// const plugins = loadPlugins();

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
    beep();

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
 * Task: `htmlTask`. (for a single index.html file)
 *
 * Change the file path of css, js and images files inside index.html
 * 
 * This task does the following:
 *    1. Gets the source html file
 *    2. Replaces the source path of css, js and images files
 *    3. Generates the amended file in dist folder
 */

gulp.task('htmlTask', () => {
    return gulp.src(config.htmlSRC)
        .pipe(replace(config.srcCSSFilePath, config.distCSSFilePath))
        .pipe(replace(config.srcJSFilePath, config.distJSFilePath))
        .pipe(gulp.dest(config.htmlDestination))
        .pipe(
            notify({
                message: '\n\n✅  ===> HTML — completed!\n',
                onLast: true
            })
        );
});

/**
 * Task: `htmlCopyTask`. (for more HTML files in a HTML folder)
 *
 * Copy the html files from src folder to dist folder
 *
 * This task does the following:
 *    1. Gets the source html files
 *    2. Renames the directory name for html files in the html folder
 *    3. Copies the files to dist folder
 */

// gulp.task('htmlCopyTask', () => {
//     return gulp.src(htmlSRC, { since: gulp.lastRun('htmlCopyTask') })
//         .pipe(rename((path) => {
//             if (path.dirname !== '.') {
//                 path.dirname = 'html/' + path.dirname; // Adding 'html/' prefix to subdirectories
//             }
//         }))
//         .pipe(gulp.dest('htmlDestination'))
//         .pipe(
//             notify({
//                 message: '\n\n✅ ===> COPY HTML TO PRODUCTION FOLDER — completed!\n',
//                 onLast: true
//             })
//         );
// });

/**
 * Task: `htmlReplaceFilePathTask`. (for more HTML files in a HTML folder)
 *
 * Changes the source path of css, js and images files inside index.html
 *
 * This task does the following:
 *    1. Gets the copied index.html file
 *    2. Replaces the source path of css, js and images files
 *    3. Generates the amended file in dist folder
 */

// gulp.task('htmlReplaceFilePathTask', () => {
//     return gulp.src('./dist/index.html')
//          .pipe(replace('./src/scss/style.css', './dist/css/style.min.css'))
//          .pipe(replace('./src/scripts/script.js', './dist/scripts/script.min.js'))
//          .pipe(replace('/images/optimized/', '/images/'))
//          .pipe(gulp.dest('./')) 
//          .pipe(
//             notify({
//                 message: '\n\n✅  ===> FINAL HTML.INDEX — completed!\n',
//                 onLast: true
//             })
//         );
// });

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
        // .src("./src/loader.css", { allowEmpty: true })
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
        .src(config.styleCRProdFilePath)
        // .src("./dist/css/loader.css")
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
                includePaths: 'node_modules/@fortawesome',
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
        .src(config.styleNCProdFilePath)
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
        .src(config.jsCriticalSRC, { since: lastRun('jsCRLegacyDevTask') }) // Only run on changed files.
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
        .pipe(remember(config.jsCriticalSRC)) // Bring all files back to stream.
        .pipe(concat(config.jsCriticalLegacyFile + '.js')) // Concatenate and rename file
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
        .src(config.jsCRLegacyProdFilePath)
        .pipe(plumber(errorHandler))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(terser())
        .pipe(
            rename({
                basename: config.jsCriticalLegacyFile,
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
        .src(config.jsCriticalSRC)
        .pipe(plumber(errorHandler))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(concat(config.jsCriticalModernFile + '.js'))
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
        .src(config.jsCRModernProdFilePath)
        .pipe(plumber(errorHandler))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(terser())
        .pipe(
            rename({
                basename: config.jsCriticalModernFile,
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
        .src(config.jsNonCriticalSRC, { since: lastRun('jsNCLegacyDevTask') }) // Only run on changed files.
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
        .pipe(remember(config.jsNonCriticalSRC)) // Bring all files back to stream.
        .pipe(concat(config.jsNonCriticalLegacyFile + '.js')) // Concatenate and rename file
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
        .src(config.jsNCLegacyProdFilePath)
        .pipe(plumber(errorHandler))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(terser())
        .pipe(
            rename({
                basename: config.jsNonCriticalLegacyFile,
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
        .src(config.jsNonCriticalSRC)
        .pipe(plumber(errorHandler))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(concat(config.jsNonCriticalModernFile + '.js'))
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
        .src(config.jsNCModernProdFilePath)
        .pipe(plumber(errorHandler))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(terser())
        .pipe(
            rename({
                basename: config.jsNonCriticalModernFile,
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
 * This task will run only once, if you want to change the parameter, 
 * you have to run it again, do it with the command `gulp imageOptiTask`.
 *
 * Read the following to change these options.
 * @link https://github.com/sindresorhus/gulp-imagemin
 */
gulp.task('imageOptiTask', () => {
    return gulp
        .src(config.imgresizedSRC) // Only run on changed files.
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

// Create new task - convert TTF to WOFF2 & WOFF


/**
 * Default Task with Watch Tasks
 * 
 * Watches for file changes and runs specific tasks.
 * 
 */

// gulp.task('default', gulp.series(
//     gulp.parallel('scssDevTask', 'jsLegacyDevTask',
//         gulp.series('imageOptiTask', 'webpImage'),
//         browserSync),
//     function watchFiles() {
//         gulp.watch(config.watchHtml, reload); // Reload on HTML file changes.
//         gulp.watch(config.watchStyles, gulp.series('scssDevTask', reload)); // Reload on SCSS file changes.
//         gulp.watch(config.watchJs, gulp.series('jsLegacyDevTask', reload)); // Reload on JS file changes.
//         gulp.watch(config.imgresizedSRC, gulp.series('imageOptiTask', reload)); // Reload on image file changes.
//         gulp.watch(config.imgProdDestination, gulp.series('webpImage', reload)); // Reload on webp file generation.
//     }
// ));

/**
 * Build Task
 *
 * Copies the revised HTML, compiled CSS and JS, and optimized images to dist folder for production.
 */

// gulp.task(
//     'build', gulp.parallel(
//         'htmlTask',
//         // gulp.series('htmlCopyTask', 'htmlReplaceFilePathTask'), //(for more HTML files in a HTML folder)
//         gulp.series('scssDevTask', 'scssProdTask'),
//         gulp.series('jsLegacyDevTask', 'jsLegacyProdTask'),
//         // 'copyImage'
//     )
// );

gulp.task('b', gulp.parallel(
    'htmlTask',
    // gulp.series('scssDevTask', 'scssProdTask'),
    // gulp.series('jsCRLegacyDevTask', 'jsCRLegacyProdTask'),
    // gulp.series('jsNCLegacyDevTask', 'jsNCLegacyProdTask'),
    // gulp.series('jsCRModernDevTask', 'jsCRModernProdTask'),
    // gulp.series('jsNCModernDevTask', 'jsNCModernProdTask'),
    // gulp.series('imageOptiTask', 'webpImage'),
    // 'imageOptiTask',
    // 'webpImage'
));

// gulp.task('htmlTask', function (done) {
//     // Your HTML task logic here
//     done(); // Signal completion
// });

// gulp.task('scssDevTask', function (done) {
//     // Your SCSS dev task logic here
//     done(); // Signal completion
// });

// gulp.task('scssProdTask', function (done) {
//     // Your SCSS production task logic here
//     done(); // Signal completion
// });

// gulp.task('jsLegacyDevTask', function (done) {
//     // Your JS dev task logic here
//     done(); // Signal completion
// });

// gulp.task('jsLegacyProdTask', function (done) {
//     // Your JS production task logic here
//     done(); // Signal completion
// });