import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import { faBell, faEnvelope, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Navebar.scss';
import { Dropdown } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { Link } from 'react-router-dom';

function NavbarLayout({ onCapsuleSidebar, LogOut, currentUser }) {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" onClick={() => onCapsuleSidebar(false)} />
                    <Navbar.Collapse id="navbarScroll" >
                        <Container >
                            <Row>
                                <Col xs='12' lg="6"><h1 className='justify'>Welcome {currentUser?.username}</h1></Col>
                                <Col xs='12' lg='6'>
                                    <form>
                                        <input
                                            type="search"
                                            placeholder="Search"
                                            className="searchInput"
                                            aria-label="Search"
                                        />
                                        <FontAwesomeIcon icon={faSearch} size='1x' className='searchIcon' />
                                    </form>
                                </Col>
                            </Row>
                        </Container>
                    </Navbar.Collapse>
                    <FontAwesomeIcon icon={faBell} size='2x' className='icons' />
                    <span className='alertIcon'>0</span>
                    <FontAwesomeIcon icon={faEnvelope} size='2x' className='icons' />
                    <span className='alertIcon'>0</span>
                    <Dropdown>
                        <Dropdown.Toggle variant="Info" id="dropdown-basic">
                            <FontAwesomeIcon icon={faUser} size='2x' className='icons' />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1"><Link onClick={() => LogOut()}>Logout</Link></Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>

                </Container>
            </Navbar>
        </>
    );
}

export default NavbarLayout;