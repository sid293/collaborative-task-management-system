import React from 'react'

export default function ProjectsList({list, idSetter}) {
    let handleClick = (projectId)=>{
        idSetter(projectId);
    }

  return (
    <div>
        <h2>Projects</h2>
        {list.map((ele)=>(
        // change it to id
        <div onClick={()=>{handleClick(ele.title)}} style={{border:"2px solid green"}}>
            <h5>{ele.title}</h5>
            <p>{ele.description}</p>
        </div>))}
      
    </div>
  )
}
