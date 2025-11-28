import axios from "axios";

export const postProject = async (payload: any) => {
    const token = sessionStorage.getItem("jwt");
    try {
        const res = await axios.post(
            "http://localhost:9080/api/project",
            payload,
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
};
export const getProjectsByUserId = async (userId: string) => {
    const token = sessionStorage.getItem("jwt");
    try {
        const res = await axios.get("http://localhost:9080/api/project", {
            headers: { Authorization: `Bearer ${token}` }, params: { userId: userId }
        });
        return (res.data);
    } catch (err) {
        console.error(err);
    }
}