import { useEffect, useState } from "react";
import "@/styles/css/pages/approval/Business.css"
interface BusinessProps {
    setBusinessData: (data: {
        destination: string;
        purpose: string;
        startDate: Date;
        endDate: Date;
        estimatedCost: number;
        transportation: string;
        memo: string;
    }) => void;
}

const Business: React.FC<BusinessProps> = ({ setBusinessData }) => {

    const [title, setTitle] = useState("");
    const [destination, setDestination] = useState("");
    const [purpose, setPurpose] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [estimatedCost, setEstimatedCost] = useState(0);
    const [transportation, setTransportation] = useState("");
    const [memo, setMemo] = useState("");

    useEffect(() => {
        setBusinessData({
            destination,
            purpose,
            startDate,
            endDate,
            estimatedCost,
            transportation,
            memo
        });
    }, [title, destination, purpose, startDate, endDate, estimatedCost, transportation, memo]);

    return (
        <div className="business">

            <div>
                <div>Destination</div>
                <input type="text" onChange={(e) => setDestination(e.target.value)} />
            </div>

            <div>
                <div>Purpose</div>
                <input type="text" onChange={(e) => setPurpose(e.target.value)} />
            </div>

            <div>
                <div>Start Date</div>
                <input type="date" onChange={(e) => setStartDate(new Date(e.target.value))} />
            </div>

            <div>
                <div>End Date</div>
                <input type="date" onChange={(e) => setEndDate(new Date(e.target.value))} />
            </div>

            <div>
                <div>Estimated Cost</div>
                <input type="number" onChange={(e) => setEstimatedCost(Number(e.target.value))} />
            </div>

            <div>
                <div>Transportation</div>
                <input type="text" onChange={(e) => setTransportation(e.target.value)} />
            </div>

            <div>
                <div>Memo</div>
                <input type="text" onChange={(e) => setMemo(e.target.value)} />
            </div>
        </div>
    );
};

export default Business;
