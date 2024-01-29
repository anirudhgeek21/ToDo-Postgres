const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");


app.use(cors());
app.use(express.json());


//create todo
app.post("/todos" , async (req,res) => {
    try {
        const { description } =req.body;
        // const {title} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *" ,[description]);
        // const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *" ,[description]);
        res.json(newTodo.rows[0]);
        console.log(req.body);
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
});

app.listen(3001, () => {
    console.log("server is running on port 3001");
})

//see all todos

app.get("/todos" , async(req,res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (error) {
        console.error(error.message);
    }
});


//get todo 

app.get("/todos/:id" , async(req,res) => {
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id]);
        res.json(todo.rows[0]);
    } catch (error) {
        console.log(error.message)
    }
})

//update

app.put("/todos/:id" , async(req,res) =>{
    try {
        const {id} = req.params;
        const {description } = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description,id]);
        res.json("Todo updated");
    } catch (error) {
        console.log(error.message);
    }
});


//delete

app.delete("/todos/:id" , async(req,res)=> {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",[id]);
        res.json("Item Deleted");
    } catch (error) {
        console.log(error.message);
    }
});