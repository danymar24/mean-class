var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    done: Boolean,
    createdAt: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Todo', TodoSchema);