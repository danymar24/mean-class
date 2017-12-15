var Todo = require('./todoModel');

module.exports = {
    getTodos: (req, res) => {
        Todo.find((err, todos) => {
            if (err) return res.status(404).send(err);

            return res.json(todos);
        });
    },
    getTodo: (req, res) => {
        Todo.findById(req.params.id, (err, todo) => {
            if (err) return res.status(404).send(err);

            return res.json(todo);
        });
    },
    createTodo: (req, res) => {
        var todo = new Todo(req.body);

        todo.save((err) => {
            if (err) return res.send(err);

            return res.json({ message: 'Todo created' });
        });
    },
    updateTodo: (req, res) => {
        Todo.findById(req.params.id, (err, todo) => {
            if (err) return res.send(err);

            todo.text = req.body.text;
            todo.done = req.body.done;

            todo.save((err) => {
                if (err) return res.send(err);

                res.json({ message: 'Todo updated' });
            });
        });
    },
    deleteTodo: (req, res) => {
        Todo.remove({
            _id: req.params.id
        }, (err, todo) => {
            if (err) return res.send(err);

            return res.json({ message: 'Todo deleted' });
        });
    }
};