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
            .resize(618, 824)
            .toFile(resizedImgDest + "home-bg-sm" + jpeg);

        sharp(rawImgSRC + "home-bg-md" + jpeg)
            .resize(1278, 1598)
            .toFile(resizedImgDest + "home-bg-md" + jpeg);

        sharp(rawImgSRC + "home-bg-lg" + jpeg)
            .resize(2000, 1125)
            .toFile(resizedImgDest + "home-bg-lg" + jpeg);

        sharp(rawImgSRC + "home-bg-lg" + jpeg)
            .toFile(resizedImgDest + "home-bg-xl" + jpeg);

        //Images for Twitter Card should be at least 280px in width, and at least 150px in height. Image must be less than 1MB in size.
        sharp(rawImgSRC + "home-bg-lg" + jpeg)
            .resize(280 * 16 / 10, 280 * 9 / 10)
            .toFile(resizedImgDest + "twitter-image" + jpeg);

        // OG Image: Use images with a 1.91:1 ratio and minimum recommended dimensions of 1200x630 for optimal clarity across all devices.
        sharp(rawImgSRC + "og-image" + jpeg)
            .resize(1200 * 1.5, 630 * 1.5)
            .toFile(resizedImgDest + "og-image" + jpeg);

        //Food Images - same size on different viewport widths
        sharp(rawImgSRC + "salmon-spaghetti" + jpeg)
            .resize(Math.round(380 * 1.3), Math.round(501 * 1.3))
            .toFile(resizedImgDest + "salmon-spaghetti" + jpeg);

        sharp(rawImgSRC + "satay-chicken-skewers" + jpeg)
            .resize(Math.round(380 * 1.3), Math.round(501 * 1.3))
            .toFile(resizedImgDest + "satay-chicken-skewers" + jpeg);

        sharp(rawImgSRC + "thai-pineapple-fried-rice" + jpeg)
            .resize(Math.round(380 * 1.3), Math.round(501 * 1.3))
            .toFile(resizedImgDest + "thai-pineapple-fried-rice" + jpeg);

        // Reservation Photo - different sizes on different viewport widths
        sharp(rawImgSRC + "r2place-entrance" + jpeg)
            .resize(Math.round(425 * 1.3), Math.round(257 * 1.3))
            .toFile(resizedImgDest + "r2place-entrance-sm" + jpeg);

        sharp(rawImgSRC + "r2place-entrance" + jpeg)
            .resize(Math.round(600 * 1.3), Math.round(361 * 1.3))
            .toFile(resizedImgDest + "r2place-entrance-md" + jpeg);

        sharp(rawImgSRC + "R2" + png)
            .toFile(resizedImgDest + "R2" + png);

        // Convert image format to PNG, WebP, JPED, TIFF, HEIF, RAW
        // const info = await sharp("images/shapes.png").png().toFile("images/edited-shapes.png");
        // const info = await sharp("images/shapes.png")().toFile("images/edited-shapes");
        // console.log(info);

        console.log('IMAGES RESIZE — completed!');

    } catch (error) {
        console.log(error);
    }
})();