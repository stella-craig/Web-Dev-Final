/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
/*
use('mongodbVSCodePlaygroundDB');



// TODO: update quanitites
// Insert a few documents into the sales collection.
db.getCollection('inventory').insertMany([
  { 'item': 'I Survived CS-1050 shirt',             'price': 20,    'quantity': 2,  'tag': 'shirt'},
  { 'item': 'CS-themed family windshield sticker',  'price': 15,    'quantity': 1,  'tag': 'misc' },
  { 'item': 'Drywall Installer Shirt 1',            'price': 36,    'quantity': 10, 'tag': 'shirt' },
  { 'item': 'Drywall Installer Shirt 2',            'price': 7,     'quantity': 20, 'tag': 'shirt' },
  { 'item': 'Drywall Installer Shirt 3',            'price': 17,    'quantity': 10, 'tag': 'shirt' },
  { 'item': 'Drywall Installer Shirt 4',            'price': 22,    'quantity': 5,  'tag': 'shirt' },
  { 'item': 'Drywall Installer Shirt 5',            'price': 25,    'quantity': 10, 'tag': 'shirt' },
  { 'item': 'JimR\'s Cat',                          'price': 120,   'quantity': 1,  'tag': 'misc' },
  { 'item': 'Peanut M&M Shirt',                     'price': 50,    'quantity': 5,  'tag': 'shirt' },
  { 'item': 'Portal to Hell',                       'price': 666,   'quantity': 5,  'tag': 'misc' },
  { 'item': 'Scott',                                'price': 1,     'quantity': 1,  'tag': 'misc' },
  { 'item': 'A spirit with unfinished business. It is your duty to help them.', 
                                                    'price': 2,     'quantity': 1,  'tag': 'misc' },
  { 'item': 'Spare Kidney',                         'price': 9999,  'quantity': 5,  'tag': 'misc' },
  { 'item': 'Eyeballs',                             'price': 25,    'quantity': 5,  'tag': 'misc' },
]);

console.log(db.inventory.find())
*/


// // Run a find command to view items sold on April 4th, 2014.
// const salesOnApril4th = db.getCollection('sales').find({
//   date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') }
// }).count();

// // Print a message to the output window.
// console.log(`${salesOnApril4th} sales occurred in 2014.`);

// // Here we run an aggregation and open a cursor to the results.
// // Use '.toArray()' to exhaust the cursor to return the whole result set.
// // You can use '.hasNext()/.next()' to iterate through the cursor page by page.
// db.getCollection('sales').aggregate([
//   // Find all of the sales that occurred in 2014.
//   { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
//   // Group the total sales for each product.
//   { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: [ '$price', '$quantity' ] } } } }
// ]);
