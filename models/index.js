const mongoose = require('mongoose');

(async()=>{
    await mongoose.connect('mongodb+srv://sheri:sheri@cluster0.tnxnj.mongodb.net/ChatApp?retryWrites=true&w=majority');
})();

module.exports = {
    Chat: require('./Chat'),
    User: require('./User')
}