const express = require('express')

const router = express.Router()

const {getAll , getData , createData , deleteData , updateData  } = require('../controller/user.controller')
const upload = require('../middleware/user.multer')

router.get('/getAll', getAll)
router.get('/get/:id' , getData)
router.post('/create' , upload.single('image') , createData)
router.put('/update/:id' , upload.single('image'),updateData)
router.delete('/delete/:id' , deleteData)

module.exports = router