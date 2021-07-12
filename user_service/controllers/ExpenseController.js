const ExpenseSchema = require('../models/ExpenseSchema');

const addExpense = (req, resp) => {

    const expense = new ExpenseSchema({
        expenseDate: req.body.expenseDate,
        expenseType: req.body.expenseType,
        expenseAmount: req.body.expenseAmount,
        userId: req.body.userId,
    });

    console.log('controller Expense : '+expense);

    expense.save().then(saved => {
        resp.status(200).json({message: 'success', status: true, data: expense});
    }).catch(savedError => {
        resp.status(500).json({message:'Expense not added', status:false, error:savedError});
    })
};

//GET ALL EXPENSES
const getAllExpenses = (req, resp) => {
    let month = req.body.month;

    ExpenseSchema.find({userId: req.body.userId, expenseDate: {$regex: month + ""}}, function (error, result) {
        if (error) {
            resp.status(500).json({message: error});
        } else {
            if (!result.length) {
                resp.status(200).json({message: 'can not find'});
            } else {
                resp.status(200).json({message: 'done', data: result});
            }
        }
    });
}

module.exports = {
    addExpense,
    getAllExpenses,
}