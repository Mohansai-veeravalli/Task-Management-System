const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//task data

let tasks = []

//Routes

app.get('/tasks',(req,res) => {
    res.json(tasks);
})

app.post('/tasks',(req,res) => {
    const {title,category,dueDate} = req.body;
    const newTask = {
        id: uuidv4(),
        title,
        category,
        dueDate,
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});


app.put('/tasks/:id',(req,res) => {
    const taskId = req.params.id;
    const {title,category,dueDate} = req.body;
    const task = tasks.find(t => t.id === taskId)
    if(task) {
        task.title = title || task.title;
        task.category = category || task.category;
        task.dueDate = dueDate || task.dueDate;

    }else{
        res.status(404).json({message: 'Task not found'});
    }
})


app.delete('tasks/:id', (req,res) => {
    const taskId = req.params.id;
    const TaskIndex = tasks.findIndex( t => t.id === taskId)

    if(taskindex !== -1){
        tasks.splice(TaskIndex);
        res.sendStatus(204);
    }else{
        res.status(404).json({ message: 'Task not found' });
    }
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})