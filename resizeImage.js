/**
 * Task: `img`. (type "node img" in the terminal)
 *
 * Resizes PNG, JPEG, WebP and TIFF images.
 *
 * This task does the following:
 *     1. Gets the source of images raw folder
 *     2. Resizes PNG, JPEG, WebP and TIFF images according to different needs
 *     3. Generates and saves the re-sized images in images resized folder
 *
 * This task will run only once, if you want to change the parameter, 
 * you have to run it again, do it with the command `gulp imageOptiTask`.
 *
 * Read the following to change these options.
 * @link https://github.com/lovell/sharp
 * @link https://github.com/VLabStudio/Tutorials/blob/master/Image%20Processing%20in%20Node.js%20with%20Sharp/app.js
 */

// Config variables
const imgRawSRC = "./src/assets/images/raw/";
const imgResizedDEST = "./src/assets/images/resized/"; //The folder must be manually created
const jpeg = ".jpeg";
const png = ".png";

// Import dependencies
const sharp = require("sharp");

(async function () {

    try {
        // Function to resize images
        function resizeImage(inputImagePath, outputImagePath, width, height) {
            sharp(inputImagePath)
                .resize(Math.round(width * 1.3), Math.round(height * 1.3))
                .toFile(outputImagePath);
        }

        // Hero images
        resizeImage(imgRawSRC + "home-bg-sm" + jpeg, imgResizedDEST + "home-bg-sm" + jpeg, 450, 450 * 4 / 3);
        resizeImage(imgRawSRC + "home-bg-md" + jpeg, imgResizedDEST + "home-bg-md" + jpeg, 931, 931 * 4 / 5);
        resizeImage(imgRawSRC + "home-bg-lg" + jpeg, imgResizedDEST + "home-bg-lg" + jpeg, 1500, 1500 * 9 / 16);
        // unchanged but rename the xl background image
        sharp(imgRawSRC + "home-bg-lg" + jpeg)
            .toFile(imgResizedDEST + "home-bg-xl" + jpeg);

        //Twitter Card Image: should be at least 280px in width, and at least 150px in height. Image must be less than 1MB in size.
        sharp(imgRawSRC + "home-bg-lg" + jpeg)
            .resize(280 * 16 / 10, 280 * 9 / 10)
            .toFile(imgResizedDEST + "twitter-image" + jpeg);

        // OG Image: use images with a 1.91:1 ratio and minimum recommended dimensions of 1200x630 for optimal clarity across all devices.
        resizeImage(imgRawSRC + "og-image" + jpeg, imgResizedDEST + "og-image" + jpeg, 1200, 630);

        //Food Images - same size on different viewport widths
        const foodImageNames = [
            "salmon-spaghetti",
            "satay-chicken-skewers",
            "thai-pineapple-fried-rice"
        ];

        foodImageNames.forEach(imageName => {
            resizeImage(imgRawSRC + imageName + jpeg, imgResizedDEST + imageName + jpeg, 380, 501);
        });

        // Reservation Photo - different sizes on different viewport widths
        resizeImage(imgRawSRC + "r2place-entrance" + jpeg, imgResizedDEST + "r2place-entrance-sm" + jpeg, 425, 425 / 1.68);
        resizeImage(imgRawSRC + "r2place-entrance" + jpeg, imgResizedDEST + "r2place-entrance-md" + jpeg, 600, 600 / 1.68);

        // Logo - unchanged
        sharp(imgRawSRC + "R2" + png)
            .toFile(imgResizedDEST + "R2" + png);

        console.log('IMAGES RESIZE — completed!');

    } catch (error) {
        console.log(error);
    }
})();