'use strict';
var hour = ['6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM'];


//Generate a Random Number between max and min inclusive
function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
// Generate random number of customer according to min and max
function CookiesEachHour(min, max, avg) {
    var customerNumArray = [];
    for (let index = 0; index < hour.length; index++) {
        customerNumArray.push(Math.floor(getRandomNum(min, max) * avg));

    }
    return customerNumArray;
}


// generate object for each city 
function cityShopObjects(minCus, maxCus, avgCookies, cityName) {
    var shop = {
        name: cityName,
        min: minCus,
        max: maxCus,
        avgSale: avgCookies,
        sales: CookiesEachHour(minCus, maxCus, avgCookies)
    };
    return shop;
}

// city shops
var seattle = cityShopObjects(22, 65, 6.3, 'Seattle');
var tokyo = cityShopObjects(3, 24, 1.2, 'Tokyo');
var dubai = cityShopObjects(11, 38, 3.7, 'Dubai');
var paris = cityShopObjects(20, 38, 2.3, 'Paris');
var lima = cityShopObjects(2, 16, 4.6, 'Lima');

// array of cities so I can loob through
var cities = [seattle, tokyo, dubai, paris, lima];

// DOM
// Select the tag I want to modifiy
var parent = document.getElementById('sales-list');
// make an ul
var list = document.createElement('ul');
parent.appendChild(list);


// Generate list item for each shop passed 
function listItemGenerator(shop) {
    for (let index = 0; index < shop.sales.length; index++) {
        var listItem = document.createElement('li');
        listItem.textContent = hour[index] + ': ' + shop.sales[index] + ' Cookies';
        list.appendChild(listItem);
    }
}



// loob through each citiy and add h2 tag for each one of them
for (let index = 0; index < cities.length; index++) {
    var h2 = document.createElement('h2')
    h2.textContent = cities[index].name
    list.appendChild(h2)
    listItemGenerator(cities[index]);
}
