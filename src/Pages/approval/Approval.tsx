import { addApproval } from "@/service/approval/Approval";
import { JSX, useEffect, useState } from "react";
import "@/styles/css/pages/approval/approval.css"
import MateModal from "../modals/MateModal";
import ReferenceModal from "../modals/ReferenceModal";
import Annual from "./Annual";
import Purchase from "./Purchase";
import Business from "./Business";
interface SelectedUser {
    userId: number;
    userName: string;
    deptName: string;
}
interface ApprovalLine {
    approverId: number;
    approvalType: number;
}
const status = [
    { status: "Review" },
    { status: "Approval" },
    { status: "Authorization" },
]
const approvalTypes = [
    { title: "Annual Leave", desc: "Employee-requested time off." },
    { title: "Purchase Order", desc: "Official company order for goods or services." },
    { title: "Business Trip", desc: "Work-related travel outside the office." },
];
const approvalComponents: Record<number, JSX.Element> = {
    0: <Annual />,
    1: <Purchase />,
    2: <Business />
};
const Approval = () => {
    const [code, setCode] = useState(0);
    const [title, setTitle] = useState("");
    const [approvalLines, setApprovalLines] = useState<ApprovalLine[]>([]);
    const [selectedUserList, setSelectedUserList] = useState<SelectedUser[]>([]);
    const [selectedRfUserList, setSelectedRfUserList] = useState<SelectedUser[]>([]);
    const [modal, setModal] = useState(false);
    const [rfmodal, setRfModal] = useState(false);
    const [user, setUser] = useState(() => {
        const saved = sessionStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });
    useEffect(() => {
        const lines: ApprovalLine[] = [
            ...selectedUserList.map((user, index) => ({
                approverId: Number(user.userId),
                approvalType: Number(index)
            })),
            ...selectedRfUserList.map((user) => ({
                approverId: Number(user.userId),
                approvalType: 9
            }))];

        setApprovalLines(lines);
        console.log(lines);
    }, [selectedUserList, selectedRfUserList]);
    const payload = {
        requestUserId: user.userId,
        deptId: user.deptId,
        title: title,
        approvalCode: code,
        approverIds: approvalLines
    }

    const save = async () => {
        addApproval(payload);
    }
    return (
        <div className="Approval_continer">
            <div>
                <div className="Approval_Title">Approval List</div>
                <div className="Approval_List">
                    {approvalTypes.map((item, index) => (
                        <div key={index} onClick={() => setCode(index)}>
                            <strong>{item.title}</strong>
                            <div>{item.desc}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <div className="Approval_Title">New Approval</div>
                <div className="Approval_Content">
                    <div>Type: <strong>{approvalTypes[code].title}</strong></div>
                    <div>Description: {approvalTypes[code].desc}</div>
                    <div className="Approval_Inputs">Title: <input type="text" onChange={(e) => setTitle(e.target.value)} /></div>
                    <div className="Approval_Btns">
                        <button onClick={() => setModal(prev => !prev)}>Add Approval User</button>
                        <button onClick={() => setRfModal(prev => !prev)}>Add Reference User</button>
                        <button onClick={save}>Save</button>
                    </div>
                    <div className="Approval_Users">
                        <div>
                            <div>User List</div>
                            {selectedUserList.map((m, index) => {
                                let step = "";

                                if (selectedUserList.length === 1) {
                                    step = "Authorization";
                                } else if (selectedUserList.length === 2) {
                                    step = index === 0 ? "Approval" : "Authorization";
                                } else if (selectedUserList.length >= 3) {
                                    step = index === 0 ? "Review" : index === 1 ? "Approval" : "Authorization";
                                }

                                return (
                                    <div key={m.userId} className="approval-user-item">
                                        <div>{step}</div>
                                        <div>{m.userName}</div>
                                    </div>
                                );
                            })}
                        </div>
                        <div>
                            <div>Refernce List</div>
                            <div>
                                {selectedRfUserList.map((m) => (
                                    <div key={m.userId}>{m.userName}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            {approvalComponents[code] || <div>Select an approval type</div>}
                        </div>
                    </div>
                </div>
            </div>
            {modal && <MateModal selectedUserList={selectedUserList} setSelectedUserList={setSelectedUserList} setModal={setModal} />}
            {rfmodal && <ReferenceModal selectedUserList={selectedRfUserList} setSelectedUserList={setSelectedRfUserList} setRfModal={setRfModal} />}
        </div>
    );
}
export default Approval;

