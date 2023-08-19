const router = require('express').Router();
const User = require('../db/modals/UserSchema');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, "public/images")
    },
        filename: (req, file, cb)=> {
            cb(null, file.fieldname+ "_"+ Date.now()+ path.extname(file.originalname))
        }
})

const upload = multer({
    storage: storage,
});

// router.post("/uploadImages",  upload.single('image'), async (req, res)=> {
//     console.log("file", req.file);
// });

router.post("/new-registration", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'quote', maxCount: 1 }]), async (req, res)=> {
    const {  name, email, phone } = req.body;
    let image="";
    let quote = "";
    if(req.files['image']){
        image = req.files['image'][0].filename
    }
    if(req.files['quote']){
        quote = req.files['quote'][0].filename;
    }
    const alreadyExists = await User.findOne({email: email});
    const userData = new User({
        image: image,
        name: name,
        email: email,
        phone: phone,
        quote: quote,
    });
    if(image || name || email || phone || quote){
        if(!alreadyExists){
            await userData.save();
            res.status(200).json({userData,  message: 'Registration successfully'});
        }else{
            // console.log("User already exists");
            res.status(200).json({userData, message: "User already exists"});
        }
    }
});

router.get("/users", async(req, res)=> {
    const fetchData = await User.find();
    res.status(200).json(fetchData);
});

router.delete("/users/delete/:id", async(req, res)=> {
    const id = req.params.id;
    console.log(id);
    if(id){
        const DeleteId = await User.findByIdAndDelete(id);
        res.status(200).json({DeleteId, message: 'deleted successfully'});
    }else {
        res.status(404).json({ message: "delete failed"})
    }
});




module.exports = router;