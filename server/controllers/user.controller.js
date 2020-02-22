const userServices = require('../services/user.services');
const tokenGenerate = require('../middleware/token');
const mailler = require('../middleware/mailler');
//exports register for the user 
exports.register = (request, res) => {
    console.log("req",request.body);
    
    try {
        //request for the details 
        request.checkBody('firstName', 'firstname is invalid').notEmpty().isAlpha();
        request.checkBody('lastName', 'lastName is invalid').notEmpty().isAlpha();
        request.checkBody('email', 'email is invalid').notEmpty().isEmail();
        request.checkBody('country', 'country is invalid').notEmpty().isAlpha();
        request.checkBody('password', 'password is invalid').notEmpty().len(7, 13);

        var error = request.validationErrors()//for the validation of errors
        var response = {}
        if (error) {
            response.error = error
            response.success = false
            res.status(500).send(response)
            
            console.log('error-register', error)
            // console.log('response', response)
        }
        else {
            console.log("req",request.body);

            //register checks the request in the user services
            userServices.register(request, (err, data) => {
                if (err) {
                    response.success = false
                    response.err = err
                    res.status(500).send(response)
                } else {
                    response.success = true
                    response.data = data
                    res.status(200).send(response)
                }
            })
        }

    } catch (e) {
        console.log(e)
    }
}
//exports login
exports.login = (request, res) => {
    try {
        console.log("Loging on");
        //requests for the email and password
        request.checkBody('email', 'email is invaild').notEmpty().isEmail();
        request.checkBody('password', 'Password is inavlid').notEmpty().len(8, 13);
        var error = request.validationErrors();
        var response = {};
        if (error) {
            response.error = error;
            response.failure = false;
            res.status(500).send(response);
            console.log("Error in login", error)
        }
        else {
            userServices.login(request, (err, data) => {
                if (err) {
                    response.failure = false;
                    response.data = err;
                    res.status(404).send(response);
                }
                else {
                    response.sucess = true;
                    response.data = data;
                    res.status(200).send(response);
                }
            })
        }
    } catch (e) {
        console.log(e);
    }
}
//exports forgotpassword
exports.forgotpassword = (request, res) => {
    try {
        console.log('Forgot password')
        //request for the email,password and new password
        request.checkBody('email', 'email is invalid').notEmpty().isEmail()
        var error = request.validationErrors()
        var response = {}
        if (error) {
            response.error = error
            response.failure = false
            res.status(422).send(response);
        } else {
            userServices.forgotpassword(request, (err, data) => {
                if (err) {
                    response.failure = false
                    response.data = err
                    res.status(402).send(response)
                } else {
                    console.log('data')
                    let payLoad = data._id;
                    console.log(payLoad)
                    let obj = tokenGenerate.GenerateToken(payLoad);
                    console.log("controller pay load", obj);
                    let url = `http://localhost:4000/resetPassword`

                    console.log(`${obj.token}`)
                    // response.cookie('auth',obj.token);
                    console.log("pay load", url);
                    console.log("email", request.body.email)
                    mailler.sendMailer(url, request.body.email)
                    response.token = obj.token;
                    response.sucess = true;
                    response.data = data;

                    res.status(200).send(response);
                }
            })
        }


    } catch (e) {
        console.log(e)
    }
}
//exports reset password
exports.resetPassword = (request, res) => {
    try {
        //request for the password and confirm password
        console.log("Re-setting password");
        request.checkBody('password', 'password is invalid').notEmpty().len(7, 13);
        request.checkBody('confirmPassword', 'password is invalid').notEmpty().len(7, 13);
        var error = request.validationErrors();
        //check if password is equal to confirm password
        console.log("password : "+request.body.password);
        console.log("comfirm-password : "+request.body.confirmPassword);
        if (request.body.password != request.body.confirmPassword)
            var error = "confirmpassword is incorrect";
        var response = {};
        if (error) {
            response.error = error;
            response.status = false;
            return res.status(422).send(response);
        } else {
            userServices.resetPassword(request, (err, data) => {
                if (err) {
                    response.status = false;
                    response.error = err;
                    response.error = "database error.";
                    res.status(404).send(response);
                } else {
                    if(data.n === 1 && data.nModified === 1 && data.ok === 1){
                        response.status = true;
                        response.resetpassword = 'successfully';
                    }
                    res.status(200).send(response);
                }
                console.log(data );
            })
        }
    } catch (e) {
        console.log(e);
    }
}

exports.usersData = (request, res) => {
    try {
        //request for the password and confirm password
        console.log("Get USerData.");
        // console.log(request.body);
        let response = {};
        userServices.userData(request, (err, data) => {
            if (err) {
                response.status = false;
                response.error = err;
                response.error = "database error.";
                res.status(404).send(response);
            } else {
                response.status = true;
                response.usersdata = data;
                res.status(200).send(response);
            }
        })
    } catch (e) {
        console.log(e);
    }
}

// Save chat Controller.
exports.saveChat = (request, res) => {
    try {
        console.log("Get constroller.");
        let response = {};
        userServices.saveChat(request, (err, data) => {
            if (err) {
                console.log("Controller ERRO : "+ err);
                response.status = false;
                response.error = err;
                response.error = "database error.";
                res.status(404).send(response);
            } else {
                response.status = true;
                response.usersdata = data;
                res.status(200).send(response);
            }
        })
    } catch (e) {
        console.log(e);
    }
}

// Get chats constroller.
exports.getChat = (request, res) => {
    try {
        console.log("Get constroller.");
        let response = {};
        userServices.getChat(request, (err, data) => {
            if (err) {
                console.log("Controller ERRO : "+ err);
                response.status = false;
                response.error = err;
                response.error = "database error.";
                res.status(404).send(response);
            } else {
                response.status = true;
                response.usersdata = data;
                res.status(200).send(response);
            }
        })
    } catch (e) {
        console.log(e);
    }
}