var moment=require('moment');

// new Date().getTime();
// // 1000
//
//
// var date=new Date();
// var month=['Jan','Feb'];

// console.log(date.getMonth());
// console.log("month",month);

// var date=moment();
//
// date.add(1,'years').subtract(9,'months');
// console.log(date.format('MMM Do, YYYY'));
new Date().getTime();
var someTimestamp=moment().valueOf();


var createdAt=1234;

var date=moment(someTimestamp);
console.log(date.format('h:mm a'));
