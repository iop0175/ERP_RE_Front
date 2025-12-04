import { addApproval } from "@/service/approval/Approval";
import { JSX, useEffect, useState } from "react";
import "@/styles/css/pages/approval/approval.css"
import ReferenceModal from "../../modals/ReferenceModal";
import Annual from "./Annual";
import Purchase from "./Purchase";
import Business from "./Business";
import { useNavigate } from "react-router-dom";
import ApprovalLineModal from "@/Pages/modals/ApprovalLineModal";
import AddUser from "@/styles/SVG/AddUser";
import Cross from "@/styles/SVG/Cross";
interface SelectedUser {
    userId: number;
    userName: string;
    deptName: string;
}
interface ApprovalLine {
    approverId: number;
    approvalType: number;
}
interface PurchaseItem {
    itemName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    spec?: string;
    note?: string;
}

interface PurchaseDetail {
    items: PurchaseItem[];
    reason: string;
    vendor: string;
    memo: string;
}

const status = [
    { status: "Review" },
    { status: "Approval" },
    { status: "Authorization" },
]
const approvalTypes = [
    { title: "Annual Leave", desc: "Employee-requested time off." },
    { title: "Business Trip", desc: "Work-related travel outside the office." },
    { title: "Purchase Order", desc: "Official company order for goods or services." }
];
const Approval = () => {
    const navigate = useNavigate();
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
    const [annualData, setAnnualData] = useState({
        startDate: new Date,
        endDate: new Date,
        totalDate: 0,
        reason: "",
    });
    const [businessData, setBusinessData] = useState({
        destination: "",
        purpose: "",
        startDate: new Date,
        endDate: new Date,
        estimatedCost: 0,
        transportation: "",
        memo: ""
    });
    const [purchaseData, setPurchaseData] = useState<PurchaseDetail>({
        items: [],
        reason: "",
        vendor: "",
        memo: ""
    });

    const approvalComponents: Record<number, JSX.Element> = {
        0: <Annual setAnnualData={setAnnualData} />,
        1: <Business setBusinessData={setBusinessData} />,
        2: <Purchase setPurchaseData={setPurchaseData} />
    };
    useEffect(() => {
        const userLines = selectedUserList.map((user, index) => {
            let approvalType: number;
            const len = selectedUserList.length;

            if (len >= 3) approvalType = index;
            else if (len === 2) approvalType = index + 1;
            else approvalType = 2;

            return {
                approverId: Number(user.userId),
                approvalType,
            };
        });

        const rfLines = selectedRfUserList.map((user, index) => ({
            approverId: Number(user.userId),
            approvalType: 9,
        }));

        setApprovalLines([...userLines, ...rfLines]);
    }, [selectedUserList, selectedRfUserList]);

    const payload = {
        requestUserId: user.userId,
        deptId: user.deptId,
        title: title,
        approvalCode: code,
        approverIds: approvalLines,
        detailData: {},
    }

    const save = async () => {
        
        let finalPayload = { ...payload };

        switch (code) {
            case 0:
                finalPayload = {
                    ...payload,
                    detailData: annualData
                };
                break;

            case 1:
                finalPayload = {
                    ...payload,
                    detailData: businessData
                };
                break;

            case 2:
                finalPayload = {
                    ...payload,
                    detailData: purchaseData
                };
                break;
        }
        addApproval(finalPayload);
    };
    return (
        <div className="Approval_continer">
            <div>
                <div className="Approval_Title">Approval List</div>
                <div className="Approval_List">
                    {approvalTypes.map((item, index) => (
                        <div key={index} onClick={() => setCode(index)} className="Approval_exmapls">
                            <strong>{item.title}</strong>
                            <div>{item.desc}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="Approval_info">
                <div className="Approval_Title">New Approval</div>
                <div className="Approval_Content">
                    <div>Type: <strong>{approvalTypes[code].title}</strong></div>
                    <div>Description: {approvalTypes[code].desc}</div>
                    <div className="Approval_Inputs"><div>Title</div> <input type="text" onChange={(e) => setTitle(e.target.value)} /></div>
                    <div className="Approval_Btns">
                        <button onClick={() => setModal(prev => !prev)}><AddUser/>Add Approval</button>
                        <button onClick={() => setRfModal(prev => !prev)}><AddUser/>Add Reference</button>
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
                    <div className="saveBtn">
                        <button onClick={save}>Save</button>
                        <button onClick={() => navigate("../list")}>cancel</button>
                    </div>
                </div>
            </div>
            {modal && <ApprovalLineModal selectedUserList={selectedUserList} setSelectedUserList={setSelectedUserList} setModal={setModal} />}
            {rfmodal && <ReferenceModal selectedUserList={selectedRfUserList} setSelectedUserList={setSelectedRfUserList} setRfModal={setRfModal} />}
        </div>
    );
}
export default Approval;

