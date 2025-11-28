import axios from "axios";
import { useState, useEffect } from "react";

interface Dept {
    deptId: number;
    deptName: string;
}

interface Project {
    projectId: number;
    projectName: string;
    deptId: number;
    dept: Dept;
}

const ProjectList = () => {
    const [projects, setProject] = useState<Project[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem("jwt");
                const res = await axios.get<Project[]>("http://localhost:9080/api/project", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setProject(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>프로젝트 목록</h2>
            <ul>
                {projects.map((project) => (
                    <li key={project.projectId}>
                        프로젝트 명: {project.projectName}  
                        {" / "}부서: {project.dept.deptName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectList;