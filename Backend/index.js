const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const { todo } = require('./db');
const { createTodos } = require('./types');
const { updateTodo } = require('./types');
app.post("/createTodos",async function (req,res){
    const createPayload = req.body;
    const parsedPayload = createTodos.safeParse(createPayload);
    if(!parsedPayload.success){
        return res.status(403).json({
            msg:"Invalid input"
        })
    }
    //Put it in mongodb
    console.log("Connected to mongodb");
    console.log(createPayload.title);
    console.log(createPayload.description);
    await todo.create({
        title:createPayload.title,
        description:createPayload.description,
        completed: false
    })
    res.json({
        msg:"Todo created"
    })
});

app.put("/updateTodos",async function (req,res){
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg:"You sent the wrong inputs",
        })
        return;
    }
    await todo.updateOne({
        _id:req.body.id
    },{
        completed:true
    })
    res.status(411).json({msg:"todo updated"})
});

app.get("/getTodos",async function (req,res){
    const todos = await todo.find({});
    res.json({
        todos
    })
});

const PORT = 3000;
app.listen(PORT);