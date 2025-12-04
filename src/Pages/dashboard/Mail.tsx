import axios from "axios";
import { useState, useEffect } from "react";
import "@/styles/css/dashboard/mail.css"
import { getMailByUserId } from "@/service/mail/Mail";
import { formatDate } from "@/components/date/FormatDate";
import { useNavigate } from "react-router-dom";
interface Mail {
    mailId: number;
    subject: string;
    body: string;
    sendAt: string;
    senderId: number;
    senderName: string;
    receiverId: number;
    receiverName: string;
}
const Mail = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        const saved = sessionStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });

    const [mail, setMail] = useState<Mail[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const list = await getMailByUserId(user.userId);
                setMail(list);
                console.log(list)
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [])
    return (
        <div className="dashboard_mail">
            <h2>Mail</h2>
            <div className="dashboard_list">
                <div>No</div>
                <div><strong>Title</strong></div>
                <div>SendAt</div>
                <div>Sender</div>
            </div>
            {mail.map((m, index) => {
                const date = new Date(m.sendAt);
                return (
                    <div key={m.mailId} className="dashboard_list" onClick={()=>{ navigate(`/mail`, {state: {m}})}}>
                        <div>{index + 1}</div>
                        <div><strong>{m.subject}</strong></div>
                        <div> {formatDate(date)}</div>
                        <div>{m.senderName}</div>
                    </div>
                )
            })}
        </div>
    )
}
export default Mail;