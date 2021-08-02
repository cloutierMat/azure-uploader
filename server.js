require('dotenv').config()
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const { uploadToAzure } = require('./azure/fileUploader')
const app = express()
const port = process.env.PORT || 8888

const upload = multer({dest: `${__dirname}/uploads`})

// Express parser
app.use(cors())

app.post('/image-upload',upload.single("file"), async (req,res) => {
	const fileName = req.file.filename + "." + req.body.extension
	const tempPath = req.file.path
	const targetPath = path.join(__dirname, `./uploads/${fileName}`)
	fs.rename(tempPath, targetPath, (err) =>{
		if(err) {
			console.log(err)
			res.sendStatus(500)
		}
	})
	const uploadedResponse = await uploadToAzure(fileName, targetPath)
	fs.promises.unlink(targetPath)
	res.send(uploadedResponse)
})

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`)
})