import react, { useEffect } from 'react'
import Create  from './create'
import { useState } from 'react'
import axios from 'axios'
import { MdDelete } from "react-icons/md";


function Home(){

    const [todos, setTodos] = useState([])

     const fetchTodo = async () => {
        await axios.get('http://localhost:3001/get')
        .then(result =>setTodos(result.data))
        .catch(err => console.log(err))
    }

     useEffect(()=>{
        fetchTodo();
        
     },[])
     const handleDelete = (todo)=>{
        const id = todo._id;
        console.log(id);
        axios.delete(`http://localhost:3001/todo/${id}`)
        .then(()=>{console.log("successfully deleted"); fetchTodo()})
        .catch(err => console.log(err))
     }

    
    return(
        <div className='home'>
          <h2>Todo List</h2>  
          <Create fetchTodo={fetchTodo} />
       {
        todos.length === 0 ?
        <div><h2>No Record</h2></div>
        :
        todos.map(todo => (
            
            <div className='task'>
                <div className='checkbox'>
            <p>{todo.task}</p>
             </div>
             <div>
                <span><MdDelete  onClick={()=>handleDelete(todo)}/></span>
             </div>
             </div>
        ))
       }

        </div>
    )
}
export default Home;