const express = require('express');
const expenseController = require('../controllers/ExpenseController');

const router = express.Router();
module.exports = router;
router.post('/addExpense', expenseController.addExpense);
router.post('/getAllExpenses', expenseController.getAllExpenses);