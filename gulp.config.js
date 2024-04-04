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
const srcCRCSSFilePath = './dist/css/non-critical-style.css';
const srcNCCSSFilePath = './dist/css/non-critical-style.css';
const distCRCSSFilePath = './dist/css/critical-style.min.css';
const distNCCSSFilePath = './dist/css/non-critical-style.min.css';

const srcGFontCSSFilePath = './src/googlefont/google-fonts.css';
const distGFontCSSFilePath = './dist/css/googlefont/google-fonts.min.css';

const srcNoJSCSSFilePath = './src/noscript.css';
const distNoJSCSSFilePath = './dist/css/noscript.min.css';

// const srcCRLegacyJSFilePath = './dist/scripts/critical-legacy-script.js';    //legacy code same as modern code
const srcCRModernJSFilePath = './dist/scripts/critical-modern-script.js';
const srcNCLegacyJSFilePath = './dist/scripts/non-critical-legacy-script.js';
const srcNCModernJSFilePath = './dist/scripts/non-critical-modern-script.js';

// const distCRLegacyJSFilePath = './dist/scripts/critical-legacy-script.min.js';    //legacy code same as modern code
const distCRModernJSFilePath = './dist/scripts/critical-modern-script.min.js';
const distNCLegacyJSFilePath = './dist/scripts/non-critical-legacy-script.min.js';
const distNCModernJSFilePath = './dist/scripts/non-critical-modern-script.min.js';

// Path to place the revised HTML file.
const htmlDestination = './dist/';  //(same for more HTML files in a HTML folder)

// >>>>> Style options.
// Path to main .scss file.
const styleCRSRC = './src/scss/critical-css/critical-style.scss';
const styleNCSRC = './src/scss/non-critical-css/non-critical-style.scss';
const styleNCSRCsmall = './src/scss/non-critical-css/**/*.scss';

// Path to place the compiled CSS file.
const styleProdDestination = './dist/css/';

// Path to place the compiled CSS file.
const styleCRProdFilePath = './dist/css/critical-style.css';
const styleNCProdFilePath = './dist/css/non-critical-style.css';

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
const jsCRLegacyProdFilePath = jsProdDestination + jsCriticalLegacyFile + '.js';
const jsCRModernProdFilePath = jsProdDestination + jsCriticalModernFile + '.js';
const jsNCLegacyProdFilePath = jsProdDestination + jsNonCriticalLegacyFile + '.js';
const jsNCModernProdFilePath = jsProdDestination + jsNonCriticalModernFile + '.js';

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
    // srcCSSFilePath,
    // distCSSFilePath,
    // srcJSFilePath,
    // distJSFilePath,
    htmlDestination,
    styleCRSRC,
    styleNCSRC,
    styleNCSRCsmall,
    styleProdDestination,
    styleCRProdFilePath,
    styleNCProdFilePath,
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
