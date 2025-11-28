import axios from "axios";

export const getMailByUserId = async (userId: number) => {
    const token = sessionStorage.getItem("jwt");
    try {
        const res = await axios.get("http://localhost:9080/api/mail", {
            headers: { Authorization: `Bearer ${token}` }, params: { userId: userId }
        });
        return (res.data);
    } catch (err) {
        console.error(err);
    }
};
