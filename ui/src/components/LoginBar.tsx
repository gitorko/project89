import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbar} from "react-bootstrap"

function LoginBar() {
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
            </Navbar>
        </div>
    )
}

export default LoginBar
