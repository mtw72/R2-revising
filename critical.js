import { generate } from 'critical';

generate({
    // Inline the generated critical-path CSS
    // - true generates HTML
    // - false generates CSS
    inline: false,

    // Your base directory
    base: '.',

    // HTML source
    // html: '<html>...</html>',

    // HTML source file
    src: 'index.html',

    // Your CSS Files (optional)
    css: ['dist/css/style.min.css'],

    // Viewport width
    width: 50,

    // Viewport height
    height: 100,

    // dimensions: [
    //     {
    //         height: 200,
    //         width: 500,
    //     },
    //     {
    //         height: 900,
    //         width: 1200,
    //     },
    // ],

    // Output results to file
    target: {
        css: 'critical.min.css',
        html: 'index-critical.html',
        uncritical: 'uncritical.min.css',
    },

    // Extract inlined styles from referenced stylesheets
    extract: true,

    // ignore CSS rules
    // ignore: {
    //     atrule: ['@font-face'],
    //     rule: [/some-regexp/],
    //     decl: (node, value) => /big-image\.png/.test(value),
    // },
});

console.log("done");
