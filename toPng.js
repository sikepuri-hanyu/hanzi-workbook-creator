const sharp = require("sharp");
const glob = require("glob");

glob("tmp/*.svg", (_, files) => {
    files.forEach(file => {
        sharp(file)
            .png()
            .toFile(`${file.slice(0, -4)}.png`)
    });
});
