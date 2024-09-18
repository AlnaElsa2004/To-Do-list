import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
//getting value from local storage and storing it in state variable named todo
  const [todo,setTodo]=useState(()=>{
    const storedTodo=localStorage.getItem('todo');
    return storedTodo ? JSON.parse(storedTodo) : [];
  });
  
  useEffect(()=>{
    localStorage.setItem('todo',JSON.stringify(todo));
    console.log(JSON.stringify(todo));
  });

  const[title,setTitle]=useState("");
  const[description,setDescription]=useState("");
  const[dueDate,setDuedate]=useState("");
  const[checkedStatusValue,setCheckedStatusValue]=useState("");
  const[showCompletedData,setShowCompletedData]=useState(false);
  
  function showCompleted(){
    setShowCompletedData(!showCompletedData)
  }

  function handleTitle(e){
    setTitle(e.target.value);
   
  }

  function handleDescription(e){
    setDescription(e.target.value);
  }

  function handleDuedate(e){
    setDuedate(e.target.value);
  }

  function addData(){
    if(title&&description&&dueDate){
      setTodo([...todo,{title,description,dueDate,checkedStatusValue}])
      setTitle("")
      setDescription("")
      setDuedate("")  
    }else{
      alert("Please enter the values")
    }
  }

  function handleChecked(index,value){
    const updatedTodo=[...todo];
    console.log("Check called")
    console.log(value)
    value.checkedStatusValue='checked'
    console.log(value)
    setTodo(updatedTodo)
  }

  function handleDelete(value){
    //get the todo array
    //find the index of the item that delete button clicked
    //use splice function to delete it from the todo state variable
    const updatedTodo=[...todo];
    const indexOfSelected=updatedTodo.findIndex(item=>
      item.title===value.title&&
      item.description===value.description&&
      item.dueDate===value.dueDate
    );
    updatedTodo.splice(indexOfSelected,1);
    setTodo(updatedTodo)
  }
  return (
    <>
      <div>
     <div className='inputButton'>
      <h1>To-Do List</h1>
      <input onChange={handleTitle} placeholder='Enter Title'></input>
      <input onChange={handleDescription} placeholder='Enter Description'></input>
      <input onChange={handleDuedate} placeholder='Enter Due Date'></input>
      <button onClick={addData}>Add Task</button>
      {showCompletedData && <button onClick={showCompleted}>Show Pending Task </button>}
      {!showCompletedData && <button onClick={showCompleted}>Show Completed Task </button>}
     </div>
     <div className='container-box'>
      {!showCompletedData &&  todo
        .filter(item=>item.checkedStatusValue!='checked')
        .map((value,index)=>(
          <div key={index} className='container'>
          <h2>{value.title}</h2>
          <p><b>Description</b>:{value.description}</p>
          <p><b>Due Date</b>:{value.dueDate}</p>
          <button className='delete' onClick={()=>handleDelete(value)}>Delete Task</button>
          <div className='checkspan'>
            <input type='checkbox' checked={value.checkedStatusValue} onChange={()=>handleChecked(index,value)} />
            <span>Completed</span>
          </div>
          </div>
        ))
      }

{showCompletedData &&  todo
        .filter(item=>item.checkedStatusValue=='checked')
        .map((value,index)=>(
          <div key={index} className='container'>
          <h2>{value.title}</h2>
          <p><b>Description</b>:{value.description}</p>
          <p><b>Due Date</b>:{value.dueDate}</p>
          <button className='delete' onClick={()=>handleDelete(value)}>Delete Task</button>
          <div className='checkspan'>
            <input type='checkbox' checked={value.checkedStatusValue} onChange={()=>handleChecked(index,value)} />
            <span>Completed</span>
          </div>
          </div>
        ))
      }
     </div>
      </div>
     
    </>
  )
}

export default App
