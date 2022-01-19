const Vehicle = require("../../Models/Vehicle");

const createSlot = ((req, res) => {
    const newSlot = new Vehicle({
        parkingSlotNumber : req.body.parkingSlotNumber    
    });
    newSlot.save()
        .then(() => {
            res.status(200).json({
                message :"Slot created successfully!",
            })
        })
        .catch(err => {
            res.status(400).json({
                message : err,
            })
        })
});

const availableSlot = (async (req, res) => {
    const slotCount = await Vehicle.count({isBooked:false});
    return res.status(200).json({
        data : slotCount,
    });
});

module.exports={
    createSlot, availableSlot,
};