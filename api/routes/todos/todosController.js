module.exports = {
    getTodos: (req, res) => {
        res.json({ message: 'Getting all the todos' });
    },
    getTodo: (req, res) => {
        res.json({ message: 'Getting one todo' });
    },
    createTodo: (req, res) => {
        res.json({ message: 'Creating one todo' });
    },
    updateTodo: (req, res) => {
        res.json({ message: 'Updating todo' });
    },
    deleteTodo: (req, res) => {
        res.json({ message: 'Deleting todo' });
    }
};