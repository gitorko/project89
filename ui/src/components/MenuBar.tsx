import 'bootstrap/dist/css/bootstrap.min.css'
import {Nav, Navbar, NavDropdown} from "react-bootstrap"
import {Person} from 'react-bootstrap-icons'
import {useNavigate} from 'react-router-dom';
import AuthService from "../services/AuthService"

function MenuBar() {
    let navigate = useNavigate();

    const logout = () => {
        AuthService.logout()
        navigate('/login');
    }

    return (
        <div className="container-fluid">
            <Navbar bg="light">
                <Navbar.Brand href="/">
                    <img
                        src="/demo.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React App"
                    />
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/charts">Charts</Nav.Link>
                </Nav>

                {AuthService.getUser() ? (
                    <Nav className="ms-auto">
                        <Nav.Link><Person/></Nav.Link>
                        <NavDropdown title={AuthService.getUser()} id="user-nav-dropdown">
                            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    ) : (
                    <Nav className="ms-auto">
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Nav>
                     )}
                </Navbar>
        </div>
    )
}

export default MenuBar
