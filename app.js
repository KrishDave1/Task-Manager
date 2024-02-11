const express = require('express');
const app = express();
const tasks = require('./routes/tasks')
const connectdb = require('./db/connect');
require('dotenv').config();

// middleware
app.use(express.json()); // This helps us get the data in req.body.


// routes
app.get('/hello', (req, res) => {
    res.send('Hello World!')
    // We can also setup a beautiful HTML page on some url in backend server.
});

app.use('/api/v1/tasks', tasks);


const port = 3000

const start = async () => {
    try {
        await connectdb(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error(error);
    }
}

start();
// All types of request executed here.
// app.get('/api/v1/tasks') - get all the tasks
// app.post('/api/v1/tasks') - create a new task
// app.get('/api/v1/tasks/:id') - get a single task
// app.patch('/api/v1/tasks/:id') - update task.
// app.delete('/api/v1/tasks/:id') - delete task.