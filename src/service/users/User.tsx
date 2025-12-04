import axios from "axios";

export const getUserByCompanyId = async (companyId:string) => {
  const token = sessionStorage.getItem("jwt");
  try {
    const res = await axios.get("http://localhost:9080/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },params:{ companyId}
    });
    return await res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllUsers = async ()=>{
  const token = sessionStorage.getItem("jwt");
  try {
    const res = await axios.get("http://localhost:9080/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return await res.data;
  } catch (error) {
    console.log(error);
  }
}
