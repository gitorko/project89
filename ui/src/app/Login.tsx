import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import LoginBar from "../components/LoginBar";
import {useState} from 'react'

import AuthService from "../services/AuthService";
import {useNavigate} from "react-router-dom";

function Login() {
    let navigate = useNavigate();

    const [cred, setCred] = useState({
        username: '',
        password: '',
    })

    const [flashMsg, setFlashMsg] = useState({
        success: '',
        error: ''
    })

    const handleChange = (e: any) => {
        const value = e.target.value;
        setCred({
            ...cred,
            [e.target.name]: value
        });
    }

    const onSubmit = (e: any) => {
        e.preventDefault()
        if (!cred.username || !cred.password) {
            alert('Please enter the values')
            return
        }
        AuthService.login(cred).then((status) => {
            if (status) {
                setCred({
                    username: '',
                    password: ''
                })
                navigate('/');
            } else {
                setFlashMsg({
                    ...flashMsg,
                    'error': 'Login Failed!'
                })
            }
        }, error => {
            console.log("Error on login submit!")
        })
    }

    return (
        <>
            <LoginBar/>
            <Container>
                <Form style={{maxWidth: '400px', margin: 'auto'}} onSubmit={onSubmit}>
                    <br/>
                    <br/>
                    <h2>Login</h2>

                    <Form.Group controlId="formUsername" className={"mb-3"}>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="Enter Username" name="username" value={cred.username}
                                      onChange={handleChange}/>
                        <Form.Text className="text-muted">
                            Enter AD user name!
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className={"mb-3"}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={cred.password}
                                      onChange={handleChange}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <br/>
                    <br/>
                    {flashMsg.error && (
                        <Row>
                            <Col>
                                <Alert key="home-flash" variant="danger">
                                    {flashMsg.error}
                                </Alert>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Container>
        </>
    )
}

export default Login
