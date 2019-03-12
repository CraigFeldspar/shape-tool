const express = require("express");

const NODE_ENV = process.env.NODE_ENV || "production";
const PORT = process.env.PORT || 8080;

const app = express();

const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const fs = require("fs");

app.use(fileUpload());
app.use(bodyParser.json());

if (NODE_ENV === "dev") {
    require("./webpack")(app);
} else if (NODE_ENV === "caas") {
    require("./caas")(app);
}

console.log(`Starting Obsidian static server on 0.0.0.0:${PORT} [${NODE_ENV}]`);
app.listen(PORT);

// File input field name is simply "file"
app.post("/save", (req, res) => {
    if (req.body.image.length === 0 || !req.body.data) {
        return res.status(400).send("No image/json was uploaded.");
    }

    req.body.image = req.body.image.replace(/^data:image\/jpeg+;base64,/, "");
    req.body.image = req.body.image.replace(/ /g, "+");

    let path = "0.jpg";
    let i = 0;

    const items = fs.readdirSync("tmp/");

    while (items.indexOf(path) !== -1) {
        i += 1;
        path = `${i}.jpg`;
    }

    const jpgPath = path;
    fs.writeFile(`tmp/${jpgPath}`, req.body.image, "base64", (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Written file as ${jpgPath}`);
        }
    });

    const jsonPath = `${i}.json`;
    fs.writeFile(`tmp/${jsonPath}`, req.body.data, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Written file as ${jsonPath}`);
        }
    });

    return null;
});
