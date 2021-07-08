const UserSchema = require('../models/UserSchema');
const bcrypt = require('bcrypt');

const registerUser = async (req, respo) => {
    //Check email
    UserSchema.findOne({email: req.body.email}, (error, result) => {
        if (error) {
            respo.status(500).json({message: error});
        } else {
            if (result != null) {
                respo.status(400).json({message: 'Email address already exists !'});
            } else {

                //Check username
                UserSchema.findOne({username: req.body.username}, (error, result) => {
                    if (error) {
                        respo.status(500).json({message: error});
                    } else {
                        if (result != null) {
                            respo.status(400).json({message: 'Use another Username. This one already exists !'});
                        } else {

                            //encrypt password
                            bcrypt.genSalt(10, function (err, salt) {
                                bcrypt.hash(req.body.password, salt, function (error, hash) {

                                    //Save user
                                    const user = new UserSchema({
                                        username: req.body.username,
                                        email: req.body.email,
                                        //password:  req.body.password,
                                        password: hash,
                                    });

                                    user.save().then(savedResponse => {

                                        //Send e-mail

                                        respo.status(200).json({message: 'success', state: true, data: user});
                                    }).catch(savedResponseError => {
                                        respo.status(500).json({
                                            message: 'internal server error',
                                            state: false,
                                            error: savedResponseError
                                        })
                                    })

                                })
                            })

                        }
                    }
                })
            }
        }
    })
};

const loginUser = (req, respo) => {
    const username = req.body.username;
    const password = req.body.password;

    console.log("Controller > LOGIN - " + username + ' - ' + password);

    try {
        UserSchema.findOne({username: username}, (error, result) => {
            if (result != null) {
                bcrypt.compare(password, result.password, function (err, finalOutput) {
                    if (error) {
                        respo.status(500).json(err);
                    } else {
                        if (finalOutput) {
                            respo.status(200).json({message: 'registered user', data: result});
                        } else {
                            respo.status(400).json({message: 'Incorrect Password'});
                        }
                    }
                });
            } else {
                respo.status(400).json({message: 'Invalid username or not registered yet !'});
            }
        })
    } catch (e) {
        respo.status(500).json({message: 'Internal Server Error', error: e});
    }
}

module.exports = {
    registerUser,
    loginUser,
}