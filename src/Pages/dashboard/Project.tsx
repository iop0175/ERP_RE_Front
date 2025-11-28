import axios from "axios";
import { useState, useEffect } from "react";
import Plus from "@/styles/SVG/Plus";
import '@/styles/css/dashboard/project.css'
import Arrow from "@/styles/SVG/Arrow";
import { getProjectsByUserId } from "@/service/project/Project";
import { useNavigate } from "react-router-dom";
interface Dept {
    deptId: number;
    deptName: string;
}

interface Users {
    userId: number;
    userName: string;
}

interface Project {
    projectId: number;
    projectName: string;
    deptId: number;
    dept: Dept;
    users: Users[];
}




const ProjectList:React.FC = ({}) => {
    const navigate = useNavigate();
    const [projects, setProject] = useState<Project[]>([]);
    const [projectUsers, setProjectUsers] = useState<Users[]>([]);
    const [user, setUser] = useState(() => {
        const saved = sessionStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });
    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            try {
                const list = await getProjectsByUserId(user.userId)
                setProject(list);
                console.log(list)
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);
    const colors = ["#00A6E1",
        "#FF3D00",
        "#FFC300",
        "#00B14F",
        "#FF0080",
        "#FF6600",
        "#6A0DAD",];
    const goToProjectPage =(project:Project)=>{
        navigate(`/project/info/${project.projectId}`, {state: {project}});
    }
    return (
        <div className="dashboard_project_list">
            <h2>Project({projects.length})</h2>
            <div className="project_list_ferst">
                <div className="project_plus" onClick={()=>(navigate('/project/add'))}>
                    <Plus />
                </div>
                {projects.map((project, index) => (
                    <div className="project_list" key={project.projectId} style={{ backgroundColor: colors[index % colors.length] }}>
                        <div className="project_list_dept">#{project.dept.deptName}</div>
                        <div className="project_list_arrow"onClick={()=>{goToProjectPage(project)}}><Arrow /></div>
                        <div className="project_list_title">{project.projectName}</div>
                        <div className="project_list_task">Completed Task: </div>
                        <div className="project_list_last">
                            <div className="project_list-men">work/men: <span>90</span></div>
                            <div className="project_list_member">
                                {project.users.slice(0, 2).map((user) => (
                                    <div key={user.userId}>
                                        {user.userName}
                                    </div>
                                ))}

                                {project.users.length > 2 && (
                                    <div className="more_user">
                                        + {project.users.length - 2}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectList;
