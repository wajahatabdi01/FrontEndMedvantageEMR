import React, { useState, useEffect } from 'react';
import TableContainer from '../../Component/TableContainer';
import Heading from '../../Component/Heading';
import exportFromJSON from "export-from-json";
import DeveloperProjectRoleAPI from '../API/Report/DeveloperProjectRole';

export default function DeveloperProjectRoleComponent() {
    const [getDeveloperProjectRoleList, setDeveloperProjectRoleList] = useState([]);

    const fetchDeveloperProjectRole = async () => {
        const result = await DeveloperProjectRoleAPI(window.userId);
        setDeveloperProjectRoleList(result.responseValue);
    };
    let handleExportFile= ()=>{
        var arrFormat = [];
        getDeveloperProjectRoleList.map((val,ind) => {
            let param = ['SR','Name', 'Role', 'Sprint', 'Project'];
            
            arrFormat.push({
                [param[0]]: ind+1,
                [param[1]]: val.name,
                [param[2]]: val.roleTitle,
                [param[3]]: val.sprintBacklogText,
                [param[4]]: val.projectName
            });
        });
    
        const data = arrFormat;
        const fileName = 'DeveloperDailyProjectBacklog';
        const exportType = exportFromJSON.types.csv;
        exportFromJSON({ data, fileName, exportType });
    }

    useEffect(() => {
        fetchDeveloperProjectRole();
    }, []);

    return (
        <>
            <section className="main-content pt-3 mt-5">
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-12 maindashb">
                            <Heading text='Daily Developer Project Backlog ' />
                            <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleExportFile}>Export To CSV</button>
                        </div>
                        <TableContainer>
                            <thead>
                                <tr>
                                    <th className="text-center" style={{ "width": "5%" }}>S.No.</th>
                                    <th>Developer</th>
                                    <th>Role</th>
                                    <th>Backlog</th>
                                    <th>Project</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getDeveloperProjectRoleList && getDeveloperProjectRoleList.map((val, ind) => {
                                    return (
                                        <tr key={val.id}>

                                            <td className="text-center">{ind + 1}</td>
                                            <td>{val.name}</td>
                                            <td>{val.roleTitle}</td>
                                            <td>{val.sprintBacklogText}</td>
                                            <td>{val.projectName}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </TableContainer>
                    </div>
                </div>
            </section>
        </>
    );
}
