/**
 * Gulp Configuration File
 *
 * 1. Edit the variables as per your project requirements.
 * 2. In paths you can add <<glob or array of globs>>.
 *
 */

// Theme/Plugin URL. Leave it like it is; since our gulpfile.js lives in the root folder.
const productURL = '.';
const browserAutoOpen = false;
const injectChanges = true;

// >>>>> Style options.
// Path to .html file.
const htmlSRC = './index.html';
// const htmlSRC = ['index.html', 'html/**/*.html']; //(for more HTML files in a HTML folder)

// Change of file paths in index.html file.
const srcCSSFilePath = './dist/css/style.css';
const distCSSFilePath = './css/style.min.css';
const srcJSFilePath = './dist/scripts/script.js';
const distJSFilePath = './scripts/script.min.js';

// Path to place the revised HTML file.
const htmlDestination = './dist/';  //(same for more HTML files in a HTML folder)

// >>>>> Style options.
// Path to main .scss file.
const styleSRC = './src/scss/style.scss';

// Path to place the compiled CSS file.
const styleDevDestination = './src/scss/';
const styleProdDestinationFilePath = './dist/css/style.css';
const styleProdDestination = './dist/css/';

// Available options → 'compact' or 'compressed' or 'nested' or 'expanded'
const outputStyle = 'expanded';

// >>>>> JS options.

// Path to JS scripts folders.
const jsCriticalSRC = './src/scripts/critical/**/*.js';
const jsNonCriticalSRC = './src/scripts/non-critical/**/*.js';

// Path to place the compiled JS file.
const jsProdDestination = './dist/scripts/';

// Compiled JS file name.
const jsCriticalLegacyFile = 'critical-legacy-script';
const jsCriticalModernFile = 'critical-modern-script';
const jsNonCriticalLegacyFile = 'non-critical-legacy-script';
const jsNonCriticalModernFile = 'non-critical-modern-script';

// File path of intermediate JS file.
const jsCRLegacyProdFilePath = './dist/scripts/' + jsCriticalLegacyFile + '.js';
const jsCRModernProdFilePath = './dist/scripts/' + jsCriticalModernFile + '.js';
const jsNCLegacyProdFilePath = './dist/scripts/' + jsNonCriticalLegacyFile + '.js';
const jsNCModernProdFilePath = './dist/scripts/' + jsNonCriticalModernFile + '.js';

// >>>>> Images options.

// Source folder of images which should be optimized and watched.
// > You can also specify types e.g. raw/**.{png,jpg,gif} in the glob.
const imgrawSRC = './src/images/raw/*';
const imgresizedSRC = './src/images/resized/*';

// Destination folder of optimized images.
// > Must be different from the imagesSRC folder.
const imgProdDestination = './dist/images/';

// >>>>> Watch files paths.
// Path to all *.html files inside root directory
const watchHtml = './**/*.html';

// Path to all *.scss files inside scss folder and inside them.
const watchStyles = './src/scss/**/*.scss';

// Path to all JS files.
const watchJs = './src/scripts/*.js';


// Browsers you care about for auto-prefixing. Browserlist https://github.com/ai/browserslist
// The following list is set as per WordPress requirements. Though; Feel free to change.
const BROWSERS_LIST = ['last 2 version', '> 1%'];

// Export.
module.exports = {
    productURL,
    browserAutoOpen,
    injectChanges,
    htmlSRC,
    srcCSSFilePath,
    distCSSFilePath,
    srcJSFilePath,
    distJSFilePath,
    htmlDestination,
    styleSRC,
    styleDevDestination,
    styleProdDestinationFilePath,
    styleProdDestination,
    outputStyle,
    jsCriticalSRC,
    jsNonCriticalSRC,
    jsProdDestination,
    jsCRLegacyProdFilePath,
    jsCRModernProdFilePath,
    jsNCLegacyProdFilePath,
    jsNCModernProdFilePath,
    jsCriticalLegacyFile,
    jsCriticalModernFile,
    jsNonCriticalLegacyFile,
    jsNonCriticalModernFile,
    imgrawSRC,
    imgresizedSRC,
    imgProdDestination,
    watchHtml,
    watchStyles,
    watchJs,
    BROWSERS_LIST
};
