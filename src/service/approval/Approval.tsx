import axios from "axios";

export const getApprovalByDeptId = async (deptId: number) => {
    const token = sessionStorage.getItem("jwt");
    try {
        const res = await axios.get("http://localhost:9080/api/approval", {
            headers: { Authorization: `Bearer ${token}` }, params: { deptId: deptId }
        });
        return (res.data);
    } catch (err) {
        console.error(err);
    }
};
