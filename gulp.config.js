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
const styleCSSSRC = './src/styles/*.css';

// Path to main .scss file.
const styleCRSRC = './src/styles/scss-critical/critical-style.scss';
const styleNCSRC = './src/styles/scss-non-critical/non-critical-style.scss';

// Path to place the compiled CSS file.
const styleProdDestination = './dist/styles/';

// Compiled CSS file name.
const styleCRFileName = 'critical-style';
const styleNCFileName = 'non-critical-style';

// Path to intermediate CSS file.
const styleCSSInterFilePath
    = [styleProdDestination + 'googlefont.css', styleProdDestination + 'loader.css', styleProdDestination + 'noscript.css',];
const styleCRInterFilePath = styleProdDestination + styleCRFileName + '.css';
const styleNCInterFilePath = styleProdDestination + styleNCFileName + '.css';

// Available options → 'compact' or 'compressed' or 'nested' or 'expanded'
const outputStyle = 'expanded';

// >>>>> JS options.

// Path to all .js files.
const jsCRSRC = './src/scripts/js-critical/**/*.js';
// const jsNCSRC = './src/scripts/js-non-critical/**/*.js';

const jsnc = './src/scripts/js-non-critical/';
const jsNCSRC = [
    jsnc + 'navbar.js',
    jsnc + 'menu/accordion.js',
    jsnc + 'menu/carousel.js',
    jsnc + 'menu/menu.js',
    jsnc + 'reservationForm/formVariables.js',
    jsnc + 'reservationForm/formDefaultDate.js',
    jsnc + 'reservationForm/formDefaultTime.js',
    jsnc + 'reservationForm/formSelect.js',
    jsnc + 'reservationForm/formTextarea.js',
    jsnc + 'reservationForm/formValidation.js',
    jsnc + 'reservationForm/popUpMessage.js',
    jsnc + 'footer.js',
];


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
const watchHtml = './index.html';

// Path to all *.scss files inside scss folder and inside them.
const watchCssStyles = styleCSSSRC;

// Path to all *.scss files inside scss folder and inside them.
const watchCRStyles = './src/styles/scss-critical/**/*.scss';
const watchCommonStyles = './src/styles/scss-common-partials/**/*.scss';
const watchNCStyles = './src/styles/scss-non-critical/**/*.scss';

// Path to all .js files.
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
    styleCSSSRC,
    styleCRSRC,
    styleNCSRC,
    styleProdDestination,
    styleCRFileName,
    styleNCFileName,
    styleCSSInterFilePath,
    styleCRInterFilePath,
    styleNCInterFilePath,
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
    watchCssStyles,
    watchCRStyles,
    watchCommonStyles,
    watchNCStyles,
    watchCRJs,
    watchNCJs,
    // AUTOPREFIXING
    BROWSERS_LIST
};
