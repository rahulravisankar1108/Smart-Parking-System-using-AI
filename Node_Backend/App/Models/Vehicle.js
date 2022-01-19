const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
    parkingSlotNumber : {
        type:Number,
        required:true,
    },
    vehicleNumber : {
        type:String,
        default:"",
    },
    inTime : {
        type:Date,
        default:"",
    },
    outTime : {
        type:Date,
        default:"",
    },
    totalPayable : {
        type:Number,
        default:0.0,
    },
    isBooked : {
        type:Boolean,
        default:false,
    }
},{timestamps:true})

const Vehicle = mongoose.model('Vehicle', VehicleSchema);
module.exports = Vehicle;