const express = require('express');

const vehicleSlotService = require("../Services/Vehicle/Vehicle");

const router = express.Router();

router.get("/book", vehicleSlotService.storeBooking);
router.get("/unbook", vehicleSlotService.clearBooking);
module.exports=router;