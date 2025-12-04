import { Routes, Route } from "react-router-dom";
import ApprovalAdd from "./add/ApprovalAdd";
import ApprovalList from "./ApprovalList";
const Approval = () => {
    return (
        <Routes>
            <Route path="add" element={<ApprovalAdd />} />
            <Route path="list/*" element={<ApprovalList />} />
        </Routes>
    )
}
export default Approval;