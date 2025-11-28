import axios from "axios";
import { useEffect, useState } from "react";
interface Dept {
    deptId: number;
    deptName: string;
}

interface User {
    userId: number;
    userName: string;
    email: string;
    password: string;
    class: number;
    deptId: number | null;
    dept?: Dept | null;
}



const UserList = () => {
    const [user, setUser] = useState(() => {
        const saved = sessionStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });
    const [myUser, setMyUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;

            try {
                const token = sessionStorage.getItem("jwt");
                const res = await axios.get<User>(
                    "http://localhost:9080/api/user",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        params: { userId: user.userId },
                    }
                );
                setMyUser(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [user]);

    return (
        <div>
            <h2>내정보</h2>
            <ul>
                {myUser && (
                    <>
                        <li>이름: {myUser.userName}</li>
                        <li>이메일: {myUser.email}</li>
                        <li>부서: {myUser.dept?.deptName ?? "부서 없음"}</li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default UserList;
