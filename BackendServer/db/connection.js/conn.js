const mongoose = require('mongoose');

const connectToMongo = () => {
    const dbUrl = 'mongodb://127.0.0.1:27017/myApp';
    mongoose.connect(dbUrl)
    .then(()=> {
        console.log('your db connection is established successfully');
    }).catch((err)=> {
        console.error(err);
    })
};

module.exports = connectToMongo;