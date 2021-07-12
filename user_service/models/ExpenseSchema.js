const mongoose = require('mongoose');
const expenseSchema = new mongoose.Schema({
    expenseDate:{
        type: String,
        required: true
    },
    expenseType:{
        type: String,
        required: true
    },
    expenseAmount:{
        type: Number,
        required: true
    },
    userId:{
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Expense', expenseSchema);