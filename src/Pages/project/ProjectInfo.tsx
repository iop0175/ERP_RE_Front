import { useLocation } from "react-router-dom";
const PorjectInfo = () => {
    const location = useLocation();
    const { project } = location.state || {};

    console.log(project);
    return (
        <div>
            {project && (
                <>
                    <h1>{project.projectName}</h1>
                    <p>ID: {project.projectId}</p>
                </>
            )}
        </div>
    )
}
export default PorjectInfo;