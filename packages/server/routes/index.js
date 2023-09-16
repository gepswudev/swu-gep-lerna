const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Middleware
const identifyIP = require("../middlewares/ipidentify");
const { tokenize } = require("../middlewares/tokenize");
const getFiles = require("../utils/getFile");

router.get("/", identifyIP, async (req, res, next) => {
  res.locals.userAgent = req.get("User-Agent");
  res.render("index", { title: "GEP-SWU Server" });
});

router.get("/health", async (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
  });
});

router.get('/getfile', (req, res) => {
  let fileData = [];
  const directoryPath = path.join(__dirname, '../files');
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.log(err); 
      return res.status(500).json({ status:"error",message: 'Unable to scan files!' });
    }
    files.forEach((file) => {
      let isDir = fs.lstatSync(`${directoryPath}/${file}`).isDirectory();
      let fileStat = fs.statSync(`${directoryPath}/${file}`);
      let fileExt = path.extname(`${directoryPath}/${file}`);
      fileData.push({
        isDir: isDir,
        name: file,
        url: `files/${file}`,
        size: fileStat.size,
        created: fileStat.birthtime,
        modified: fileStat.mtime,
        ext: fileExt
      });
    });
    res.status(200).json({status:"success", data: fileData });
  });
});

router.get('/getfile/:filename', async (req, res) => {
  const filename = req.params.filename;
  
  res.download(`${__dirname}/../files/${filename}`, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status:"error",message: 'Error occurred while downloading the file.' });
    }
  }
  );
});

router.post('/filesys', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ status:"error", message: 'No files were uploaded.' });
  }

  // The name of the input field (e.g. "file") is used to retrieve the uploaded file
  const uploadedFile = req.files.fileupload;
  uploadedFile.name.replace(/[()]/g, '').replace(/:/g, '').replace(/\s+/g, '_');

  // Use the mv() method to place the file somewhere on your server
  // For simplicity, we'll save the file in the "files" directory in the project root
  uploadedFile.mv(`${__dirname}/../files/${uploadedFile.name}`, (err) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ status:"error",message: 'Error occurred while uploading the file.' });
    }
    
    res.status(200).json({ status:"success",message: 'File uploaded successfully.' });
  });
});

router.delete('/filesys/:filename', tokenize, (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, '../files', filename);
  fs.unlink(filepath, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status:"error",message: 'Error occurred while deleting the file.' });
    }
    res.status(200).json({status:"success", message: `${filename} was deleted!` });
  });
});

router.put('/md/edit/:id', tokenize, (req, res) => {
  const id = req.params.id;
  const md = req.body.md;

  fs.writeFile(`${__dirname}/../public/markdown/${id}.md`, md, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status:"error",message: 'Error occurred while editing the file.' });
    }
    res.status(200).json({status:"success", message: `${id}.md was edited!` });
  }
  );
});

router.get('/getlog', (req, res) => {
  if(process.env.NODE_ENV == 'production') return res.status(403).json({ status:"error",message: 'Forbidden' }); 
  res.zip([
    { path: `${__dirname}/../log/database/error.log`, name: 'error.log' },
    { path: `${__dirname}/../log/database/delete.log`, name: 'error.log' },
    { path: `${__dirname}/../log/database/info.log`, name: 'info.log' },
    { path: `${__dirname}/../log/database/update.log`, name: 'update.log' },],
    'log.zip', (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ status:"error",message: 'Error occurred while downloading the file.' });
      }
    }
  );
});

router.get('/pubfiles', (req, res) => {
  const files = getFiles(`${__dirname}/../public`);
  const re_files = files.map((file) => {
    return file.replace(`${__dirname}/../public/`, '');
  });
  const filename = files.map((file) => {
    return file.split('/').pop();
  });
  res.status(200).json({status:"success", files: re_files, filename:filename});
});

router.get('/pubfiles/all', async (req, res) => {
  //zip all files in the public folder by express-zip
  const files = getFiles(`${__dirname}/../public`);
  const filenameAndPath = files.map((file) => {
    return { path: file, name: file.split('/').pop() };
  });
  res.zip(filenameAndPath, `public_${Date.now()}.zip`, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status:"error",message: 'Error occurred while downloading the file.' });
    }
  }
  );
});

router.get('/pubfiles/:path', async (req, res) => {
  const path = req.params.path;
  const re_path = path.replace(/:/g, '/')
  const files = `${__dirname}/../public/${re_path}`;
  res.download(files, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status:"error",message: 'Error occurred while downloading the file.',path:re_path });
    }
  }
  );
});

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Main
 *   description: Main page of API server and API documentation
 * 
 * /:
 *   get:
 *     summary: Main page of API server
 *     description: This is the main page of the API server for the GEP SWU Website. You can find all the API documentation here.
 *     tags: [Main]
 *     responses:
 *       200:
 *         description: Successfully rendered the main page.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * tags:
 *   name: Documentation
 *   description: API documentation
 * 
 * /docs:
 *   get:
 *     summary: API documentation page
 *     description: This is the API documentation page of the API server for the GEP SWU Website. You can find all the API documentation here.
 *     tags: [Documentation]
 *     responses:
 *       200:
 *         description: Successfully rendered the API documentation page.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * tags:
 *   name: Health
 *   description: Health check
 * 
 * /health:
 *   get:
 *     summary: Health check page
 *     description: This is the health check page of the API server for the GEP SWU Website. You can check if the server is running or not here.
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the server.
 *                   example: OK
 *                 message:
 *                   type: string
 *                   description: Status message.
 *                   example: Server is running
 *       500:
 *         description: Internal server error.
 */