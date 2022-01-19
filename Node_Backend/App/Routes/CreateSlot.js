const express = require('express');

const createSlotService = require("../Services/CreateSlot/CreateSlot");

const router = express.Router();

router.post("/create-slot", createSlotService.createSlot);
router.get("/check-slot", createSlotService.availableSlot);

module.exports=router;