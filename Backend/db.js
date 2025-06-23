const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://mukeshP:mukeshPassword@cluster0.82trip4.mongodb.net/Todo_app?retryWrites=true&w=majority&appName=Cluster0")

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
});

const todo = mongoose.model('todos',todoSchema);

module.exports = {
    todo
}