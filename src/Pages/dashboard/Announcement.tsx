import axios from "axios";
import { useEffect, useState } from "react";
import "@/styles/css/dashboard/announcement.css"
import { getAnnouncementByCompanyId } from "@/service/announcement/Announcement";
import { formatDateNoTime } from "@/components/date/FormatDate";
interface Announcement {
    announcementId: number;
    title: string;
    content: string;
    createdAt: string;
    companyId: number;
}

const Announcement = () => {
    const [company, setCompany] = useState(() => {
        const savedCompany = sessionStorage.getItem("company");
        return savedCompany ? JSON.parse(savedCompany) : null;
    });
    const [announcements, setAnnouncement] = useState<Announcement[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const list = await getAnnouncementByCompanyId(company.companyId)
                setAnnouncement(list);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="dashboard_announcement">
            <h2>Announcement</h2>
            <div className="announcement_content">
                <div className="announcement_list">
                    <div>No</div>
                    <div><strong>Title</strong></div>
                    <div>createdAt</div>
                </div>
                {announcements.map((a, index) => {
                    const date = new Date(a.createdAt);

                    return (
                        <div className="announcement_list" key={a.announcementId}>
                            <div>{index + 1}</div>
                            <div><strong>{a.title}</strong></div>
                            <div>{formatDateNoTime(date)}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Announcement;