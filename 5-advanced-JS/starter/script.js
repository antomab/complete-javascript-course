// FUNCTION CONSTRUCTOR

var Person = function (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};

/* this is inheritance.
* this way it's more efficient, otherwise each object would have a copy of every function.
* "this" refers to the particular object INSTANCE
* */
Person.prototype.calculateAge = function () {
    console.log(2019 - this.yearOfBirth);
};

// properties on the prototype is not so common, but possible
Person.prototype.lastName = 'Smith';

var john = new Person('John', 1990, 'teacher');
var jane = new Person('Jane', 1969, 'designer');

john.calculateAge(); // 29
jane.calculateAge(); // 50

console.log(john.lastName); // Smith
console.log(jane.lastName); // Smith


// OBJECT CREATE
var personProto = {
    calculateAge: function () {
        console.log(2019 - this.yearOfBirth);
    }
};

var mark = Object.create(personProto);
mark.name = 'mark';
mark.yearOfBirth = 1980;
mark.job = 'baker';

var mary = Object.create(personProto, {
    name: { value: 'Mary' },
    yearOfBirth: { value: 1979 },
    job: { value: 'manager' }
});

// PASSING FUNCTIONS AS ARGUMENTS

var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
    var arrRes = [];
    for (var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }

    return arrRes;
};

// callback functions
function calculateAge(el) {
    return 2019 - el;
};
function isFullAge(el) {
    return el >= 18;
};
function maxHeartRate(el) {
    if (el >= 18 && el <= 81) {
        return Math.round(206.9 - (0.67 * el));
    } else {
        return -1;
    }
};

var ages = arrayCalc(years, calculateAge);
var fullAges = arrayCalc(ages, isFullAge);
var rates = arrayCalc(ages, maxHeartRate);

console.log(ages);
console.log(fullAges);
console.log(rates);

////////////////
// closures challenge

function interviewQuestion(job){
    return function (name) {
        var question = 'Hello ' + name + ', what do you do?';

        if (job === 'designer') {
            question = name + ', can you please explain what UX design is?';
        } else if (job === 'teacher') {
            question = 'What subject do you teach, ' + name + '?';
        }

        console.log(question);
    };
};

interviewQuestion('teacher')('Mark');

////////////////

function createBase(base) {
    return function (add) {
        console.log(base + add);
    }
}
var addSix = createBase(6);
addSix(10);
addSix(21);

function counter() {
    var _counter = 0;

    return {
        add: function (increment) { _counter += increment; },
        retrieve: function () { return 'counter: ' + _counter; }
    }
};

var c = counter();
c.add(5);
c.retrieve();

////////
/*
document.querySelector('.item').addEventListener('click', function (event) {

});

document.getElementById('todo-app').addEventListener('click', function (e) {
    if (e.target && e.target.nodeName == 'LI') {
        let item = e.target;
    }
});
*/
var nums = [12,33, 45, 21];
for (var i=0; i < nums.length; i++){
    setTimeout(function (index) {
        console.log('index of ' + nums[index] + ' is: ' + index);
    }(i), 3000);
}