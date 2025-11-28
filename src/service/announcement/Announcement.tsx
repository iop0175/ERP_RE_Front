import axios from "axios";

export const getAnnouncementByCompanyId = async (companyId: number) => {
    const token = sessionStorage.getItem("jwt");
    try {
        const res = await axios.get("http://localhost:9080/api/announcement", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                companyId: Number(companyId),
            },
        });
        return res.data;
    } catch (err) {
        console.error(err);
    }
};
