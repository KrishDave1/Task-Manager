const express = require('express');
const app = express();
const tasks = require('./routes/tasks')
const connectdb = require('./db/connect');
require('dotenv').config(); // This is used to access the environment variables.
const notFound = require('./middleware/notfound');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.static('./public')); // This is used to serve the static files like HTML, CSS, JS files. This is done by express.static() middleware.
app.use(express.json()); // After a request is made, the body of the request is parsed and then added to the req object. This is done by express.json() middleware.


// routes which can be used for beautifying the backend server.
// app.get('/hello', (req, res) => {
//     res.send('Hello World!')
    // We can also setup a beautiful HTML page on some url in backend server.That is what Django does in its backend server by default.
// });

app.use('/api/v1/tasks', tasks); // This means for this page all the controllers functions are middleware functions.

app.use(notFound); // This is a middleware function which is used to handle the 404 error.
app.use(errorHandlerMiddleware); // This is a middleware function which is used to handle the 500 error. on failed API calls.
const port = process.env.PORT || 3000; 
//! For this to work , we need to write this the terminal
// $env:PORT=5000 ; npm start

const start = async () => {
    try {
        await connectdb(process.env.MONGO_URI); // Meaning we will connect to the database and then start the server.
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

//Why use patch instead of put?
// Patch is used when you want to update a part of the object and not the whole object.
// Put is used when you want to update the whole object.