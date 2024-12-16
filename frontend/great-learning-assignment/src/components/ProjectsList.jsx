import React from 'react'

export default function ProjectsList({list, projectSetter}) {
    let handleClick = (project)=>{
        projectSetter(project);
    }

  return (
    <div>
        <h2>Projects</h2>
        {list.map((ele)=>(
        // add id to list, and add mechanism to see edit options for username
        <div onClick={()=>{handleClick(ele)}} style={{border:"2px solid gray"}}>
            <h5>{ele.title}</h5>
            <p>{ele.description}</p>
        </div>))}
      
    </div>
  )
}
