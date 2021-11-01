import 'bootstrap/dist/css/bootstrap.min.css'
import {Nav, Navbar, NavDropdown} from "react-bootstrap-v5"
import {Person} from 'react-bootstrap-icons'
import { useHistory } from 'react-router-dom';
import AuthService from "../services/AuthService"

const MenuBar = (props) => {
    let history = useHistory();

    const logout = () => {
        AuthService.logout()
        history.push("/login");
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
                        alt="Demo App"
                    />
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/charts">Charts</Nav.Link>
                    <NavDropdown title="Blank" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#">Blank 1</NavDropdown.Item>
                        <NavDropdown.Item href="#">Blank 2</NavDropdown.Item>
                    </NavDropdown>
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
