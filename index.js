const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const multer = require("multer");
app.use(express.json());
app.use(cors());
var fs = require("fs");




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },




  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    console.log({ fileExt });
    const fileName =
      file.originalname
        .replace("fileExt", "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();
      console.log(fileName);
    cb(null, fileName + fileExt);
  },
});



const upload = multer({

  storage:storage,
  limits: {
    fileSize: 8000000, //8 mb
  },

  fileFilter: (req, file, cb) => {
    console.log(file);
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only pdf file supported"));
    }
  },
});

app.get('/doc',(req,res)=>{
    const x = `uploads/cv-of-sagar-biswas-2.pdf-1683793736893.pdf`;
   const stream = fs.createReadStream(x);
  stream.pipe(res);
})

app.get("/", (req, res) => {res.send("hello")});



app.post("/upload", upload.single("bookPDF"), (req, res) => {
  // Handle the uploaded file here
  console.log(49,req.file);
  const x= req.file.path
  console.log(x)

   res.json("File uploaded successfully");
});




app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send(err.message);
  } else {
    res.send("success");
  }
});




app.listen(4000, () => {
  console.log("Server started on port 4000");
});
