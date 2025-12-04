import axios from "axios";
import { useState, useEffect } from "react";
import "@/styles/css/dashboard/approval.css"
import { getApprovalByDeptId } from "@/service/approval/Approval";
import { useNavigate } from "react-router-dom";
interface Approval {
    approvalId: number;
    title: string;
    status: string;
    deptId: number;
}

const Approval = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        const saved = sessionStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });
    const [approval, setApproval] = useState<Approval[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const list = await getApprovalByDeptId(user.userId)
                setApproval(list);
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [])
    return (
        <div className="dashboard_approval">
            <h2>Approval</h2>
            <div className="approval_list">
                <div>No</div>
                <div><strong>Title</strong></div>
                <div>status</div>
            </div>
            <div className="dashboard_approval_content">
                {approval.slice(0,7).map((a, index) => {
                    return (
                        <div key={a.approvalId} className="approval_list" onClick={() => navigate("/approval/list", { state: { approvalId: a.approvalId } })}>
                            <div>{index + 1}</div>
                            <div><strong>{a.title}</strong></div>
                            <div>{a.status}</div>
                        </div>
                    );
                })}
            </div>

        </div>
    )
}
export default Approval;