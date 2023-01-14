

import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { faHome, faCalendar, faGraduationCap, faReceipt, faLineChart, faBullhorn, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './Sidebar.scss';

const sidebarNavItems = [
    {
        display: 'Dashboard',
        icon: <FontAwesomeIcon icon={faHome} />,
        to: '/',
        section: ''
    },

    {
        display: 'Schedule',
        icon: <FontAwesomeIcon icon={faCalendar} />,
        to: '/Schedule',
        section: 'Schedule'
    },
    {
        display: 'Courses',
        icon: <FontAwesomeIcon icon={faReceipt} />,
        to: '/Courses',
        section: 'Courses'
    },
    {
        display: 'Gradebook',
        icon: <FontAwesomeIcon icon={faGraduationCap} />,
        to: '/Gradebook',
        section: 'Gradebook'
    },
    {
        display: 'Performance',
        icon: <FontAwesomeIcon icon={faLineChart} />,
        to: '/Performance',
        section: 'Performance'
    },
    {
        display: 'Announcement',
        icon: <FontAwesomeIcon icon={faBullhorn} />,
        to: '/Announcement',
        section: 'Announcement'
    },
]

const Sidebar = ({ onCapsuleSidebar, sidebarStatus }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();
    // const [sidebarStatus, statSidebarStatus] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight || 0}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);

    }, []);

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);


    let closedSidebarStyleMenue = { 'position': 'relative', 'right': "1rem" };
    return <div className='sidebar' style={{ "height": "100vh", 'width': sidebarStatus ? '320px' : '90px' }}>
        <h2 className="sidebar__logo">
            Coligo
        </h2>
        <div ref={sidebarRef} className="sidebar__menu" style={!sidebarStatus ? closedSidebarStyleMenue : null}>
            <div
                ref={indicatorRef}
                className="sidebar__menu__indicator"
                style={{
                    transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`,
                    width: `calc(100% - ${activeIndex}px)`
                }}
            ></div>
            {
                sidebarNavItems.map((item, index) => (
                    <Link to={item.to} key={index}>
                        <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                            <div className="sidebar__menu__item__icon">
                                {item.icon}
                            </div>
                            {sidebarStatus ? <div className="sidebar__menu__item__text">
                                {item.display}
                            </div> : null}
                        </div>
                    </Link>
                ))
            }
        </div>

        <Button onClick={() => onCapsuleSidebar(!sidebarStatus)} variant="secondary"
            style={{ 'position': 'relative', 'top': '10%', left: !sidebarStatus ? 0 : '82%' }}
        >
            <FontAwesomeIcon icon={sidebarStatus ? faArrowLeft : faArrowRight} size="2x" />
        </Button>
    </div>

};

export default Sidebar;