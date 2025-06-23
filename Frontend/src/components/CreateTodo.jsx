import { useState } from 'react'
import { Todos } from './Todos';
export function CreateTodo(props){
    const[title,setTitle] = useState("");
    const[description,setDescription] = useState("");
    return <div>
        <input type="text" placeholder="Title" onChange={(e)=>{
            const value = e.target.value;
            // console.log(e.target);
            setTitle(value);
        }} /> <br/>
        <input type="text" placeholder="Description" onChange={(e)=>{
            const value = e.target.value;
            setDescription(value);
        }}/> <br />
        <button
        onClick={()=>{
            fetch("http://localhost:3000/createTodos",{
                method:"POST",
                body:JSON.stringify({
                    title:title,
                    description:description
                }),
                headers:{
                    "content-Type":"application/json"
                }
            })
            .then(async function(res) {
                const json = await res.json();
                alert("Todo added");
            })
            props.setTodos([...Todos,{
                title:title,
                description:description
            }])
        }}>Add a todo</button>
    </div>
}