import { useState } from 'react'
import './App.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// const crypto = require('crypto');
const backend = import.meta.env.VITE_BACKEND;

function App() {
  const [currentPage, setCurrentPage] = useState("Login")
  const [formData, setFormData] = useState({username:"",email:"",password:""});
  const navigator = useNavigate();

  let handleSubmit = (e)=>{
    e.preventDefault();
    let data = null;
    let url = `${backend}/user`;
    if(currentPage==="Login"){
      let {username, password} = formData;
      data = {username, password};
      url = url + "/login";
    }else{
      data = formData;
      url = url + "/register";
    }
    console.log("data: ",data);
    data.id = self.crypto.randomUUID();
    axios.post(url, data)
      .then((res) => {
          console.log("res: ",res);
        if (res.status === 201) {
          alert("User created successfully");
          setCurrentPage("Login");
        } else if (res.status === 200) {
          console.log("res: ",res);
          let token = res.data.token; 
          sessionStorage.setItem('token', token);
          alert("Login successful");
          navigator("/projects");
        } else {
          alert(`Fail: ${res.data.error}`);
        }
      }).catch((err) => {
        console.error(err.response.data.error);
        alert(`Error: ${err.response.data.error}`);
      });
    // data.id = self.crypto.randomUUID();
  }

  return (
    <>
      <div>
        <button onClick={()=>{setCurrentPage((prev)=>{
          if(prev==="Login"){
            return "Register"
          }
          return "Login";
        })}}>{currentPage==="Login"?"Register":"Login"}</button>
      </div>
      <h2>{currentPage}</h2>
      <form action="">
        <label htmlFor="name">Name: </label>
        <input id="name" type="text" value={formData.username} onChange={(e)=>{setFormData((prev)=>({...prev,username:e.target.value}))}} />
        {currentPage === "Register" && 
          <>
            <label htmlFor="email">Email: </label>
            <input id="email" type="email" value={formData.email} onChange={(e)=>{setFormData((prev)=>({...prev,email:e.target.value}))}} />
          </>
        }
        <label htmlFor="password">Password: </label>
        <input id="password" type="password" value={formData.password} onChange={(e)=>{setFormData((prev)=>({...prev,password:e.target.value}))}} />
        <button onClick={handleSubmit} >Submit</button>
      </form>
    </>
  )
}

export default App