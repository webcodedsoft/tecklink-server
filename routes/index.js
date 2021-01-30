const express = require('express');
const { Register, Login, CreateTicket, getTicket, getSingleTicket, DeleteTicket, ChangeTicketStatus } = require('../controllers');
const router = express.Router();


router.post("/auth/register", Register);
router.post("/auth/login", Login);
router.post("/ticket/create-ticket", CreateTicket);
router.get("/ticket/get-ticket/", getTicket);
router.get("/ticket/get-single-ticket/:ticketId", getSingleTicket);
router.delete("/ticket/delete-ticket/:id", DeleteTicket);
router.put("/ticket/change-status", ChangeTicketStatus);


module.exports = router;