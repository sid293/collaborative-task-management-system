import React, { useState } from 'react'
import Search from '../components/Search';
import Filter from '../components/Filter';
import { useOutletContext } from 'react-router-dom';
import TasksList from '../components/TasksList';

const tasksJson= [
  {
    title: "Create Wireframes",
    description: "Design the wireframes for the new website layout.",
    status: "In Progress", // Options: "Pending", "In Progress", "Completed"
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

    let [filteredTasks,setFilteredTasks] = useState(tasksJson);
    let [tasks,setTasks] = useState(tasksJson);
    let {selectedProject} = useOutletContext();
    //fetch tasks list based on selected project and fill in tasks and filteredtasks

  return (
    <div>
        <h2>{selectedProject}</h2>
        <Search list={filteredTasks} setFilteredProjects={setFilteredTasks} />
        <Filter list={tasks} setFilteredProjects={setFilteredTasks} of={"Tasks"} />

        <h4>filterd tasks list</h4>
        {/* {filteredTasks && filteredTasks.map((ele, indx)=>(<div key={indx}>title: {ele.title}</div>))} */}
        {filteredTasks && <TasksList list={tasksJson} />}

      
    </div>
  )
}
