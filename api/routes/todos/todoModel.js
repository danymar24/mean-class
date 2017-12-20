var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    done: Boolean
});

module.exports = mongoose.model('Todo', TodoSchema);