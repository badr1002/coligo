import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './announcement.scss';


let annArr = [
    {
        name: 'Badr Helal',
        title: 'Math1',
        message:'Hello edfkblnqwekdfkbnlw.dfd hjfbv dhfndg kfeb fdjvbkjefb fejhbjdfdn'        
    },
    {
        name: 'Badr Helal',
        title: 'Math1',
        message:'Hello edfkblnqwekdfkbnlw.dfd hjfbv dhfndg kfeb fdjvbkjefb fejhbjdfdn'        
    },
    {
        name: 'Badr Helal',
        title: 'Math1',
        message:'Hello edfkblnqwekdfkbnlw.dfd hjfbv dhfndg kfeb fdjvbkjefb fejhbjdfdn'        
    },
    {
        name: 'Badr Helal',
        title: 'Math1',
        message:'Hello edfkblnqwekdfkbnlw.dfd hjfbv dhfndg kfeb fdjvbkjefb fejhbjdfdn'        
    },
    {
        name: 'Badr Helal',
        title: 'Math1',
        message:'Hello edfkblnqwekdfkbnlw.dfd hjfbv dhfndg kfeb fdjvbkjefb fejhbjdfdn'        
    },
]

const Announcement = () => {
    return (
        <div className='announcement' style={{ 'overflow': 'hidden' }}>
            <Row>
                <Col lg='11'>
                    <h1 className='announcementTitle'>Announcements</h1>
                </Col>
                <Col lg=''>
                    <Link className='allAnnouncementLink'>All</Link>
                </Col>
                <Col lg='12' style={{ 'margin': '3rem' }}>
                    {annArr.map(a => (
                        <Container>
                            <Row>
                                <Col lg='2'>
                                    <FontAwesomeIcon icon={faUser} size='2x' className='icons' />
                                </Col>
                                <Col lg='3'>
                                    <h1>{a.name}</h1>
                                    <p>{a.title}</p>
                                </Col>
                                <Col lg='7'>{a.message}</Col>
                            </Row>
                        </Container>    
                    ))}
                    
                </Col>
            </Row>
        </div>
    )
}

export default Announcement