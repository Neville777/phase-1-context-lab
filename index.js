
//createEmployeeRecord oads Array elements into corresponding Object properties.
// Additionally, initialize empty Arrays on the properties timeInEvents and timeOutEvents.
function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }

  //Converts each nested Array into an employee record using createEmployeeRecord
  // and accumulates it to a new Array
  function createEmployeeRecords(employeeArray) {
    return employeeArray.map(createEmployeeRecord);
  }
  //createTimeInEvent
  function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
        const timeInEvent = {
      type: "TimeIn",
      hour: parseInt(hour),
      date,
    };
        this.timeInEvents.push(timeInEvent);
        return this;
  }
  //createTimeOutEvent
  function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
        const timeOutEvent = {
      type: "TimeOut",
      hour: parseInt(hour),
      date,
    };
        this.timeOutEvents.push(timeOutEvent);
    return this;
  }

  //hoursWorkedOnDate
  function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find((event) => event.date === date);
    const timeOutEvent = this.timeOutEvents.find((event) => event.date === date);
    if (timeInEvent && timeOutEvent) {
      const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
      return hoursWorked;
    }
      return 0;
  }

  //wagesEarnedOnDate
  function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date); // Calculate hours worked using hoursWorkedOnDate
      const payRate = this.payPerHour;
      const wagesEarned = hoursWorked * payRate;
    return wagesEarned;
  }

  //allWagesFor
  const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

const payable = eligibleDates.reduce(function (memo, d) {
    return memo + wagesEarnedOnDate.call(this, d)
}.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

return payable
}
//findEmployeeByFirstName
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(employee) {
      return employee.firstName === firstName;
    });
  }
  //Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee 
  //in the record used as context. Amount should be returned as a number.
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce(function(totalPay, employee) {
      return totalPay + allWagesFor.call(employee);
    }, 0);
  }
