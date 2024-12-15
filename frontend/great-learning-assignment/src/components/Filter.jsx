import React, { useEffect, useState } from 'react'

export default function Filter({list, setFilteredProjects, of}) {
    //controlled components
    let [date, setDate] = useState("");
    let [user, setUser] = useState("");
    let dateWord = "";
    let userWord = "";
    if(of==="Projects"){
       dateWord = "creationDate"; 
       userWord = "owner"; 
    }else{
       dateWord = "deadline"; 
       userWord = "assignedUser"; 
    }

    let handleFilter = ()=>{
        //get list from parent and filter based on (creationDate|Deadline)(Owner|AsssignedUser)
    }

    useEffect(()=>{
        let filteredList = [];
        if(user){
            filteredList = list.filter((ele)=>(
                ele[userWord] === user
            ))
            setFilteredProjects(filteredList);
        }
        //same for date
    },[user,date]);

    return (
        <div>
            {/* handle the date functionaligy later */}
            <input type="date" name="date" id="date" />
            <select onChange={(e)=>{setUser(e.target.value)}} name="usrOwn" id="usrOwn">
                <option hidden value="select">selectoption</option>
                {list.map((ele, i) => (
                    <option key={i} value={ele[userWord]}>{ele[userWord]}</option>
                ))}
            </select>
            <button>Clear</button>
        </div>
    )
}
