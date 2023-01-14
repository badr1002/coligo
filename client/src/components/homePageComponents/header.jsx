import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import './header.scss';
import webLayerImg from "../../assets/images/examLayer.webp"

const Header = () => {
    return (
        <div className='header'>
            <Row>
                <Col lg='8'>
                    <Row style={{'margin':'4rem'}}>
                        <Col lg='12'>
                            <h1 className='title'>EXAMS TIME</h1>
                            <p>Here we are, Are you readyto fight? Don't worry, we prepared some tips to be ready for your exam.</p>
                        </Col>
                        <Col lg='12'>
                            <p style={{ 'color':'rgb(131 124 124)'}}>"Nothing happens until somes=thing moves".</p>
                            <Button className='view-exam-btn'>View exams tips</Button>
                        </Col>
                    </Row>
                </Col>
                <Col lg='4'>
                    <img src={webLayerImg} alt="" style={{
                        width: '37rem',
                        height: '21rem'
                    }} />
                </Col>
            </Row>
        </div>
    )
}

export default Header