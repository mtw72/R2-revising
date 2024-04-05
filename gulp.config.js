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

// >>>>> Html options.
// Path to .html file.
const htmlIndexSRC = './index.html';

// Path to place the copied HTML file.
const htmlDestination = './dist/';

// >>>>> Style options.
// Path to very critical css file and noscript css file.
const styleCSSSRC = './src/css/*.css';

// Path to main .scss file.
const styleCRSRC = './src/css/scss-critical/critical-style.scss';
const styleNCSRC = './src/css/scss-non-critical/non-critical-style.scss';

// Path to place the compiled CSS file.
const styleProdDestination = './dist/css/';

// Compiled CSS file name.
const styleCRFile = 'critical-style';
const styleNCFile = 'non-critical-style';

// Path to intermediate CSS file.
const styleCSSInterFilePath
    = [styleProdDestination + 'googlefont.css', styleProdDestination + 'loader.css', styleProdDestination + 'noscript.css',];
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
// const jsCRLegacyInterFilePath = jsProdDestination + jsCRLegacyFileName + '.js';   //legacy code same as modern code in this project
const jsCRModernInterFilePath = jsProdDestination + jsCRModernFileName + '.js';
const jsNCLegacyInterFilePath = jsProdDestination + jsNCLegacyFileName + '.js';
const jsNCModernInterFilePath = jsProdDestination + jsNCModernFileName + '.js';

// Path to final JS file.
// const jsCRLegacyFinalFilePath = jsProdDestination + jsCRLegacyFileName + '.min.js';  //legacy code same as modern code in this project
const jsCRModernFinalFilePath = jsProdDestination + jsCRModernFileName + '.min.js';
const jsNCLegacyFinalFilePath = jsProdDestination + jsNCLegacyFileName + '.min.js';
const jsNCModernFinalFilePath = jsProdDestination + jsNCModernFileName + '.min.js';

// >>>>> Images options.

// Path to raw images to be optimized.
// > You can also specify types e.g. raw/**.{png,jpg,gif} in the glob.
const imgResizedSRC = './src/assets/images/resized/*';

// Path to optimized images.
// > Must be different from the imagesSRC folder.
const imgProdDestination = './dist/assets/images/';

// >>>>> Fonts options.

// Path to all fonts to be copied.
const fontAllSRC = './src/assets/webfonts/**/*';

// Path to copied fonts.
// > Must be different from the fontAllSRC folder.
const fontAllProdDestination = './dist/assets/webfonts/';

// Path to Google Fonts to be converted to a different format.
const fontGoogleSRC = './src/assets/webfonts/googlefonts/*';

// Path to reformatted Google Fonts.
// > Must be different from the fontGoogleSRC folder.
const fontGoogleProdDestination = './dist/assets/webfonts/googlefonts/';

// >>>>> Watch files paths.
// Path to all *.html files inside root directory
const watchHtml = './**/*.html';

// Path to all *.scss files inside scss folder and inside them.
const watchCRStyles = './src/css/scss-critical/**/*.scss';
const watchCommonStyles = './src/css/scss-common-partials/**/*.scss';
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
    htmlIndexSRC,
    htmlDestination,
    // CSS
    // styleCRFontSRC,
    // styleCRFontFinalFilePath,
    // styleNoJSSRC,
    // styleNoJSFinalFilePath,
    styleCSSSRC,
    styleCRSRC,
    styleNCSRC,
    // styleCRSRCall,
    // styleNCSRCall,
    styleProdDestination,
    styleCRFile,
    styleNCFile,
    styleCSSInterFilePath,
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
    // jsCRLegacyInterFilePath,
    jsCRModernInterFilePath,
    jsNCLegacyInterFilePath,
    jsNCModernInterFilePath,
    // jsCRLegacyFinalFilePath,
    jsCRModernFinalFilePath,
    jsNCLegacyFinalFilePath,
    jsNCModernFinalFilePath,
    // IMG
    imgResizedSRC,
    imgProdDestination,
    // FONT
    fontAllSRC,
    fontAllProdDestination,
    fontGoogleSRC,
    fontGoogleProdDestination,
    // WATCH
    watchHtml,
    watchCRStyles,
    watchCommonStyles,
    watchNCStyles,
    watchCRJs,
    watchNCJs,
    BROWSERS_LIST
};
