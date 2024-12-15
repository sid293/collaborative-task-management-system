import React, { useState } from 'react'

export default function Search({list, setFilteredProjects}) {
    let [searchText, setSearchText] = useState("");

    let handleSearch = ()=>{
        //Todo: filter list and display based on title and description 
        console.log("handle search: ",list);
        let filteredList = list.filter((ele)=>{
            return ele.title.includes(searchText) || ele.description.includes(searchText)
        })
        console.log("search filter: ",filteredList);
        setFilteredProjects(filteredList);
    }

  return (
    <div>
        <input type='text' placeholder='Search' value={searchText} onChange={(e)=>{setSearchText(e.target.value)}} />
        {/* <button onClick={()=>{handleSearch}}>Search</button> */}
        <button onClick={handleSearch}>Search</button>
    </div>
  )
}
