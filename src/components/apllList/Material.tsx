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

const Material =()=>{
    const [materials, setMaterial] = useState<Material[]>([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem("jwt");
                const res = await axios.get<Material[]>("http://localhost:9080/api/material", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMaterial(res.data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [])
    return(
        <div>
            <h2>자재 목록</h2>
            {materials.map((material) => (
                    <li key={material.materialId}>
                        자재명:{material.materialName}({material.quantity}{material.unit}) 상태:{material.status}
                    </li>
                ))}
        </div>
    )
}
export default Material;