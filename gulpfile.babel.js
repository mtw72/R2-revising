'use strict';
// npm installation
// npm install -g gulp-cli 
// npm install -g browser-sync

// npm init -y

// npm install 
// npm install --save-dev gulp sass gulp-sass gulp-postcss gulp-autoprefixer postcss-combine-media-query gulp-clean-css
// npm install --save-dev gulp-babel @babel/core @babel/preset-env gulp-concat gulp-terser  
// npm install --save-dev gulp-changed gulp-imagemin gulp-webp
// npm install --save-dev gulp-rename gulp-replace gulp-line-ending-corrector gulp-sourcemaps browser-sync
// npm install --save-dev gulp-filter gulp-remember
// npm install --save-dev gulp-notify gulp-plumber beepbeep


// * Gulpfile.
// *
// * Implements:
// *      1. Live reloads browser with BrowserSync.
// *      2. CSS: Sass to CSS conversion, error catching, Autoprefixing, Sourcemaps,
// *         CSS minification, and Merge Media Queries.
// *      3. JS: Concatenates & minifies Custom JS files.
// *      4. Images: Minifies PNG, JPEG, GIF and SVG images.
// *      5. Watches files for changes in CSS or JS.
// *      7. Corrects the line endings.

/**
 * Load Gulp Configuration.
 *
 * TODO: Customize your project in the gulp.config.js file.
 */
const config = require('./gulp.config.js');

// * Load gulp plugins and passing them semantic names.
const gulp = require('gulp'); // Gulp of-course.

// CSS related plugins.
const sass = require('gulp-sass')(require('sass')); // Gulp plugin for Sass compilation.
const cleanCSS = require('gulp-clean-css'); // Minifies CSS files.
const postcss = require('gulp-postcss');
const autoprefixer = require('gulp-autoprefixer'); // Autoprefixing magic.
const combinemq = require('postcss-combine-media-query'); // Combine matching media queries into one.

// JS related plugins.
const concat = require('gulp-concat'); // Concatenates JS files.
const terser = require('gulp-terser'); // Minifies JS files.
const babel = require('gulp-babel'); // Compiles ESNext to browser compatible JS.

// Image related plugins.
const changed = require('gulp-changed'); // Only pass through changed files
const imagemin = require('gulp-imagemin'); // Minify PNG, JPEG, GIF and SVG images with imagemin.
const imagewebp = require('gulp-webp'); // Convert PNG, JPEG, TIFF to WebP

// Utility related plugins.
const rename = require('gulp-rename'); // Renames files E.g. style.css -> style.min.css.
const replace = require('gulp-replace'); // Replace strings inside file.
const lineec = require('gulp-line-ending-corrector'); // Consistent Line Endings for non UNIX systems. Gulp Plugin for Line Ending Corrector (A utility that makes sure your files have consistent line endings).
const sourcemaps = require('gulp-sourcemaps'); // Maps code in a compressed file (E.g. style.css) back to it’s original position in a source file (E.g. structure.scss, which was later combined with other css files to generate style.css).
const browsersync = require('browser-sync').create(); // Reloads browser and injects CSS. Time-saving synchronized browser testing.

const filter = require('gulp-filter'); // Enables you to work on a subset of the original files by filtering them using glob patterns.
const remember = require('gulp-remember'); //  Adds all the files it has ever seen back into the stream.
const notify = require('gulp-notify'); // Sends message notification to you.
const plumber = require('gulp-plumber'); // Prevent pipe breaking caused by errors from gulp plugins.
const beep = require('beepbeep'); // Make a console beep sound.
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
 * Task: `htmlProdTask`.
 *
 * Change the file name from style.css to style.min.css in html
 *
 * This task does the following:
 *    1. 
 */

gulp.task('htmlProdTask', () => {
    return gulp.src('path/to/your/index.html') // Replace 'path/to/your/index.html' with the path to your HTML file(s)
        .pipe(replace('style.css', 'style.min.css'))
        .pipe(gulp.dest('dist')); // Replace 'dist' with the output directory for your production build
});

/**
 * Task: `scssDevTask`.
 *
 * Compiles Sass and Autoprefixes CSS.
 *
 * This task does the following:
 *    1. Gets the source scss file
 *    2. Compiles Sass to CSS
 *    3. Writes Sourcemaps for it
 *    4. Autoprefixes it and generates style.css
 *    7. Injects CSS or reloads the browser via browsersync
 */
gulp.task('scssDevTask', () => {
    return gulp
        .src(config.styleSRC, { allowEmpty: true })
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
        .pipe(sourcemaps.write('./')) // Output sourcemap for style-rtl.css.
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest(config.styleDestination))
        .pipe(
            notify({
                message: '\n\n✅  ===> styles with auto-prefixers — completed!\n',
                onLast: true
            })
        );
});

