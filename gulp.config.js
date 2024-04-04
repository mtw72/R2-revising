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

const styleCRFontSRC = './dist/css/googlefont.css';
const styleCRFontFinalFilePath = './dist/css/googlefont.min.css';

const styleNoJSSRC = './dist/css/noscript.css';
const styleNoJSFinalFilePath = './dist/css/noscript.min.css';

// Path to place the revised HTML file.
const htmlDestination = './dist/';  //(same for more HTML files in a HTML folder)

// >>>>> Style options.
// Path to main .scss file.
const styleCRSRC = './src/css/scss-critical/critical-style.scss';
const styleNCSRC = './src/css/scss-non-critical/non-critical-style.scss';

// Path to place the compiled CSS file.
const styleProdDestination = './dist/css/';

// Compiled CSS file name.
const styleCRFile = 'critical-style';
const styleNCFile = 'non-critical-style';

// Path to intermediate CSS file.
const styleCRInterFilePath = styleProdDestination + styleCRFile + '.css';
const styleNCInterFilePath = styleProdDestination + styleNCFile + '.css';

// Path to final CSS file.
const styleCRFinalFilePath = styleProdDestination + styleCRFile + '.min.css';
const styleNCFinalFilePath = styleProdDestination + styleNCFile + '.min.css';

// Available options → 'compact' or 'compressed' or 'nested' or 'expanded'
const outputStyle = 'expanded';

// >>>>> JS options.

// Path to all .js files.
const jsCRSRC = './src/scripts/js-critical/**/*.js';
const jsNCSRC = './src/scripts/js-non-critical/**/*.js';

// Path to place the compiled JS file.
const jsProdDestination = './dist/scripts/';

// Compiled JS file name.
const jsCRLegacyFileName = 'critical-legacy-script';
const jsCRModernFileName = 'critical-modern-script';
const jsNCLegacyFileName = 'non-critical-legacy-script';
const jsNCModernFileName = 'non-critical-modern-script';

// Path to intermediate JS file.
// const jsCRLegacyInterFilePath = jsProdDestination + jsCRLegacyFileName + '.js';   //legacy code same as modern code
const jsCRModernInterFilePath = jsProdDestination + jsCRModernFileName + '.js';
const jsNCLegacyInterFilePath = jsProdDestination + jsNCLegacyFileName + '.js';
const jsNCModernInterFilePath = jsProdDestination + jsNCModernFileName + '.js';

// Path to final JS file.
// const jsCRLegacyFinalFilePath = jsProdDestination + jsCRLegacyFileName + '.min.js';  //legacy code same as modern code
const jsCRModernFinalFilePath = jsProdDestination + jsCRModernFileName + '.min.js';
const jsNCLegacyFinalFilePath = jsProdDestination + jsNCLegacyFileName + '.min.js';
const jsNCModernFinalFilePath = jsProdDestination + jsNCModernFileName + '.min.js';

// >>>>> Images options.

// Source folder of images which should be optimized and watched.
// > You can also specify types e.g. raw/**.{png,jpg,gif} in the glob.
const imgRawSRC = './src/images/raw/*';
const imgResizedSRC = './src/images/resized/*';

// Destination folder of optimized images.
// > Must be different from the imagesSRC folder.
const imgProdDestination = './dist/images/';

// >>>>> Watch files paths.
// Path to all *.html files inside root directory
const watchHtml = './**/*.html';

// Path to all *.scss files inside scss folder and inside them.
const watchCRStyles = './src/css/scss-critical/**/*.scss';
const watchNCStyles = './src/css/scss-non-critical/**/*.scss';

// Path to all JS files.
const watchCRJs = jsCRSRC;
const watchNCJs = jsNCSRC;

// Browsers you care about for auto-prefixing. Browserlist https://github.com/ai/browserslist
// The following list is set as per WordPress requirements. Though; Feel free to change.
const BROWSERS_LIST = ['last 2 version', '> 1%'];

// Export.
module.exports = {
    productURL,
    browserAutoOpen,
    injectChanges,
    // HTML
    htmlSRC,
    htmlDestination,
    // CSS
    styleCRFontSRC,
    styleCRFontFinalFilePath,
    styleNoJSSRC,
    styleNoJSFinalFilePath,
    styleCRSRC,
    styleNCSRC,
    styleCRSRCall,
    styleNCSRCall,
    styleProdDestination,
    styleCRFile,
    styleNCFile,
    styleCRInterFilePath,
    styleNCInterFilePath,
    styleCRFinalFilePath,
    styleNCFinalFilePath,
    outputStyle,
    // JS
    jsCRSRC,
    jsNCSRC,
    jsProdDestination,
    jsCRLegacyFileName,
    jsCRModernFileName,
    jsNCLegacyFileName,
    jsNCModernFileName,
    jsCRLegacyInterFilePath,
    jsCRModernInterFilePath,
    jsNCLegacyInterFilePath,
    jsNCModernInterFilePath,
    jsCRLegacyFinalFilePath,
    jsCRModernFinalFilePath,
    jsNCLegacyFinalFilePath,
    jsNCModernFinalFilePath,
    // IMG
    imgRawSRC,
    imgResizedSRC,
    imgProdDestination,
    // WATCH
    watchHtml,
    watchCRStyles,
    watchNCStyles,
    watchCRJs,
    watchNCJs,
    BROWSERS_LIST
};
