const userServices = require('../services/user.services')
//exports register for the user 
exports.register = (request, res) => {
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
            console.log('response', response)
        }
        else {
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
/**
 * @desc Gets the input from front end filters and performs validation
 * @param request request contains all the requested data
 * @param response sends the data or err
 * @return responses with a http response
 */
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