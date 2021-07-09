const mongoose = require('mongoose');
const incomeSchema = new mongoose.Schema({
    incomeDate:{
        type: String,
        required: true
    },
    incomeType:{
        type: String,
        required: true
    },
    incomeAmount:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Income', incomeSchema);