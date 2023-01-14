import React from "react";
import { Col, Row } from "react-bootstrap";
import Announcement from "../components/homePageComponents/announcement";
import Header from "../components/homePageComponents/header";
import SidebarHomePage from "../components/homePageComponents/sidebarHomePage";


const Home = () => {


    return (
        <div style={{'margin':'1rem'}}>
            <Row>
                <Col lg='12'><Header /></Col>
                <Col lg='8'><Announcement /></Col>
                <Col lg='4'><SidebarHomePage /></Col>
            </Row>
        </div>
    );
};

export default Home;