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

//GET ALL INCOMES
const getAllIncomes = async (req, resp) => {
    let month = req.body.month;

    IncomeSchema.find({userId:req.body.userId, incomeDate: {$regex: month + "" }}, function (error, result) {
        console.log(result);
        if (error) {
            resp.status(500).json({message: error});
        } else {
            if (!result.length) {
                resp.status(200).json({message: 'can not find'});
                console.log(result);
            } else {
                resp.status(200).json({message: 'done', data: result});
                console.log(result);
            }
        }
    })
}

module.exports = {
    addIncome,
    getAllIncomes,
}