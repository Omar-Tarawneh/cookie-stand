'use strict';
var hourOfWorking = ['6 AM',
    '7 AM',
    '8 AM',
    '9 AM',
    '10 AM',
    '11 AM',
    '12 PM',
    '1 PM',
    '2 PM',
    '3 PM',
    '4 PM',
    '5 PM',
    '6 PM',
    '7 PM'
];

// Constructor Shop for each city passed
function Shop(shopName, minCustomer, maxCustomer, avgCustomer) {
    this.name = shopName;
    this.min = minCustomer;
    this.max = maxCustomer;
    this.avg = avgCustomer;
    this.customerPerHour = randomNumCustomerPerHour(this.min, this.max);
    this.cookiePerHour = numberOfCookiePerHour(this.customerPerHour, this.avg);
    this.total = totalNumberOfCookies(this.cookiePerHour);
}
var seattle = new Shop('Seattle', 22, 65, 6.3);
var tokyo = new Shop('Tokyo', 3, 24, 1.2);
var dubai = new Shop('Dubai', 11, 38, 3.7);
var paris = new Shop('Paris', 20, 38, 2.3);
var lima = new Shop('Lima', 2, 16, 4.6);
var total = new Shop('total', 0, 0, 0);

var twoDimensionalArray = [seattle.cookiePerHour, tokyo.cookiePerHour, dubai.cookiePerHour, paris.
    cookiePerHour, lima.cookiePerHour];
total.cookiePerHour = totalCookiesPerHour(twoDimensionalArray);
// creat the head of the table 
var head = ['city', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4PM', '5 PM', '6 PM', '7 PM', 'Daily Location Total'];
var parent = document.getElementById('sales-list');
var table = document.createElement('table');
parent.appendChild(table);
var tableRow = document.createElement('tr');
table.appendChild(tableRow);
for (let index = 0; index < head.length; index++) {
    var tablehead = document.createElement('th');
    tablehead.textContent = head[index];
    tableRow.appendChild(tablehead);
}

var cities = [seattle, tokyo, dubai, paris, lima, total];
Shop.prototype.render = function () {
    var tableRow = document.createElement('tr');
    table.appendChild(tableRow);
    var tableData = document.createElement('td');
    tableData.textContent = this.name;
    tableRow.appendChild(tableData);
    for (let index = 0; index < this.cookiePerHour.length; index++) {
        var tableData = document.createElement('td');
        tableData.textContent = this.cookiePerHour[index];
        tableRow.appendChild(tableData);
    }
    //adding the total
    var tableData = document.createElement('td');
    tableData.textContent = this.total;
    tableRow.appendChild(tableData);
    // adding total number of cookies of each hour
}

// render for all cities
for (let index = 0; index < cities.length; index++) {
    cities[index].render();

}


function randomNumCustomerPerHour(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    var customerArray = []
    for (let index = 0; index < hourOfWorking.length; index++) {
        customerArray.push(Math.floor(Math.random() * (max - min + 1) + min));
    }
    return customerArray;
}

function numberOfCookiePerHour(customerPerHour, avg) {
    var cookieArray = [];
    for (let index = 0; index < customerPerHour.length; index++) {
        cookieArray.push(Math.floor(customerPerHour[index] * avg));
    }
    return cookieArray;
}

function totalNumberOfCookies(cookieArray) {
    var total = 0;
    for (let index = 0; index < cookieArray.length; index++) {
        total += cookieArray[index];
    }
    return total;
}




// Nested loop to go through each columns and assign the sum of the columns to new array 
function totalCookiesPerHour(tableArray) {
    var totalCookies = [];
    var sum = 0;
    for (let column = 0; column < tableArray[0].length; column++) {
        sum = 0;
        for (let row = 0; row < tableArray.length; row++) {
            sum += tableArray[row][column];
            // console.log(tableArray[row][column]);
        }
        totalCookies.push(sum);
        // console.log('========');
    }
    sum = 0;
    // console.log(totalCookies);
    for (let index = 0; index < totalCookies.length; index++) {
        sum += totalCookies[index]
    }
    totalCookies.push(sum);
    // console.log(sum);
    // console.log(totalCookies);
    return totalCookies;
}
// console.log(totalCookiesPerHour(twoDimensionalArray));

