import axios from "axios";
import { useState, useEffect } from "react";
import Plus from "@/styles/SVG/Plus";
import '@/styles/css/dashboard/project.css'
import Arrow from "@/styles/SVG/Arrow";
import { getProjectsByUserId } from "@/service/project/Project";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Controller } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import LeftArrow from "@/styles/SVG/LeftArrow";
import RightArrow from "@/styles/SVG/RightArrow";

interface Dept {
    deptId: number;
    deptName: string;
}

interface Users {
    userId: number;
    userName: string;
}

interface Project {
    projectId: number;
    projectName: string;
    deptId: number;
    dept: Dept;
    users: Users[];
}

const ProjectList: React.FC = ({ }) => {
    const navigate = useNavigate();
    const [projects, setProject] = useState<Project[]>([]);
    const [user, setUser] = useState(() => {
        const saved = sessionStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });
    
    const [firstSwiper, setFirstSwiper] = useState<SwiperType | null>(null);
    const [secondSwiper, setSecondSwiper] = useState<SwiperType | null>(null);
    
    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            try {
                const list = await getProjectsByUserId(user.userId)
                setProject(list);
                console.log(list)
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);
    
    const slideNum = Math.ceil(projects.length / 2);
    
    const colors = [
        "#00A6E1",
        "#FF3D00",
        "#FFC300",
        "#00B14F",
        "#FF0080",
        "#FF6600",
        "#6A0DAD",
    ];
    
    const goToProjectPage = (project: Project) => {
        navigate(`/project/info/${project.projectId}`, { state: { project } });
    }
    
    // 커스텀 네비게이션 핸들러
    const handlePrev = () => {
        if (firstSwiper) firstSwiper.slidePrev();
    };
    
    const handleNext = () => {
        if (firstSwiper) firstSwiper.slideNext();
    };
    
    return (
        <div className="dashboard_project_list">
            <div className="project_header">
                <h2>Project({projects.length})</h2>
                
            </div>
            
            <div className="project_list_ferst">
                <Swiper
                    modules={[Autoplay, Controller]}
                    navigation={false}
                    rewind={true}
                    spaceBetween={20}
                    slidesPerView={4}
                    onSwiper={setFirstSwiper}
                    controller={{ control: secondSwiper }}
                    autoplay={{
                        delay: 4500,
                        disableOnInteraction: false,
                    }}
                    speed={500}
                >
                    <SwiperSlide className="plusSlide">
                        <div className="project_plus" onClick={() => navigate('/project/add')}>
                            <Plus />
                        </div>
                    </SwiperSlide>
                    {projects.slice(0, slideNum).map((project, index) => (
                        <SwiperSlide key={project.projectId}>
                            <div className="project_list" style={{ backgroundColor: colors[index % colors.length] }}>
                                <div className="project_list_dept">#{project.dept.deptName}</div>
                                <div className="project_list_arrow" onClick={() => goToProjectPage(project)}>
                                    <Arrow />
                                </div>
                                <div className="project_list_title">{project.projectName}</div>
                                <div className="project_list_task">Completed Task: </div>
                                <div className="project_list_last">
                                    <div className="project_list-men">work/men: <span>90</span></div>
                                    <div className="project_list_member">
                                        {project.users.slice(0, 2).map((user) => (
                                            <div key={user.userId}>{user.userName}</div>
                                        ))}
                                        {project.users.length > 2 && (
                                            <div className="more_user">+ {project.users.length - 2}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <Swiper
                    modules={[Controller]}
                    navigation={false}
                    rewind={true}
                    spaceBetween={20}
                    slidesPerView={4}
                    onSwiper={setSecondSwiper}
                    controller={{ control: firstSwiper }}
                    speed={500}
                    className="lastSlid"
                >
                    {projects.slice(slideNum).map((project, index) => (
                        <SwiperSlide key={project.projectId}>
                            <div className="project_list" style={{ backgroundColor: colors[(index + slideNum) % colors.length] }}>
                                <div className="project_list_dept">#{project.dept.deptName}</div>
                                <div className="project_list_arrow" onClick={() => goToProjectPage(project)}>
                                    <Arrow />
                                </div>
                                <div className="project_list_title">{project.projectName}</div>
                                <div className="project_list_task">Completed Task: </div>
                                <div className="project_list_last">
                                    <div className="project_list-men">work/men: <span>90</span></div>
                                    <div className="project_list_member">
                                        {project.users.slice(0, 2).map((user) => (
                                            <div key={user.userId}>{user.userName}</div>
                                        ))}
                                        {project.users.length > 2 && (
                                            <div className="more_user">+ {project.users.length - 2}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="custom_navigation">
                    <button className="custom_prev" onClick={handlePrev}>
                        <LeftArrow/>
                    </button>
                    <button className="custom_next" onClick={handleNext}>
                        <RightArrow/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectList;