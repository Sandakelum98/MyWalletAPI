const IncomeSchema = require('../models/IncomeSchema');

const addIncome = (req, resp) => {

    const income = new IncomeSchema({
        incomeDate: req.body.incomeDate,
        incomeType: req.body.incomeType,
        incomeAmount: req.body.incomeAmount,
        userId: req.body.userId,
    });

    console.log('controller income : '+income);

    income.save().then(saved => {
        resp.status(200).json({message: 'success', status: true, data: income});
    }).catch(savedError => {
        resp.status(500).json({message:'Income not added', status:false, error:savedError});
    })
};

module.exports = {
    addIncome,
}