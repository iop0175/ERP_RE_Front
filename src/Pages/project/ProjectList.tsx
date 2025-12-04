import { getProjectsByUserId } from "@/service/project/Project";
import { useEffect, useState } from "react";
import PageLoading from "../modals/PageLoading";
import { useNavigate } from "react-router-dom";
interface Users {
    userId: number;
    userName: string;
}
interface Dept {
    deptId: number;
    deptName: string;
}

interface Project {
    projectId: number;
    projectName: string;
    deptId: number;
    dept: Dept;
    users: Users[];
}

const ProjectList = () => {
    const navigate = useNavigate();
    const [project,setProject] = useState<Project[]>([])
    const [user, setUser] = useState(() => {
        const saved = sessionStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (!user) return;

        const pageData = async () => {
            try {
                setLoading(true);
                const res = await getProjectsByUserId(user.userId);
                setProject(res);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        pageData();
    }, [user]);
    const goToProjectPage =(project:Project)=>{
        navigate(`/project/info/${project.projectId}`, {state: {project}});
    }
    return (
        <>
            <div>
                {project.map((project)=>(
                    <div key={project.projectId} onClick={()=>{goToProjectPage(project)}}>{project.projectName}</div>
                ))}
            </div>
            {loading && <PageLoading />}
        </>
    )
}
export default ProjectList;