import "./AdminLayout.module.scss";

import { Col, Container, Nav, Row } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

// TODO: sidebar put here.
const AdminLayout = () => {
    return (
        <Container fluid>
            <Row>
                <Col xs={2} id='sidebar-wrapper'>
                    <Nav
                        className='col-md-12 d-none d-md-block bg-light sidebar'
                        activeKey='/home'
                        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
                    >
                        <div className='sidebar-sticky'></div>
                        <Nav.Item>
                            <Nav.Link href='/home'>Active</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey='link-1'>Link</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey='link-2'>Link</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey='disabled' disabled>
                                Disabled
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col xs={10} id='page-content-wrapper'>
                    <Outlet />
                </Col>
            </Row>
        </Container>
    );
};
export default AdminLayout;
