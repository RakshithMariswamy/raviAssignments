import React, { useState } from 'react'
import './App.css';
import Loading from './loading'
// import mockJson from "./skill_tracker_json_structure.json"

const ListPage = () => {

    const [name, setName] = useState("");
    const [associateId, setAssociateId] = useState("");
    const [skill, setSkill] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    // const [apiResponse,setApiResponse] = useState(mockJson)
    const [apiResponse, setApiResponse] = useState([])
    const selOption = [{ key: "HTML-CSS-JAVASCRIPT", Value: "HTML-CSS-JAVASCRIPT" },
    { key: "ANGULAR", Value: "ANGULAR" },
    { key: "REACT", Value: "REACT" },
    { key: "SPRING", Value: "SPRING" },
    { key: "RESTFUL", Value: "RESTFUL" },
    { key: "HIBERNATE", Value: "HIBERNATE" },
    { key: "GIT", Value: "GIT" },
    { key: "DOCKER", Value: "DOCKER" },
    { key: "JENKINS", Value: "JENKINS" },
    { key: "AWS", Value: "AWS" }

    ]

    const callApiToSearch = async (type) => {
        console.log(type)
        setIsLoading(true)
        let response = []
        if (type === 'name') {
            response = await fetch(`baseURL/skill-search/api/v1/admin/name/${name}`)
        } else if (type === 'associate') {
            response = await fetch(`baseURL/skill-search/api/v1/admin/associatedId/${associateId}`)
        } else {
            response = await fetch(`baseURL/skill-search/api/v1/admin/skill/${skill}`)
        }
        setIsLoading(false)
        setApiResponse(response)
    }

    return (
        <div >
            <header className="site-header">
                <div className="site-identity">
                    <a href="#"><img src="http://via.placeholder.com/400" alt="Site Name" /></a>
                    <h1><a href="#">Admin Panel</a></h1>
                </div>

            </header>
            <div className="searchMain">
                <div className="searchFields">
                    <input type="text" onChange={(e) => setName(e.target.value)} className="inputSearch" />
                    <button onClick={() => callApiToSearch('name')} className="buttonSearch" > Name </button>
                </div>
                <div className="searchFields">
                    <input type="text" onChange={(e) => setAssociateId(e.target.value)} className="inputSearch" />
                    <button onClick={() => callApiToSearch('associate')} className="buttonSearch" > Associate ID </button>
                </div>
                <div className="searchFields">
                    <select onChange={(e) => setSkill(e.target.value)} className="inputSearch inputSelect" >
                        {selOption.map((opt) => {
                            return <option value={opt.key}>{opt.Value}</option>
                        })}
                    </select>
                    <button onClick={() => callApiToSearch('skill')} className="buttonSearch"> Skill </button>
                </div>
            </div>

            {isLoading && <div><Loading /></div>}

            {!isLoading && <div>
                {apiResponse.map((data) => {
                    return <div className="displayList">
                        <div>
                            <table id="customers">
                                <tr>
                                    <th>
                                        Name
                                    </th>
                                    <td>
                                        {data.name}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        Id
                                    </th>
                                    <td>
                                        {data.id}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        Email
                                    </th>
                                    <td>
                                        {data.email}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        Mobile
                                    </th>
                                    <td>
                                        {data.mobile}
                                    </td>
                                </tr>

                            </table>
                        </div>
                        <div>
                            <table id="customers">
                                {data.techSkills.map((tech) => {
                                    return <tr>
                                        <th>
                                            {tech.skillName}
                                        </th>
                                        <td>
                                            {tech.expertiseLevel}
                                        </td>
                                    </tr>
                                })}

                            </table>
                        </div>
                        <div>
                            <table id="customers">
                                {data.nonTechSkills.map((tech) => {
                                    return <tr>
                                        <th>
                                            {tech.skillName}
                                        </th>
                                        <td>
                                            {tech.expertiseLevel}
                                        </td>
                                    </tr>
                                })}

                            </table>
                        </div>
                    </div>
                })}
            </div>}

        </div>
    );
}

export default ListPage;
