const UserSchema = require('../models/UserSchema');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

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

                                        //Send response to frontend
                                        //respo.status(200).json({message: 'success', state: true, data: user});


                                        //Send e-mail
                                        let transporter = nodemailer.createTransport({
                                            host: 'smtp.gmail.com',
                                            port: 587,
                                            secure: false,
                                            requireTLS: true,
                                            auth: {
                                                user: process.env.EMAIL,
                                                pass: process.env.PASSWORD
                                            },
                                            tls: {
                                                rejectUnauthorized: false
                                            },
                                        });

                                        let mailOption = {
                                            from: '"My Wallet 💼"<noreply.prosess.env.EMAIL>',
                                            to: req.body.email,
                                            subject: 'My Wallet Registration',
                                            html: `
                                                <html>
                                                    <body>
                                                    
                                                        <p style="color: red">
                                                            Your registration successful.
                                                        </p>
                                                    </body>
                                                </html>`
                                        }


                                        transporter.sendMail(mailOption, (emailError, emailInfo) => {
                                            if (emailError) {
                                                console.log("emailError :   ",emailError);
                                                respo.status(500).json({
                                                    message: 'internal Server Error 1',
                                                    state: false,
                                                    error: emailError
                                                });
                                                return;
                                            }
                                            //Send response to frontend
                                            respo.status(200).json({message: 'success', state: true, data: user});

                                        });


                                    }).catch(savedResponseError => {
                                        respo.status(500).json({
                                            message: 'internal server error 2',
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

    // console.log("Controller > LOGIN - " + username + ' - ' + password);

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

const resetPassword = (req, resp) => {
    //Find user by email
    UserSchema.findOne({email: req.body.email}, (error, result) => {
        if (error) {
            resp.status(500).json({message: error});
        } else {
            if (result == null) {
                resp.status(400).json({message: 'Wrong E-mail'});
            } else {

                // //New password
                let newPassword = result.username;
                console.log('NEW PASSWORD : '+newPassword);
                // let newPassword= "reset"

                //encrypt password
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newPassword, salt, function (error, hash) {

                        //Update user
                        const user = new UserSchema({
                            _id: result._id,
                            username: result.username,
                            email: req.body.email,
                            password: hash,
                        });
                        console.log("USER : "+ user);
                        UserSchema.updateOne({email: req.body.email}, user).then(savedResponse => {
                            console.log("User details updated !");

                            //Send e-mail
                            let transporter = nodemailer.createTransport({
                                host: 'smtp.gmail.com',
                                port: 587,
                                secure: false,
                                requireTLS: true,
                                auth: {
                                    user: process.env.EMAIL,
                                    pass: process.env.PASSWORD
                                },
                                tls: {
                                    rejectUnauthorized: false
                                },
                            });

                            let mailOption = {
                                from: '"My Wallet 💼"<noreply.prosess.env.EMAIL>',
                                to: req.body.email,
                                subject: 'My Wallet password reset',
                                html: `
                                                <html>
                                                    <body>
                                                    
                                                        <p style="color: red">
                                                            Reset your password. <br>
                                                            New password : `+newPassword+ `   
                                                        </p>
                                                    </body>
                                                </html>`
                            }


                            transporter.sendMail(mailOption, (emailError, emailInfo) => {
                                if (emailError) {
                                    console.log("emailError :   ",emailError);
                                    resp.status(500).json({
                                        message: 'internal Server Error 1',
                                        state: false,
                                        error: emailError
                                    });
                                    return;
                                }
                                //Send response to frontend
                                resp.status(200).json({message: 'success', state: true, data: user});

                            });


                        }).catch(savedResponseError => {
                            resp.status(500).json({
                                message: 'internal server error 2',
                                state: false,
                                error: savedResponseError
                            })
                        })

                    });

                });
            }
        }
    });
}

module.exports = {
    registerUser,
    loginUser,
    resetPassword,
}