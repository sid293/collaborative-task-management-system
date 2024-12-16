import React, {useEffect, useState} from 'react'
import Search from '../components/Search'
import Filter from '../components/Filter'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import ProjectsList from '../components/ProjectsList';
import axios from 'axios';
const backend = import.meta.env.VITE_BACKEND;


const projectsSample = [
  {
    title: "Website Redesign",
    description: "Redesign the company website for better user experience.",
    creationDate: "2024-11-01",
    owner: "John Doe",
  },
  {
    title: "Mobile App Development",
    description: "Develop a cross-platform mobile app for the product.",
    creationDate: "2024-10-15",
    owner: "Jane Smith",
  },
  {
    title: "Marketing Campaign",
    description: "Launch a digital marketing campaign for the new product.",
    creationDate: "2024-09-20",
    owner: "Sarah Johnson",
  },
  {
    title: "Inventory Management System",
    description: "Develop a system to track inventory in real-time.",
    creationDate: "2024-08-10",
    owner: "Michael Lee",
  },
  {
    title: "Employee Portal",
    description: "Create a portal for employees to access internal resources.",
    creationDate: "2024-07-05",
    owner: "Emily Brown",
  },
  {
    title: "Data Analytics Dashboard",
    description: "Build a dashboard for visualizing key performance metrics.",
    creationDate: "2024-06-22",
    owner: "Laura Wilson",
  },
];


export default function Projects() {

    //how are you going to keep trakc of new user
    let [newProjectData, setNewProjectData] = useState({title:"",description:""});
    let location = useLocation();
    let [addNewProjectDisplay, setAddNewProjectDisplay] = useState(false);
    let [filteredProjects,setFilteredProjects] = useState([]);
    let [projects,setProjects] = useState([]);
    let [selectedProject, setSelectedProject] = useState(null);
    
    let navigate = useNavigate();

    let addNewProject = (e)=>{
        e.preventDefault();
        let newObj = {
            projectId:self.crypto.randomUUID(),
            title: newProjectData.title,
            description: newProjectData.description,
            creationDate: `${new Date().getDay()}-${new Date().getMonth()}-${new Date().getFullYear()}`,
            owner: "new owner",
        }
        let token = sessionStorage.getItem('token');
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        };
        let url = backend+"/project/create";
        axios.post(url, newObj, config)
          .then((res) => {
            if(res.status === 201){
              alert("New project created successfully");
              setFilteredProjects([...filteredProjects, newObj]);
              setProjects([...projects, newObj]);
            }else{
              alert("Fail: "+res.data.error);
            }
          })
          .catch((err) => {
            console.error(err.response.data.error);
            alert("Error: "+err.response.data.error);
          })

        // let response = projectsSample;
        // response.push(newObj);
        // setFilteredProjects(response);
        // setProjects(response);
        setAddNewProjectDisplay(false);
    }

    useEffect(()=>{
        if(selectedProject){
            navigate("/projects/tasks");
            localStorage.setItem("projectSelected",JSON.stringify(selectedProject));
        }
    },[selectedProject]);
    useEffect(()=>{
      let token = sessionStorage.getItem('token');
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };
      let url = backend+"/project/readAll";
      axios.get(url, config)
        .then((res) => {
          setFilteredProjects(res.data);
          setProjects(res.data);
        })
        .catch((err) => {
          console.error(err);
          alert("Error: ",err);
        })

    },[])

    if(location.pathname === "/projects/tasks"){
        return(<Outlet context={{selectedProjectOutlet:selectedProject}} />)
    }

  return (
    <div>
        <h2>username</h2>
        <Search list={filteredProjects} setFilteredProjects={setFilteredProjects} />
        <Filter list={projects} filteredList={filteredProjects} setFilteredProjects={setFilteredProjects} of={"Projects"} />

        {/* {filteredProjects && filteredProjects.map((ele, indx)=>(<div key={indx}>title: {ele.title}</div>))} */}
        {filteredProjects && <ProjectsList projectSetter={setSelectedProject} list={filteredProjects} />}
        <button onClick={()=>{setAddNewProjectDisplay(true)}}>Add new</button>
        {addNewProjectDisplay && 
            <div style={{
                border:"1px solid blue", 
                position:"fixed",
                top:"30%",
                left:"30%",
                width:"50%",
                height:"50%",
                backgroundColor:"gray",
                overflow:"hidden"
                }}>
                    <button onClick={()=>{setAddNewProjectDisplay(false)}}>X</button>
                    <h3>Enter Project Details</h3>
                    <form action="" onSubmit={addNewProject}>
                        <label htmlFor="title">Title</label>
                        <input required id="title" type="text" value={newProjectData.title} onChange={(e)=>{setNewProjectData((prev)=>({...prev,title:e.target.value}))}} />
                        <br />
                        <label htmlFor="description">Description</label>
                        <textarea required id="description" rows="4" value={newProjectData.description} onChange={(e)=>{setNewProjectData((prev)=>({...prev,description:e.target.value}))}} cols="30">Description</textarea>
                        <input type="submit" />
                    </form>
            
            </div>}
    </div>
  )
}
