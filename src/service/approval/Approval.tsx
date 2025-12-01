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

export const addApproval = async (payload:any)=>{
    const token = sessionStorage.getItem("jwt");
        console.log(payload);
        try {
            const res = await axios.post(
                "http://localhost:9080/api/approval",
                { payload: payload },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            return res.data;
        } catch (error) {
            console.log(error);
        }
}
