var massMark = 78; // kg
var heightMark = 1.69; // meters

var massJohn = 92;
var heightJohn = 1.95;

var bmiMark = massMark / (heightMark * heightMark);
var bmiJohn = massJohn / (heightJohn * heightJohn);

var markHigherBmi = bmiMark > bmiJohn;

console.log('Is Marks BMI higher than Johns? ' + markHigherBmi);

var johnTipCalc = {
    bills: [124, 48, 268, 180, 42],
    calcTip: function () {
        this.tips = [];
        this.finalAmounts = [];

        var bill = 0,
            tip = 0,
            percentage = 0;
        for (var i=0; i < this.bills.length;  i++) {
            bill = this.bills[i];

            if (bill < 50) {
                percentage = 0.2;
            }
            else if (bill >= 50 && bill < 200) {
                percentage = 0.15;
            }
            else if (bill >= 200) {
                percentage = 0.1;
            }

            tip = bill * percentage;
            this.tips.push(tip);
            this.finalAmounts.push(bill + tip);
        }
    }
};
var markTipCalc = {
    bills: [77, 375, 110, 45],
    calcTip: function () {
        this.tips = [];
        this.finalAmounts = [];

        var bill = 0,
            tip = 0,
            percentage = 0;
        for (var i=0; i < this.bills.length;  i++) {
            bill = this.bills[i];

            if (bill < 100) {
                percentage = 0.2;
            }
            else if (bill >= 100 && bill <= 300) {
                percentage = 0.1;
            }
            else if (bill > 300) {
                percentage = 0.25;
            }

            tip = bill * percentage;
            this.tips.push(tip);
            this.finalAmounts.push(bill + tip);
        }
    },

};


function averageTip(tips) {
    var totaltips = 0;
    tips.forEach(function (tip, index) {
       totaltips += tip;
    });

    return totaltips/tips.length;
}


johnTipCalc.calcTip();
markTipCalc.calcTip();

var averageTipJohn = averageTip(johnTipCalc.tips);
var averageTipMark = averageTip(markTipCalc.tips);

console.log(averageTipMark);
console.log(averageTipJohn);
console.log(averageTipJohn > averageTipMark ? 'John\'s family paid more tips.' : 'Mark\'s family paid more tips.')
