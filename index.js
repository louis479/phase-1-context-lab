/* Your Code Here */

function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord);
}

function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return this;
}

function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return this;
}

function hoursWorkedOnDate(targetDate) {
    const timeIn = this.timeInEvents.find(event => event.date === targetDate);
    const timeOut = this.timeOutEvents.find(event => event.date === targetDate);
    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(targetDate) {
    const hoursWorked = hoursWorkedOnDate.call(this, targetDate);
    return hoursWorked * this.payPerHour;
}

// This function is provided to you
const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date;
    });

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this), 0); // <== bind() is used to ensure the correct `this` context

    return payable;
};

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName);
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employee) => total + allWagesFor.call(employee), 0);
}
