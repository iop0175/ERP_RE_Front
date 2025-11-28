import axios from "axios";
import { useState, useEffect } from "react";

// 부서와 유저 타입 정의
interface User {
    userId: number;
    userName: string;
    email: string;
    password: string;
    class: number;
    deptId: number;
}

interface Dept {
    deptId: number;
    deptName: string;
    users: User[];
}

const DeptComponent = () => {
    const [depts, setDepts] = useState<Dept[]>([]); // 타입 지정

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem("jwt");
                const res = await axios.get<Dept[]>("http://localhost:9080/api/dept", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDepts(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>부서 및 유저 목록</h2>
            <ul>
                {depts.map((dept) => (
                    <li key={dept.deptId}>
                        <strong>{dept.deptName}</strong> ({dept.users.length}명)
                        {dept.users.length > 0 && (
                            <ul>
                                {dept.users.map((user) => (
                                    <li key={user.userId}>
                                        {user.userName} ({user.email})
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DeptComponent;