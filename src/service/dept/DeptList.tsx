import axios from "axios";

export const getDeptsByCompanyId = async (token: string, companyId: number) => {
    try {
        const res = await axios.get("http://localhost:9080/api/dept", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                companyId: Number(companyId),
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
