const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')


const app = express()
app.use(cors())
app.use(express.json())




mongoose.connect('mongodb+srv://Harsh-backend:harsh123@cluster0.xq0s5.mongodb.net/TodoUser')


app.get('/get', (req, res) => {
     TodoModel.find()
     .then(result => res.json(result))
     .catch(err => res.json(err))

})
app.post('/add', (req, res) =>{
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/todo/:id',async(req,res)=>{
    const { id } = req.params;
    console.log(id);
    const todo = await TodoModel.findByIdAndDelete(id);
    res.status(200).json(todo)
})
app.listen(3001, () =>{
    console.log("Server is running")
})

