const fs = require("fs");
const path = require("path");
const pdf = require("pdf-creator-node");

// Read fonts and background image
let titleFont = fs.readFileSync(
  path.resolve(__dirname, "./assets/fonts/gallerymodern-webfont.ttf")
);
let paragraphFont = fs.readFileSync(
  path.resolve(__dirname, "./assets/fonts/Caudex-Regular.ttf")
);

let strTitleFont = titleFont.toString("base64");
let strParagraphFont = paragraphFont.toString("base64");
let strBackgroundImage = base64_encode("./assets/images/page1_background.png");

function base64_encode(file) {
  // read binary data
  let bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return Buffer.from(bitmap).toString("base64");
}

// Read HTML template
var html = fs.readFileSync(path.join(__dirname, "./page1.html"), "utf8");

const options = {
  format: "A3",
  orientation: "portrait",
};

const mapObj = {
  strTitleFont: strTitleFont,
  strParagraphFont: strParagraphFont,
  strBackgroundImage: strBackgroundImage,
  clientName: "Dmytro Syrbyl",
};

// By default a file is created but you could switch between Buffer and Streams by using "buffer" or "stream" respectively.
const document = {
  html: html.replace(
    /\b(?:strTitleFont|strParagraphFont|strBackgroundImage|clientName)\b/gi,
    (matched) => mapObj[matched]
  ),
  data: {},
  path: "./result.pdf",
  type: "", // "stream" || "buffer" || "" ("" defaults to pdf)
};

pdf
  .create(document, options)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.error(error);
  });
