import React , {Fragment ,useEffect , useState} from "react";


const ListTodos = () =>{


    const [todos, setTodos] = useState([]);




    const deleteTodo = async(id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:3001/todos/${id}`,{
                method: "DELETE"
            })

            setTodos(todos.filter(todo => todo.todo_id !== id)) // this is that the todo will only store the todo items whose id is not the id mentioned ie the id tht is deleted.
        } catch (error) {
            console.log(error.message)
        }
    }

    const getTodos = async() => {
        try {
            
            const response = await fetch("http://localhost:3001/todos")
            const jsonData = await response.json()

            setTodos(jsonData);

        } catch (error) {
            console.log(error.message);
        }
    }


    console.log(todos);

    useEffect(()=>{
        getTodos();
    }, [])  //[] usewd to make only one request


    return (
        <Fragment>
    
                    {/* {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td>EDIT</td>
                            <td><button className="btn btn-danger"
                                onClick={() => deleteTodo(todo.todo_id)}
                            >
                                DELETE</button></td>
                        </tr>
                    ))} */}

                <div className="row text-center align-items-center w-50 mx-auto mt-5">
                {todos.map(todo => (
                    <div className="col-md-4 mt-5 mx-5 bg-primary text-light rounded" key={todo.todo_id}>
                    <div className="p-card p-2 rounded px-3 text-center text-monospace font-italic bg-primary">
                        <h5 className="mt-2 text-monospace font-italic"><strong>{todo.description}</strong></h5>
                        <button className="btn btn-danger mt-2 mb-3" onClick={() => deleteTodo(todo.todo_id)}>
                        DELETE
                        </button>
                    </div>
                    </div>
                ))}
                </div>
               
        </Fragment>
    )
};

export default ListTodos;