import { getDeptsByCompanyId } from "@/service/dept/DeptList";
import { useState, useEffect } from "react";
import "@/styles/css/ui/MateModal.css"

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

interface ModalProps {
    selectedUserList: SelectedUser[];
    setSelectedUserList: React.Dispatch<React.SetStateAction<SelectedUser[]>>;
    setModal:React.Dispatch<React.SetStateAction<boolean>>;
}

const MateModal: React.FC<ModalProps> = ({ selectedUserList, setSelectedUserList,setModal }) => {
    const [deptList, setDeptList] = useState<Dept[]>([]);
    const [company, setCompany] = useState(() => {
        const saved = sessionStorage.getItem("company");
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                const list = await getDeptsByCompanyId(company.companyId);
                setDeptList(list);
            } catch (error) {
                console.error(error);
            }
        };
        loadData();
    }, []);

    const handleSelectUser = (user: User, deptName: string) => {
        if (!selectedUserList.some(u => u.userId === user.userId)) {
            setSelectedUserList([...selectedUserList, { ...user, deptName }]);
        }
    };

    const handleRemoveUser = (userId: number) => {
        setSelectedUserList(selectedUserList.filter(u => u.userId !== userId));
    };

    const handleSelectDeptUsers = (dept: Dept) => {
        const newUsers = dept.users
            .filter(user => !selectedUserList.some(u => u.userId === user.userId))
            .map(user => ({ ...user, deptName: dept.deptName }));

        setSelectedUserList([...selectedUserList, ...newUsers]);
    };

    return (
        <div className="modal_Back">
            <div className="Mate_modal_content">
                <div className="Mate_modal_btns">
                    <button onClick={()=>{setModal(prev=>!prev)}}>x</button>
                </div>

                <div className="Mate_modal_mate">
                    {/* All Users */}
                    <div>
                        <div>All Users</div>
                        {deptList.map((dept) => (
                            <div key={dept.deptId}>
                                <ul>
                                    <strong onClick={() => handleSelectDeptUsers(dept)}>
                                        {dept.deptName} (Click to add all)
                                    </strong>

                                    {dept.users
                                        .filter(user => !selectedUserList.some(u => u.userId === user.userId))
                                        .map((user) => (
                                            <li
                                                key={user.userId}
                                                className="Mate_modal_pointer"
                                                onClick={() => handleSelectUser(user, dept.deptName)}
                                            >
                                                {user.userName}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Selected Users */}
                    <div>
                        <div>Selected Users</div>
                        <ul>
                            {selectedUserList.map((user) => (
                                <li
                                    key={user.userId}
                                    className="Mate_modal_pointer"
                                    onClick={() => handleRemoveUser(user.userId)}
                                >
                                    {user.userName} ({user.deptName})
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MateModal;
