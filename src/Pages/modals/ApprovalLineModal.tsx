import { getDeptsByCompanyId } from "@/service/dept/DeptList";
import { useState, useEffect } from "react";
import "@/styles/css/ui/MateModal.css"
import Cross from "@/styles/SVG/Cross";

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
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const MateModal: React.FC<ModalProps> = ({ selectedUserList, setSelectedUserList, setModal }) => {
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
        console.log(selectedUserList.length)
        if (selectedUserList.length == 3) {
            alert("Max selecterd user")
            return;
        }
        if (!selectedUserList.some(u => u.userId === user.userId)) {
            setSelectedUserList([...selectedUserList, { ...user, deptName }]);
        }
    };

    const handleRemoveUser = (userId: number) => {
        setSelectedUserList(selectedUserList.filter(u => u.userId !== userId));
    };

    return (
        <div className="modal_Back">
            <div className="Mate_modal_content">
                <div className="Mate_modal_btns">
                    <button onClick={() => { setModal(prev => !prev) }}><Cross/></button>
                </div>

                <div className="Mate_modal_mate">
                    <div >
                        <div className="Mate_modal_List_title">All Users</div>
                        {deptList.map((dept) => (
                            <div key={dept.deptId}>
                                <div>
                                    <strong>
                                        Dept Name: {dept.deptName}
                                    </strong>

                                    {dept.users
                                        .filter(user => !selectedUserList.some(u => u.userId === user.userId))
                                        .map((user) => (
                                            <div
                                                key={user.userId}
                                                className="Mate_modal_pointer"
                                                onClick={() => handleSelectUser(user, dept.deptName)}
                                            >
                                                {user.userName}
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className="Mate_modal_List_title">Selected Users</div>
                        <div>
                            {selectedUserList.map((user) => (
                                <div
                                    key={user.userId}
                                    className="Mate_modal_pointer"
                                    onClick={() => handleRemoveUser(user.userId)}
                                >
                                    {user.userName} ({user.deptName})
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MateModal;
