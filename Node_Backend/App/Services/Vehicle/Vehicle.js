const Vehicle = require("../../Models/Vehicle");
const request = require('request');

const storeBooking = (async (req,res) => {
    try {
        request('http://localhost:5000/flask/api/v1/detect-images',async (error, flaskResponse, body) => {
                let vehicleNumber = body;

                const currentSlot = await Vehicle.findOne({ isBooked: false });
                if(currentSlot) {
                    currentSlot.vehicleNumber = vehicleNumber;
                    currentSlot.inTime = Date.now();
                    currentSlot.isBooked = true;
                    await currentSlot.save();
                    return res.status(200).json({
                        message: "Slot booked!",
                        data: currentSlot,
                        response:true,
                    });
                }
                else {
                    return res.status(200).json({
                        data: "All slots Booked!!\nPlease wait for some slots to clear..",
                        response:false,
                    });
                }
                
            });
        
    } catch (error) {
        return res.status(400).json({
            message:error,
        })
    } 
})

const clearBooking = (async (req,res) => {
        try {
            let vehicleNum = "";
            request('http://localhost:5000/flask/api/v1/detect-images',async (error,flaskResponse, body) => {
                vehicleNum = body;

                const currentSlot = await Vehicle.findOne({vehicleNumber:vehicleNum});
                const outTimings = Date.now();
                currentSlot.outTime = outTimings;
                await currentSlot.save();
                const totalAmount = (Math.floor((currentSlot.outTime-currentSlot.inTime)/60000)*0.5);
                currentSlot.totalPayable = totalAmount;
                const currentSlot1 = currentSlot;
                // currentSlot.vehicleNumber=null;
                // currentSlot.inTime=null;
                currentSlot.isBooked=false;
                // currentSlot.outTime=null;
                currentSlot.save();

                res.status(200).json({
                    data : currentSlot1,
                    response : true,
                })
            });
            

        } catch (error) {
            res.status(400).json({
                message : error,
            })
        }
})

module.exports = {storeBooking, clearBooking};