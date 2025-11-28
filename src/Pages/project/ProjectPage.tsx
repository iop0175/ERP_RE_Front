import { Routes, Route } from "react-router-dom";
import ProjectAdd from "./ProjectAdd";
import PorjectInfo from "./ProjectInfo";
const ProjectPage = ()=>{
    
    return(
        <>
        <Routes>
            <Route path="add" element={<ProjectAdd/>}/>
            <Route path="info/*" element={<PorjectInfo/>}/>
        </Routes>
        </>
    )
}
export default ProjectPage;