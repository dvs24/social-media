import express from 'express'
import multer from 'multer'

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file,cb)=>{
        cb(null, "public/images")
    },
    filename: (req, file,cb)=>{
        cb(null, req.body.name);
    }
})

const upload = multer({
    storage : storage
})

router.post('/', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        return res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default router;