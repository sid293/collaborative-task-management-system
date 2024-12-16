import React, { useEffect, useRef, useState } from 'react'

export default function Filter({list, setFilteredProjects, filteredList, of}) {
    //controlled components
    let dateRef = useRef(null);
    let userRef = useRef(null);
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

    let handleClear = ()=>{
        console.log("handle clear");
        setDate("");
        setUser("");
        setFilteredProjects(list);
        dateRef.current.value = "select";
        userRef.current.value = "select";
        //get list from parent and filter based on (creationDate|Deadline)(Owner|AsssignedUser)
    }

    useEffect(()=>{
        let fL = [];
        if(user){
            fL = filteredList.filter((ele)=>(
                ele[userWord] === user
            ))
            setFilteredProjects(fL);
        }
        if(date){
            fL = filteredList.filter((ele)=>(
                ele[dateWord] === date 
            ))
            setFilteredProjects(fL);
        }
    },[user,date]);

    return (
        <div>
            {/* handle the date functionaligy later */}
            {/* <input type="date" name="date" id="date" /> */}
            <select ref={dateRef} onChange={(e)=>{setDate(e.target.value)}} name="date" id="date">
                <option hidden value="select">select Date</option>
                {list.map((ele, i) => (
                    <option key={i} value={ele[dateWord]}>{ele[dateWord]}</option>
                ))}
            </select>
            <select ref={userRef} onChange={(e)=>{setUser(e.target.value)}} name="usrOwn" id="usrOwn">
                <option hidden value="select">selectoption</option>
                {list.map((ele, i) => (
                    <option key={i} value={ele[userWord]}>{ele[userWord]}</option>
                ))}
            </select>
            <button onClick={handleClear}>Clear</button>
        </div>
    )
}
