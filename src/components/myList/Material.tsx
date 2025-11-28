import axios from "axios";
import { useState, useEffect } from "react";

interface Material {
    materialId: number;
    materialName: string;
    quantity: number;
    unit: string;
    status: string;
    projectId: number;
}

const MaterialList = () => {
    const [user, setUser] = useState(() => {
        const saved = sessionStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });
    const [materials, setMaterials] = useState<Material[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!user || !user.deptId) return;

            try {
                const token = sessionStorage.getItem("jwt");
                const res = await axios.get<Material[]>(
                    "http://localhost:9080/api/material",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        params: { deptId: user.deptId }
                    }
                );
                setMaterials(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [user]);

    return (
        <div>
            <h2>자재 목록</h2>
            <ul>
                {materials.map((material) => (
                    <li key={material.materialId}>
                        자재명: {material.materialName} ({material.quantity}{material.unit}) 상태: {material.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MaterialList;