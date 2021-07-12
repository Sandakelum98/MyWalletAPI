const express = require('express');
const incomeController = require('../controllers/IncomeController');

const router = express.Router();
module.exports = router;
router.post('/addIncome', incomeController.addIncome);
router.post('/getAllIncomes', incomeController.getAllIncomes);