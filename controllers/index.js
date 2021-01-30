const { RegisterModel, LoginModel, CreateTicketModel, getTicketModel, getSingleTicketModel, DeleteTicketModel, ChangeTicketStatusModel } = require('../models');
const { tokenVerifier } = require('../utils');


//Create Account
const Register = (req, res) => {
    return RegisterModel(req.body, (result) => {
        if (result.status) {
            return res.json({ result });
        } else {
            return res.status(203).json({ result });
        }
    });
}

//Login into Account
const Login = (req, res) => {
    return LoginModel(req.body, (result) => {
        if (result.status) {
            return res.json({ result });
        } else {
            return res.status(200).json({ result });
        }
    });
}

//CreateTicket
const CreateTicket = (req, res) => {
    if (req.get('Authorization') !== undefined) {
        const token = req.get('Authorization').replace("Bearer ", '');
        if (tokenVerifier(token)) {
            return CreateTicketModel(req.body, (result) => {
                if (result.status) {
                    return res.json({ result });
                } else {
                    return res.status(200).json({ result });
                }
            });
        } else {
            return res.status(200).json({ result: "Unauthorized, Access Denied", status: 401 });
        }
    } else {
        return res.status(200).json({ result: "Unauthorized, Access Denied", status: 401 });
    }
}

//get Tickets
const getTicket = (req, res) => {
    return getTicketModel((result) => {
        if (result.status) {
            return res.json({ result });
        } else {
            return res.status(203).json({ result });
        }
    });
}

//get Single Ticket
const getSingleTicket = (req, res) => {
    return getSingleTicketModel(req.params, (result) => {
        if (result.status) {
            return res.json({ result });
        } else {
            return res.status(203).json({ result });
        }
    });
}

//DeleteTicket
const DeleteTicket = (req, res) => {
    return DeleteTicketModel(req.params, (result) => {
        if (result.status) {
            return res.json({ result });
        } else {
            return res.status(203).json({ result });
        }
    });
}

//DeleteTicket
const ChangeTicketStatus = (req, res) => {
    return ChangeTicketStatusModel(req.body, (result) => {
        if (result.status) {
            return res.json({ result });
        } else {
            return res.status(203).json({ result });
        }
    });
}


module.exports = { Register, Login, CreateTicket, getTicket, getSingleTicket, DeleteTicket, ChangeTicketStatus };
   


