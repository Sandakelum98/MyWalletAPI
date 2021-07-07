const UserSchema = require('../models/UserSchema');

const registerUser = async (req, respo)=>{
    console.log(req.body.email);
    console.log( "test")
    const user = new UserSchema({
        username: req.body.username,
        email: req.body.email,
        password:  req.body.password,
    });
    user.save().then(savedResponse => {
        respo.status(200).json({message:'success', state:true})
    }).catch(savedResponseError=>{
        respo.status(500).json({message:'internal server error', state:false, error:savedResponseError})
    })
};

module.exports ={
    registerUser
}