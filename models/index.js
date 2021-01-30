const { authSchema, ticketSchema } = require('../schemas');
const { hashPassword, verifyPassword, validateEmail, messageHandler, tokenHandler, Numeric } = require('../utils')
const mongoose = require('mongoose');

//Create Account Model
module.exports.RegisterModel = async (data, responsecallback) => {
    const { email, password, userType } = data;
    var newuser = { email, password: await hashPassword(password), userType: parseInt(userType) }

    if (validateEmail(email)) {
        authSchema.findOne({ email }).exec((err, user) => {
            if (err) {
                return responsecallback(messageHandler("Something went wrong...", true, {}))
            } else {
                if (user) {
                    const userData = tokenHandler(user)
                    return responsecallback(messageHandler("Login Successfully", true, userData))
                } else {

                    const newauthSchema = new authSchema(newuser);
                    newauthSchema.save((error, user) => {
                        if (error) {
                            return responsecallback(messageHandler("Something went wrong...", false, error))
                        } else {
                            const userData = tokenHandler(user)
                            return responsecallback(messageHandler("Registration Successfully", true, userData))
                        }
                    })
                }
            }
        })
    } else {
        return responsecallback(messageHandler("Invalid email entered!, Please Try Again", false, {}))
    }
}

//Login Model
module.exports.LoginModel = (data, responsecallback) => {
    const { email, password } = data;
    if (validateEmail(email)) {
        authSchema.findOne({ email }).exec(async (err, user) => {
            if (err) {
                return responsecallback(messageHandler("Something went wrong...", true, {}))
            } else if (user === null) {
                return responsecallback(messageHandler("No account with the details found, Please Try Again", false, {}))
            } else {
                if (await verifyPassword(password, user.password)) {
                    const userData = tokenHandler(user)
                    return responsecallback(messageHandler("User Successfully Login", true, userData))
                } else {
                    return responsecallback(messageHandler("Password entered was wrong!, Please Try Again", false, {}))
                }
            } 
        })
    } else {
        return responsecallback(messageHandler("Invalid email entered!, Please Try Again", false, {}))
    }
}; 

//Create Ticket Model
module.exports.CreateTicketModel = (data, responsecallback) => {
    const newticketSchema = new ticketSchema({...data, ticketId: Numeric(6)});
    newticketSchema.save((error, data) => {
        if (error) {
            return responsecallback(messageHandler("Something went wrong...", false, error))
        } else {
            return responsecallback(messageHandler("Ticket Successfully Open", true, data))
        }
    })
}; 

//Get Ticket Model
module.exports.getTicketModel = (responsecallback) => {
    ticketSchema.find().then((data) => {
        if (data) {
            return responsecallback(messageHandler("Ticket Successfully Fetch", true, data))
        } else {
            return responsecallback(messageHandler("No ticket found", true, {}))
        }
    }).catch((error) => {
        return responsecallback(messageHandler("Something went wrong...", false, error))
    })
}; 

//Get Single Tickets Model
module.exports.getSingleTicketModel = (data, responsecallback) => {
    const { ticketId } = data
    ticketSchema.findOne({ ticketId: parseInt(ticketId) }).then((data) => {
        if (data) {
            return responsecallback(messageHandler("Ticket Successfully Fetch", true, data))
        } else {
            return responsecallback(messageHandler("No ticket found", true, {}))
        }
    }).catch((error) => {
        return responsecallback(messageHandler("Something went wrong...", false, error))
    })
}; 

//Delete Ticket Model
module.exports.DeleteTicketModel = (data, responsecallback) => {
    const { id } = data;
    var _id = mongoose.Types.ObjectId(id);
    ticketSchema.findOne({ _id }).exec((err, ticket) => {
        
        if (err) {
            return responsecallback(messageHandler("Something went wrong...", true, err))
        } else if (ticket === null) {
            return responsecallback(messageHandler("No ticket with the details found, Please Try Again", false, {}))
        } else {
            ticketSchema.deleteOne({ _id }).then((data) => {
                if (data) {
                    return responsecallback(messageHandler("Ticket Successfully Deleted", true, data))
                } else {
                    return responsecallback(messageHandler("Error in getting ticket", true, {}))
                }
            }).catch((error) => {
                return responsecallback(messageHandler("Something went wrong...", false, error))
            })
        }
    })
}; 

//Change Ticket Model
module.exports.ChangeTicketStatusModel = (data, responsecallback) => {
    const { id, status } = data;
    var _id = mongoose.Types.ObjectId(id);
    
    ticketSchema.findOne({ _id }).exec((err, ticket) => {
        if (err) {
            return responsecallback(messageHandler("Something went wrong...", true, err))
        } else if (ticket === null) {
            return responsecallback(messageHandler("No ticket with the details found, Please Try Again", false, {}))
        } else {
            ticketSchema.updateOne(
                { _id: id },
            { $set: { status: status } },
            (error, success) => {
                if (error) {
                    return responsecallback(messageHandler("Something went wrong...", false, error))
                } else {
                    return responsecallback(messageHandler("Ticket Status Successfully Changed", true, {}))
                }
            });
        }
    })
}; 
