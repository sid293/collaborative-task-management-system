import React, { useEffect, useState } from 'react'

export default function TasksList({list}) {
    const [popup, setPopup] = useState(false);
    const [sortedList, setSortedList] = useState({
        todo:[],
        inProgress:[],
        completed:[]
    })
    const [selectedTask,setSelectedTask] = useState({});


    useEffect(()=>{
        //In Progress  Pending Completed
        let inProgress = [];
        let pending = [];
        let completed = [];
        list.map((ele)=>{
            switch(ele.status){
                case "In Progress":
                    inProgress.push(ele);
                    break;
                case "Pending":
                    pending.push(ele);
                    break;
                case "Completed":
                    completed.push(ele);
                    break;
            }
        });
        setSortedList((prev)=>({inProgress,todo:pending,completed}));
    },[]);

  return (
    <div style={{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between"
    }}>
        <div id="todo" style={{
            border:"2px solid gray",
            width:"33%",
            padding:"1em"
        }}>
            <h3>ToDo</h3>
            {sortedList.todo.map((ele,i)=>(
                <div onClick={()=>{setPopup(true); setSelectedTask(ele); }} key={i} style={{
                    border:"1px solid black",
                    padding:"0.5em",
                    margin:"0.5em"
                }}>
                    <h5>{ele.title}</h5>
                </div>
            ))}
        </div>
        <div id="inProgress" style={{
            border:"2px solid gray",
            width:"33%",
            padding:"1em"
        }}>
            <h3>In Progress</h3>
            {sortedList.inProgress.map((ele,i)=>(
                <div onClick={()=>{setPopup(true); setSelectedTask(ele); }} key={i} style={{
                    border:"1px solid black",
                    padding:"0.5em",
                    margin:"0.5em"
                }}>
                    <h4>{ele.title}</h4>
                    <p>{ele.description}</p>
                </div>
            ))}
        </div>
        <div id="completed" style={{
            border:"2px solid gray",
            width:"33%",
            padding:"1em"
        }}>
            <h3>Completed</h3>
            {sortedList.completed.map((ele,i)=>(
                <div onClick={()=>{setPopup(true); setSelectedTask(ele); }} key={i} style={{
                    border:"1px solid black",
                    padding:"0.5em",
                    margin:"0.5em"
                }}>
                    <h4>{ele.title}</h4>
                    <p>{ele.description}</p>
                </div>
            ))}
        </div>
    {popup && 
        <div style={{
            position:"fixed",
            border:"2px solid gray",
            backgroundColor:"#333",
            color:"#fff",
            top:"30%",
            left:"30%",
            width:"50%",
            height:"50%",
            padding:"1em"
        }}>
            <button onClick={()=>{setPopup(false)}} style={{
                float:"right",
                backgroundColor:"#333",
                color:"#fff",
                border:"none"
            }}>X</button>
            <p>{selectedTask.title}</p>
            <p>{selectedTask.description}</p>
        </div>
    }
    </div>
  )
}
