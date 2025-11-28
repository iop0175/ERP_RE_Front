
import Announcement from "./Announcement";
import Approval from "./Approval";
import Calendar from "./Calendar";
import Mail from "./Mail";
import ProjectList from "./Project";
import '@/styles/css/dashboard.css'

const Dashboard:React.FC = ({}) => {
    return (
        <div>
            <div className="dashboard_container">
                <div className="dashboard_title">Dashboard</div>
            </div>
            <div className="dashboard_container">
                <div className="dashboard_content">
                    <ProjectList />
                </div>
                <div className="dashboard_content">
                    <div className="dashboard_calendar">
                        <Calendar/>
                    </div>
                </div>
            </div>
            <div className="dashboard_container">
                <div className="dashboard_content">
                    <Announcement />
                </div>
                <div className="dashboard_content">
                    <Mail />
                </div>
                <div className="dashboard_content">
                    <Approval />
                </div>
            </div>
        </div>
    )
}
export default Dashboard;