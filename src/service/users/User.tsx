import axios from "axios";

export const getUserByCompanyId = async (token: string,companyId:string) => {
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