/**
 * Task: `scssProdTask`.
 *
 * Compiles Sass, Autoprefixes it and Minifies CSS.
 *
 * This task does the following:
 *    1. Gets the source scss file
 *    2. Compiles Sass to CSS
 *    3. Writes Sourcemaps for it
 *    4. Autoprefixes it and generates style.css
 *    5. Renames the CSS file with suffix .min.css
 *    6. Minifies the CSS file and generates style.min.css
 */
gulp.task('scssProdTask', () => {
    return gulp
        .src(config.styleSRC, { allowEmpty: true })
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
        .pipe(gulp.dest(config.styleDestination))
        .pipe(filter('**/*.css')) // Filtering stream to only css files.
        .pipe(postcss(combinemq())) // Merge Media Queries only for .min.css version.
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./')) // Output sourcemap for style.min.css.
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest(config.styleDestination))
        .pipe(
            notify({
                message: '\n\n✅  ===> minified styles with auto-prefixers — completed!\n',
                onLast: true
            })
        );
});

/**
 * Task: `jsProdTask`.
 *
 * Concatenate and uglify custom JS scripts.
 *
 * This task does the following:
 *     1. Gets the source folder for JS custom files
 *     2. Concatenates all the files and generates custom.js
 *     3. Renames the JS file with suffix .min.js
 *     4. Uglifes/Minifies the JS file and generates custom.min.js
 */
gulp.task('jsProdTask', () => {
    return gulp
        .src(config.jsCustomSRC, { since: gulp.lastRun('jsProdTask') }) // Only run on changed files.
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
        .pipe(remember(config.jsCustomSRC)) // Bring all files back to stream.
        .pipe(concat(config.jsCustomFile + '.js'))
        .pipe(sourcemaps.write('./')) // Output sourcemap for custom.js.
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest(config.jsCustomDestination))
        .pipe(
            rename({
                basename: config.jsCustomFile,
                suffix: '.min'
            })
        )
        .pipe(terser())
        .pipe(sourcemaps.write('./')) // Output sourcemap for custom.min.js.
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest(config.jsCustomDestination))
        .pipe(
            notify({
                message: '\n\n✅  ===> CUSTOM JS — completed!\n',
                onLast: true
            })
        );
});

/**
 * Task: `images`.
 *
 * Minifies PNG, JPEG, GIF and SVG images.
 *
 * This task does the following:
 *     1. Gets the source of images raw folder
 *     2. Minifies PNG, JPEG, GIF and SVG images
 *     3. Generates and saves the optimized images
 *
 * This task will run only once, if you want to change the parameter, 
 * you have to run it again, do it with the command `gulp images`.
 *
 * Read the following to change these options.
 * @link https://github.com/sindresorhus/gulp-imagemin
 */
gulp.task('imageOptiTask', () => {
    return gulp
        .src(config.imgSRC)
        .pipe(
            imagemin([
                imagemin.gifsicle({ interlaced: true }),
                imagemin.mozjpeg({ quality: 75, progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }), // 0-7 low-high.
                imagemin.svgo({
                    plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
                })
            ])
        )
        .pipe(gulp.dest(config.imgDST))
        .pipe(
            notify({
                message: '\n\n✅  ===> IMAGES — completed!\n',
                onLast: true
            })
        );
});

// Convert images to WebP
// Supports PNG, JPEG, TIFF, WebP.
export default () => (
    gulp.src('src/image.jpg')
        .pipe(imagewebp())
        .pipe(gulp.dest('dist'))
);

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
            baseDir: '.'
        }
    });
    done();
};

// Helper function to allow browser reload with Gulp 4.
const reload = done => {
    browsersync.reload();
    done();
};

/**
 * Watch Tasks.
 *
 * Watches for file changes and runs specific tasks.
 */
gulp.task(
    'default',
    gulp.parallel('styles', 'customJS', 'images', browserSync, () => {
        gulp.watch(config.watchPhp, reload); // Reload on PHP file changes.
        gulp.watch(config.watchStyles, gulp.parallel('styles')); // Reload on SCSS file changes.
        gulp.watch(config.watchJsCustom, gulp.series('customJS', reload)); // Reload on customJS file changes.
        gulp.watch(config.imgSRC, gulp.series('images', reload)); // Reload on customJS file changes.
    })
);




gulp.task(
    'default', gulp.series(
        gulp.parallel('htmlProdTask', 'scssProdTask', 'jsProdTask', 'imageOptiTask', browserSync),
        () => {
            gulp.watch(config.watchHtml, reload); // Reload on HTML file changes.
            gulp.watch(config.watchStyles, gulp.series('scssDevTask', reload)); // Reload on SCSS file changes.
            gulp.watch(config.watchJsCustom, gulp.series('jsDevTask', reload)); // Reload on JS file changes.
            gulp.watch(config.imgSRC, gulp.series('imageOptiTask', reload)); // Reload on image file changes.
        })
);

// gulp.task('build', gulp.parallel('htmlProdTask', 'scssProdTask', 'jsProdTask', 'imageOptiTask'));

