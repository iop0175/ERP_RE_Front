import "@/styles/css/pages/approval/Annual.css"
import { useEffect, useState } from "react";
const Annual = () => {
    const [user, setUser] = useState(() => {
        const saved = sessionStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;

    });
    const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [totalDate, setTotalDate] = useState(0);

  useEffect(() => {
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if(diffDays < 0){
        alert("The end date cannot be earlier than the start date.");
        setTotalDate(0);
    }else{
        setTotalDate(diffDays);
    }
  }, [startDate, endDate]);
    return (
        <div className="Annual">
            <div className="Annual_Name"><div>Employee Name</div><input type="text" value={user.userName} /></div>
            <div className="Annual_Dept"><div>Dept</div><input type="text" value={user.deptName} /></div>
            <div className="Annual_StartDate"><div>Start Date</div><input type="date" onChange={(e)=>{setStartDate(new Date(e.target.value))}}/></div>
            <div className="Annual_EndDate"><div>End Date</div><input type="date" onChange={(e)=>{setEndDate(new Date(e.target.value))}}/></div>
            <div className="Annual_TotalDate"><div>Total Date</div><input type="text" value={totalDate} readOnly/></div>
            <div className="Annual_Reason"><div>Reason</div><input type="text" /></div>
        </div>
    )
}
export default Annual;