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
    dept?: Dept | null; // 옵셔널로 변경
}

const User = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem("jwt");
                const res = await axios.get<User[]>(
                    "http://localhost:9080/api/user",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setUsers(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>유저 목록</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.userId}>
                        {user.userName} ({user.email}) — {user.dept?.deptName ?? "부서 없음"}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default User;