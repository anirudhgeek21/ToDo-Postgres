import React, {Fragment ,useState} from "react";

const InputTodo = () => {


    const [description , setDescription] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { description };
            const response = await fetch("http://localhost:3001/todos", {
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(body)
            });

            window.location = "/";
        } catch (error) {
            console.log(error.message);
        }
    }

    return(
        <Fragment>
            <h1 className="w-50 mx-auto text-center mt-5">Todo List App</h1>
            <form action="" className="d-flex w-50 mx-auto mt-5" onSubmit={onSubmitForm}>
                <input type="text" className="form-control" value={description} 
                    onChange= {e => setDescription(e.target.value)} />
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    ) 
};

export default InputTodo;