var express = require("express");
var router = express.Router();
const multer = require("multer");

var { ImgurClient } = require("imgur");
const fs = require("fs");

const path = "public/uploads";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });
router.post("/", upload.single("file"), async (req, res) => {
    console.log(req.file)
    const { filename } = req.file;
    const imgur = new ImgurClient({ accessToken: process.env.TOKEN });
    let uploadPath = "./public/uploads/" + filename;
    await imgur
        .upload({
            image: fs.createReadStream(uploadPath),
            type: "stream",
        })
        .then((response) => {
            fs.unlinkSync(uploadPath);
            if (response.success) {
                return res.json({ image: response.data.link });
            } else {
                return res.status(400).json({ error: response });
            }
        });
});

module.exports = router;