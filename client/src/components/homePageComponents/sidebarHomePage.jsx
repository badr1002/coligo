import React from 'react';

import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'; import './sidebarHomePage.scss';
import { faHourglassHalf,faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const SidebarHomePage = () => {
    return (
        <div className='sidebar-home-page'>
            <Row>
                <Col lg='10'>
                    <h1 className='sidebarTitle'>What's due</h1>
                </Col>
                <Col lg='2'>
                    <Link className='allSidebarLink'>All</Link>
                </Col>
                <Col lg='12' style={{ 'margin': '3rem' }}>
                    <Row>
                        <Col lg='12'>
                            <h3>   <FontAwesomeIcon icon={faHourglassHalf} size='1x' className='icons' />Quiz</h3>
                            <Link className='btn btn-outline-success' to={'/Schedule'}>Start Quiz</Link>
                        </Col>
                        <Col lg='12' className='mt-5'>
                            <h3> <FontAwesomeIcon icon={faCalendarCheck} size='1x' className='icons' /> Assignment</h3>
                            <Link className='btn btn-outline-success' to={'/Schedule'}>Solve Assignment</Link>
                        </Col>
                   </Row>
                </Col>
            </Row>
        </div>
    )
}

export default SidebarHomePage