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

export const postMailAdd = async (payload: any) => {
    const token = sessionStorage.getItem("jwt");
    console.log(payload)
    try {
        const res = await axios.post("http://localhost:9080/api/mail", 
            {payload:payload},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }})
        return (res.data);
    } catch (err) {
        console.error(err);
    }
}
