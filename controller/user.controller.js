const User = require('../model/user.model')
const fs = require('fs')


const getAll = async (req, res) => {
    try {
      const users = await User.find({})  //get all data 
      return res.status(200).json(users)  
    } catch (error) {
        return res.status(500).send(error);
    }
}
const getData = async (req , res) => {
    try {
        const user = await User.findById(req.params.id)  //get data by id
        if (!user) {
            return res.status(404).json({ message: 'No data found' });
        }
        return res.status(200).json(user);
    } catch (error) {
       return  res.status(500).send(error)
    }
}

const createData = async (req , res) => {
    try {
        const {name  , summary} = req.body   // create data 

        let imageUrl
        if(req.file){
            imageUrl = req.file.path 
        }
        const data = await User.create({
            name : name ,
            imageUrl :  imageUrl ,
            summary : summary

        })
        return res.status(200).json( data )

    } catch (error) {
        res.status(500).send(error)
        }
}

const updateData = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new Error("User not found");
        }

        const { name, summary } = req.body;

        // Check if a new image file is uploaded
        let imageUrl = user.imageUrl; 
        if (req.file) {
            console.log(req.file);
            imageUrl = req.file.path; // Update with new image path

            if (user.imageUrl) {
                try {
                    fs.unlinkSync(user.imageUrl); // Delete old image
                } catch (error) {
                    console.log(`Failed to delete old image: ${error.message}`);
                }
            }
        }

        // Update user fields
        user.name = name;
        user.summary = summary;
        user.imageUrl = imageUrl;

        await user.save();

        return res.status(200).json(user);
    } catch (error) {
        res.status(500).send('Error updating user');
    }
};


const deleteData = async (req , res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
          throw new Error("User does not exists");
        }
        await User.findByIdAndDelete(req.params.id); // find and delete
        return res.status(200).json({ msg: "Successfully deleted!" });
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {getData , createData , deleteData ,updateData , getAll }