/**
 * Gulp Configuration File
 *
 * 1. Edit the variables as per your project requirements.
 * 2. In paths you can add <<glob or array of globs>>.
 *
 */

// Theme/Plugin URL. Leave it like it is; since our gulpfile.js lives in the root folder.
const productURL = './';
const browserAutoOpen = false;
const injectChanges = true;

// >>>>> Style options.
// Path to main .scss file.
const htmlSRC = './index.html';
// const htmlSRC = ['index.html', 'html/**/*.html']; //(for more HTML files in a HTML folder)

// Path to place the compiled CSS file.
const htmlDestination = './dist/';  //(same for more HTML files in a HTML folder)

// >>>>> Style options.
// Path to main .scss file.
const styleSRC = './src/scss/style.scss';

// Path to place the compiled CSS file.
const styleDevDestination = './src/scss/';
const styleProdDestination = './dist/css/';

// Available options → 'compact' or 'compressed' or 'nested' or 'expanded'
const outputStyle = 'compact';

// >>>>> JS options.

// Path to JS scripts folder.
const jsSRC = './src/scripts/**/*.js';

// Path to place the compiled JS custom scripts file.
const jsDevDestination = './src/scripts/';
const jsProdDestination = './dist/scripts/';

// Compiled JS custom file name. Default set to custom i.e. custom.js.
const jsFile = 'script';

// >>>>> Images options.

// Source folder of images which should be optimized and watched.
// > You can also specify types e.g. raw/**.{png,jpg,gif} in the glob.
const imgSRC = './src/images/raw/**/*';

// Destination folder of optimized images.
// > Must be different from the imagesSRC folder.
const imgDevDestination = './src/images/optimized/';
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
    htmlDestination,
    styleSRC,
    styleDevDestination,
    styleProdDestination,
    outputStyle,
    jsSRC,
    jsDevDestination,
    jsProdDestination,
    jsFile,
    imgSRC,
    imgDevDestination,
    imgProdDestination,
    watchHtml,
    watchStyles,
    watchJs,
    BROWSERS_LIST
};
