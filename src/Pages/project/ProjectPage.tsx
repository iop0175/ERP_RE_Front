import { Routes, Route } from "react-router-dom";
import ProjectAdd from "./ProjectAdd";
import PorjectInfo from "./ProjectInfo";
import ProjectList from "./ProjectList";
const ProjectPage = ()=>{
    
    return(
        <>
        <Routes>
            <Route path="add" element={<ProjectAdd/>}/>
            <Route path="info/*" element={<PorjectInfo/>}/>
            <Route path="" element={<ProjectList/>}/>
        </Routes>
        </>
    )
}
export default ProjectPage;