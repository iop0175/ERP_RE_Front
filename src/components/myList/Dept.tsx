import axios from "axios";
import React, { useState, useEffect } from "react";

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
    const [user, setUser] = useState(() => {
        const saved = sessionStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });
    const [depts, setDepts] = useState<Dept[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!user || !user.deptId) return;

            try {
                const token = sessionStorage.getItem("jwt");
                const res = await axios.get<Dept[]>(
                    "http://localhost:9080/api/dept",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        params: { deptId: user.deptId } // user의 deptId 기준
                    }
                );
                setDepts(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [user]); // user가 바뀌면 다시 fetch

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