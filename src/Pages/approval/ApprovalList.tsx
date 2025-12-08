import { getApprovalByDeptId, putApproval } from "@/service/approval/Approval";
import { useEffect, useState } from "react";
import "@/styles/css/pages/approval/approval.css"
import { formatDate } from "@/components/date/FormatDate";
import { useLocation, useNavigate } from "react-router-dom";
import PageLoading from "../modals/PageLoading";
interface Approval {
    approvalId: number;
    title: string;
    status: number;
    ApprovalCode: number;
    requestUserId: number;
    requestAt: string;
    deptId: number;
}

interface ApprovalLine {
    lineId: number;
    approvalId: number;
    approverId: number;
    approvalOrder: number;
    approvalType: number;
    status: number;
    approvedAt: string;
    comment: string;
}
interface Users {
    userId: number;
    userName: string;
}

interface ApprovalWithRelations extends Approval {
    requestUser: Users; // 요청자
    approvalLines: (ApprovalLine & {
        approver: Users; // 결재자
    })[];
}
const ApprovalStatus: Record<number, string> = {
    0: "Waiting",
    1: "Pending",
    2: "Approved",
    3: "Rejected",
};
const ApprovalType: Record<number, string> = {
    0: "Review",
    1: "Approval",
    2: "Authorization",
    3: "Agreement",
    9: "Reference"
}
const Approval = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { approvalId } = location.state || {};
    const [user, setUser] = useState(() => {
        const saved = sessionStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });

    const [approvalList, setApprovalList] = useState<ApprovalWithRelations[]>([]);
    const [selectedApprovalId, setSelectedApprovalId] = useState<number>(approvalId || 0);
    const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 추가

    const selectedApproval = approvalList.find(a => a.approvalId === selectedApprovalId) || null;

    useEffect(() => {
        if (approvalList.length > 0 && approvalId) {
            setSelectedApprovalId(approvalId);
        }
    }, [approvalList, approvalId]);


    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            setLoading(true); // 로딩 시작
            try {
                const list = await getApprovalByDeptId(user.userId);
                setApprovalList(list);
            } catch (err) {
                console.error("Approval fetch error:", err);
            } finally {
                setLoading(false); // 로딩 종료
            }
        };

        fetchData();
    }, [user]);
    const ApprovalLine = async (line: any,status:Number) => {
        try {
            const updated = { ...line, status: status };
            const refreshed = await putApproval(updated);
            console.log(refreshed);
            setApprovalList(refreshed);

            alert("Approval!!");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {!loading && <div className="Approval_continer">
                <div>
                    <div className="Approval_Title">Approval List</div>
                    <div className="Approval_List">
                        {loading ? (
                            <div>Loading approvals...</div>
                        ) : approvalList.length === 0 ? (
                            <div>No approvals found.</div>
                        ) : (
                            approvalList.map(item => (
                                <div
                                    key={item.approvalId}
                                    className="Approval_Item"
                                    onClick={() => setSelectedApprovalId(item.approvalId)}
                                >
                                    <div className="Approval_Item_Title">{item.title}</div>
                                    <div>Request User: {item.requestUser.userName}</div>
                                    <div>Status: {ApprovalStatus[item.status]}</div>
                                    <div>requestAt: {formatDate(new Date(item.requestAt))}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="Approval_info">
                    <div className="Approval_Title">Approval Info</div>
                    <div className="Approval_Content">
                        <button onClick={() => navigate("../add")}>New Approval</button>
                        {loading ? (
                            <div>Loading approval details...</div>
                        ) : selectedApproval ? (
                            <div className="Approval_info_data">
                                <div>{selectedApproval.title}</div>
                                <div>{selectedApproval.requestUser.userName}</div>
                                <div>{formatDate(new Date(selectedApproval.requestAt))}</div>
                                <div>{ApprovalStatus[selectedApproval.status]}</div>
                                <div>
                                    {Object.entries(ApprovalType).map(([type, label]) => {
                                        const lines = selectedApproval.approvalLines.filter(
                                            line => line.approvalType === Number(type)
                                        );
                                        if (lines.length === 0) return null;
                                        if (type == String(9)) return null;
                                        return (
                                            <div key={type}>
                                                <strong>{label}</strong>
                                                {lines.map(line => (
                                                    <div key={line.lineId}>
                                                        <div>{line.approver.userName}</div>
                                                        <div>{ApprovalStatus[line.status]}</div>
                                                        {user.userId == line.approver.userId && line.status === 1 && selectedApproval.status != 3 && 
                                                        <div><button onClick={() => ApprovalLine(line,2)}>Approval</button><button onClick={() => ApprovalLine(line,3)}>Rejected</button></div>}
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div>
                                    {Object.entries(ApprovalType).map(([type, label]) => {
                                        const lines = selectedApproval.approvalLines.filter(
                                            line => line.approvalType === Number(type)
                                        );
                                        if (lines.length === 0) return null;
                                        if (type != String(9)) return;
                                        return (
                                            <div key={type}>
                                                <strong>{label}</strong>
                                                <div style={{ display: "flex" }}>
                                                    {lines.map(line => (
                                                        <div key={line.lineId} style={{ marginRight: "2%" }}>
                                                            {line.approver.userName}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div>Please select an approval.</div>
                        )}
                    </div>
                </div>
            </div>}
            {loading && <PageLoading />}
        </>
    );
};


export default Approval;