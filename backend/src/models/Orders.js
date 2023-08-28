const mongoose = require ("mongoose");

const OrderSchema = new mongoose.Schema({
    email : {
        type : String, 
        required : true,
        unique : true
    },
    order_data: {
        type: Array,
        required:true
    },
});

const OrderModel  = new mongoose.model("order", OrderSchema);

module.exports = OrderModel ;