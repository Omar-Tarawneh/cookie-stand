'use strict';
// ===========
// Global Variables
// ===========
var hour = ['6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', 'Daily Location Total'
];
var twoDimensionalArray = [];
var cities = [];


// Constructor Shop for each city passed
function Shop(shopName, minCustomer, maxCustomer, avgCustomer) {
    this.name = shopName;
    this.min = minCustomer;
    this.max = maxCustomer;
    this.avg = avgCustomer;
    this.customerPerHour = randomNumCustomerPerHour(this.min, this.max);
    this.cookiePerHour = numberOfCookiePerHour(this.customerPerHour, this.avg);
    this.total = totalNumberOfCookies(this.cookiePerHour);
    cities.push(this);
    twoDimensionalArray.push(this.cookiePerHour);
}
// Creating the objects
var seattle = new Shop('Seattle', 22, 65, 6.3);
var tokyo = new Shop('Tokyo', 3, 24, 1.2);
var dubai = new Shop('Dubai', 11, 38, 3.7);
var paris = new Shop('Paris', 20, 38, 2.3);
var lima = new Shop('Lima', 2, 16, 4.6);


// =========================
// prototype for the objects
// =========================
Shop.prototype.renderBody = function () {
    var table = document.getElementsByTagName('table')[0];
    var tableRow = document.createElement('tr');
    table.appendChild(tableRow);
    var tableData = document.createElement('td');
    tableData.textContent = this.name;
    tableRow.appendChild(tableData);
    for (let j = 0; j < this.cookiePerHour.length; j++) {
        var tableData = document.createElement('td');
        tableData.textContent = this.cookiePerHour[j];
        tableRow.appendChild(tableData);
    }
    var tableData = document.createElement('td');
    tableData.textContent = this.total;
    tableRow.appendChild(tableData);

}
// ==============
// Event Listener
// ==============

var dataForm = document.getElementById('data-input');

dataForm.addEventListener('submit', function (event) {
    var name = event.target.name.value;
    var min = event.target.min.value;
    var max = event.target.max.value;
    var avg = event.target.avg.value;
    var newCity = new Shop(name, parseInt(min), parseInt(max), parseFloat(avg));
    event.preventDefault();
    var table = document.getElementsByTagName('table')[0];
    table.remove();
    renderHeader();
    for (let index = 0; index < cities.length; index++) {
        cities[index].renderBody();
    }
    renderFooter();

});

// =============
// functions
// =============

// Generate the header of the table
function renderHeader() {
    var parent = document.getElementById('sales-list');
    var table = document.createElement('table')
    parent.appendChild(table);
    var tableRow = document.createElement('tr')
    table.appendChild(tableRow);
    var tableHead = document.createElement('th');
    tableHead.textContent = '    ';
    tableRow.appendChild(tableHead);
    for (let index = 0; index < hour.length; index++) {
        var tableHead = document.createElement('th');
        tableHead.textContent = hour[index];
        tableRow.appendChild(tableHead);
    }
}
// Generate the footer for the table
function renderFooter() {
    var table = document.getElementsByTagName('table')[0];
    var tableRow = document.createElement('tr');
    table.appendChild(tableRow);
    var tableData = document.createElement('td');
    tableData.textContent = 'total';
    tableRow.appendChild(tableData);
    var totalCookies = totalCookiesPerHour(twoDimensionalArray);
    for (let index = 0; index < totalCookies.length; index++) {
        var tableData = document.createElement('td');
        tableData.textContent = totalCookies[index];
        tableRow.appendChild(tableData);
    }

}

// Generate an array of random number of customer per hour
function randomNumCustomerPerHour(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    var customerArray = []
    for (let index = 0; index < hour.length - 1; index++) {
        customerArray.push(Math.floor(Math.random() * (max - min + 1) + min));
    }
    return customerArray;
}
// Generate an array of number of cookies per hour
function numberOfCookiePerHour(customerPerHour, avg) {
    var cookieArray = [];
    for (let index = 0; index < customerPerHour.length; index++) {
        cookieArray.push(Math.floor(customerPerHour[index] * avg));
    }
    return cookieArray;
}
// Generate the number of cookies for each objects
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

// =================================
// calling the function to render the page
// =================================
renderHeader();
for (let index = 0; index < cities.length; index++) {
    cities[index].renderBody();
}
renderFooter();
