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

// config variables
const rawImgSRC = "./src/images/raw/";
const resizedImgDest = "./src/images/resized/";
const jpeg = ".jpeg";
const png = ".png";

// Import dependencies
const sharp = require("sharp");

(async function () {

    try {
        // // Resizes the image
        // Hero Image - different images on different viewport widths
        sharp(rawImgSRC + "home-bg-sm" + jpeg)
            .resize(Math.round(450 * 1.3), Math.round(450 * 1.3 * 4 / 3))
            .toFile(resizedImgDest + "home-bg-sm" + jpeg);

        sharp(rawImgSRC + "home-bg-md" + jpeg)
            .resize(Math.round(931 * 1.3), Math.round(931 * 1.3 * 4 / 5))
            .toFile(resizedImgDest + "home-bg-md" + jpeg);

        sharp(rawImgSRC + "home-bg-lg" + jpeg)
            .resize(Math.round(1500 * 1.3), Math.round(1500 * 1.3 * 9 / 16))
            .toFile(resizedImgDest + "home-bg-lg" + jpeg);

        sharp(rawImgSRC + "home-bg-lg" + jpeg)
            .toFile(resizedImgDest + "home-bg-xl" + jpeg);

        //Images for Twitter Card should be at least 280px in width, and at least 150px in height. Image must be less than 1MB in size.
        sharp(rawImgSRC + "home-bg-lg" + jpeg)
            .resize(280 * 16 / 10, 280 * 9 / 10)
            .toFile(resizedImgDest + "twitter-image" + jpeg);

        // OG Image: Use images with a 1.91:1 ratio and minimum recommended dimensions of 1200x630 for optimal clarity across all devices.
        sharp(rawImgSRC + "og-image" + jpeg)
            .resize(Math.round(1200 * 1.3), Math.round(630 * 1.3))
            .toFile(resizedImgDest + "og-image" + jpeg);

        // Reservation Photo - different sizes on different viewport widths
        sharp(rawImgSRC + "r2place-entrance" + jpeg)
            .resize(Math.round(425 * 1.3), Math.round(257 * 1.3))
            .toFile(resizedImgDest + "r2place-entrance-sm" + jpeg);

        sharp(rawImgSRC + "r2place-entrance" + jpeg)
            .resize(Math.round(600 * 1.3), Math.round(361 * 1.3))
            .toFile(resizedImgDest + "r2place-entrance-md" + jpeg);

        //Food Images - same size on different viewport widths
        const imageNames = [
            "salmon-spaghetti",
            "satay-chicken-skewers",
            "thai-pineapple-fried-rice"
        ];

        imageNames.forEach(imageName => {
            sharp(rawImgSRC + imageName + jpeg)
                .resize(Math.round(380 * 1.3), Math.round(501 * 1.3))
                .toFile(resizedImgDest + imageName + jpeg);
        });

        // Reservation Photo - different sizes on different viewport widths
        sharp(rawImgSRC + "r2place-entrance" + jpeg)
            .resize(Math.round(425 * 1.3), Math.round(257 * 1.3))
            .toFile(resizedImgDest + "r2place-entrance-sm" + jpeg);

        sharp(rawImgSRC + "r2place-entrance" + jpeg)
            .resize(Math.round(600 * 1.3), Math.round(361 * 1.3))
            .toFile(resizedImgDest + "r2place-entrance-md" + jpeg);

        // Logo - unchanged
        sharp(rawImgSRC + "R2" + png)
            .toFile(resizedImgDest + "R2" + png);

        console.log('IMAGES RESIZE — completed!');

    } catch (error) {
        console.log(error);
    }
})();