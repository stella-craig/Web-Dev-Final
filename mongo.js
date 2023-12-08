//Separated this from the server file for debugging. 
//User information for creation
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: false
    },
    password: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = mongoose.model('User', userSchema);

//This should***** add the items to the database
const itemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    available: Number,
    tag: String

});

const Item = mongoose.model('Item', itemSchema);

const itemsToInsert = [
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
];

//Insert?????
Item.insertMany(itemsToInsert)
    .then(function(docs){
        console.log('Multiple documents inserted');
    })
    .catch(function(err){
        console.log('Error inserting documents', err);
    });



//Login
/*
router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne({ username: req.body.username});
        if(!user) {
            return res.status(400).send('Cannot find user');
        }

        if(await becrypt.compare(req.body.password, user.password)) {
            res.send('Success');
        } else{
            res.send('Invalid password');
        }
    } catch {
        res.status(500).send();
    }
})
*/