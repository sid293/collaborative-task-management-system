import React, { useEffect, useState } from 'react'
import Search from '../components/Search';
import Filter from '../components/Filter';
import { useOutletContext } from 'react-router-dom';
import TasksList from '../components/TasksList';
import axios from 'axios';
const backend = import.meta.env.VITE_BACKEND;

const tasksJson= [
  {
    title: "Create Wireframes",
    description: "Design the wireframes for the new website layout.",
    status: "In Progress", // Options: "Todo", "InProgress", "Completed"
    deadline: "2024-11-20",
    assignedUser: "Emily Brown",
  },
  {
    title: "Set Up Backend",
    description: "Set up the backend for user authentication and API integration.",
    status: "Pending",
    deadline: "2024-11-25",
    assignedUser: "Michael Lee",
  },
  {
    title: "Draft Ad Copy",
    description: "Write the draft for the marketing campaign's ad copy.",
    status: "Completed",
    deadline: "2024-10-05",
    assignedUser: "Laura Wilson",
  },
  {
    title: "Develop API Endpoints",
    description: "Create RESTful APIs for the mobile app backend.",
    status: "In Progress",
    deadline: "2024-11-30",
    assignedUser: "John Doe",
  },
  {
    title: "Test Payment Gateway",
    description: "Integrate and test the payment gateway for transactions.",
    status: "Pending",
    deadline: "2024-12-05",
    assignedUser: "Jane Smith",
  },
  {
    title: "Create Dashboard Charts",
    description: "Develop charts to visualize user engagement metrics.",
    status: "Completed",
    deadline: "2024-06-30",
    assignedUser: "Sarah Johnson",
  },
];


export default function Tasks() {

  let [selectedProject, setSelectedProject] = useState(null);
  let [filteredTasks, setFilteredTasks] = useState(null);
  let [tasks, setTasks] = useState(tasksJson);
  let [displayPopup, setDisplayPopup] = useState(false);
  let { selectedProjectOutlet } = useOutletContext();
  //fetch tasks list based on selected project and fill in tasks and filteredtasks

  let addNewTask = (e) => {
    e.preventDefault();
    let newTask = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: "Todo",
      deadline: e.target.deadline.value,
      assignedUser: e.target.assignedUser.value
    }
    newTask.taskId = self.crypto.randomUUID();

    newTask.projectId = selectedProject.projectId || "1234";
    let token = sessionStorage.getItem('token');
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
    let url = backend + "/task/create";
    axios.post(url, newTask, config)
      .then((res) => {
        if (res.status === 201) {
          alert("New task created successfully");
          // setTasks([...tasks, newTask]);
          setTasks((prev)=>([...prev,newTask]));
          // setFilteredTasks([...filteredTasks, newTask]);
          setFilteredTasks((prev)=>([...prev,newTask]));
        } else {
          alert(`Fail: ${res.data.error}`);
        }
      }).catch((err) => {
        console.error(err.response.data.error);
        alert(`Error: ${err.response.data.error}`);
      })

    setDisplayPopup(false);
    // setTasks([...tasks, newTask]);
    // setFilteredTasks([...filteredTasks, newTask]);
    // setDisplayPopup(false);
  }

  useEffect(() => {
    let storedProject = localStorage.getItem("projectSelected");
    setSelectedProject(JSON.parse(localStorage.getItem("projectSelected")));
    let token = sessionStorage.getItem('token');
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
    let url = backend + "/task/readAll";
    axios.get(url, config)
      .then((res) => {
        setFilteredTasks(res.data);
        setTasks(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert("Error: ", err);
      })
  }, [])

  return (
    <div>
        <h2>Project: {selectedProject && selectedProject.title}</h2>
        <Search list={filteredTasks} setFilteredProjects={setFilteredTasks} />
        <Filter list={tasks} filteredList={filteredTasks} setFilteredProjects={setFilteredTasks} of={"Tasks"} />

        {/* {filteredTasks && filteredTasks.map((ele, indx)=>(<div key={indx}>title: {ele.title}</div>))} */}
        {filteredTasks && <TasksList list={filteredTasks} />}
        <button onClick={()=>{setDisplayPopup(true)}} >Add Task</button>
        {displayPopup && <div className="popup" style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50vw",
          maxHeight: "90vh",
          overflowY: "auto",
          backgroundColor:"gray",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div className="popup-content" style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1em"
          }}>
            <div className="popup-header">
              <h3>Add Task</h3>
              <button className="close" onClick={()=>{setDisplayPopup(false)}} style={{
                position: "absolute",
                top: "0.5em",
                right: "0.5em"
              }}>x</button>
            </div>
            <form onSubmit={addNewTask}>
              <label style={{marginTop: "1em"}}>
                Title:
                <input type="text" name="title" style={{width: "100%"}} />
              </label>
              <label style={{marginTop: "1em"}}>
                Description:
                <textarea name="description" style={{width: "100%", height: "10em"}}></textarea>
              </label>
              <label style={{marginTop: "1em"}}>
                Deadline:
                <input type="date" name="deadline" style={{width: "100%"}} />
              </label>
              <label style={{marginTop: "1em"}}>
                Assigned User:
                <input type="text" name="assignedUser" style={{width: "100%"}} />
              </label>
              <button type="submit" style={{marginTop: "1em", width: "100%"}}>Add</button>
            </form>
          </div>
        </div>}
    </div>
  )
}