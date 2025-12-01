import { getDeptsByCompanyId } from "@/service/dept/DeptList";
import { useEffect, useState } from "react";
import axios from "axios";
import { postProject } from "@/service/project/Project";
import '@/styles/css/project/projectAdd.css'
import { useNavigate } from "react-router-dom";
import MateModal from "../modals/MateModal";
interface User {
    userId: number;
    userName: string;
}

interface Dept {
    deptId: number;
    deptName: string;
    users: User[];
}

interface SelectedUser {
    userId: number;
    userName: string;
    deptName: string;
}


const ProjectAdd: React.FC = ({ }) => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("jwt");
    const [deptList, setDeptList] = useState<Dept[]>([]);
    const [selectedUserList, setSelectedUserList] = useState<SelectedUser[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [filteredDepts, setFilteredDepts] = useState<Dept[]>([]);
    const [projectName, setProjectName] = useState("");
    const [SelectedDept, setSelectedDept] = useState(0);
    const [modal,setModal] = useState(false);
    const [company, setCompany] = useState(() => {
        const saved = sessionStorage.getItem("company");
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                if (!token) return;
                const list = await getDeptsByCompanyId(company.companyId);
                setDeptList(list);
            } catch (error) {
                console.error(error);
            }
        };
        loadData();
    }, [token]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        if (value === "") {
            setFilteredDepts([]);
            return;
        }

        const filtered = deptList.filter((dept) =>
            dept.deptName.toLowerCase().startsWith(value.toLowerCase())
        );
        setFilteredDepts(filtered);
    };

    const handleSelect = (name: string, deptId: number) => {
        setInputValue(name);
        setSelectedDept(deptId);
        setFilteredDepts([]);
    };
    const save = async () => {
        const payload = {
            projectName: projectName,
            deptId: SelectedDept,
            Users: selectedUserList,
        }
        try {
            if (!token) return;
            const res = await postProject(payload);
            alert("Project added successfully");
            navigate("/project");
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="Add_Project_content">
            <div>PROJECT ADD</div>
            <div><button onClick={save}>save</button><button onClick={()=>{setModal(prev=>!prev)}}>addUser</button></div>
            <div className="Add_Project_Input" >
                <div>Project Name</div>
                <input type="text" style={{ borderRadius: "0.5vw" }} onChange={(e) => setProjectName(e.target.value)} />
            </div>

            <div className="Add_Project_Input">
                <div>Dept</div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    style={filteredDepts.length === 0 ? { borderRadius: "0.5vw" } : { borderRadius: "0.5vw 0.5vw 0 0" }}
                />
                <div></div>
                <div>
                    {filteredDepts.map((dept) => (
                        <div
                            className="Add_Project_pointer"
                            key={dept.deptId}
                            onClick={() => handleSelect(dept.deptName, dept.deptId)}
                        >
                            {dept.deptName}
                        </div>
                    ))}
                </div>
            </div>
            {modal && <MateModal setSelectedUserList={setSelectedUserList} selectedUserList={selectedUserList} setModal={setModal}/>}
        </div>
    );
};

export default ProjectAdd;
