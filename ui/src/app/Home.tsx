import MenuBar from "../components/MenuBar"
import PropTypes from 'prop-types'
import {useEffect, useState} from 'react'
import {Alert, Button, Col, Container, Form, Row, Table} from "react-bootstrap"
import {Trash} from 'react-bootstrap-icons'
import RestService from "../services/RestService"
import AuthService from "../services/AuthService"
import {useNavigate} from "react-router-dom";

function Home() {

    let navigate = useNavigate();
    const [customers, setCustomers] = useState([])
    const [time, setTime] = useState()
    const [customer, setCustomer] = useState({
        firstName: '',
        lastName: ''
    })
    const [flashMsg, setFlashMsg] = useState({
        success: '',
        error: ''
    })

    const getCustomers = async () => {
        const customersFromServer = await RestService.fetchCustomers()
        setCustomers(customersFromServer)
    }

    const deleteCustomer = async (id: any) => {
        RestService.deleteCustomer(id).then((res) => {
            if (res) {
                setCustomers(customers.filter((customer) => {
                    // @ts-ignore
                    return customer.id !== id;
                }))
                setFlashMsg({
                    ...flashMsg,
                    'success': 'Deleted user: ' + id
                })
            } else {
                alert('Error in delete!')
            }
        })
    }

    const onSubmit = (e: any) => {
        e.preventDefault()
        if (!customer.firstName || !customer.lastName) {
            alert('Please enter the values')
            return
        }
        addCustomer(customer)
        setCustomer({
            firstName: '',
            lastName: ''
        })
        setFlashMsg({
            ...flashMsg,
            'success': 'Successfully added user by: ' + AuthService.getUser()
        })
    }

    const addCustomer = async (customer: any) => {
        RestService.addCustomer(customer).then((data) => {
            // @ts-ignore
            setCustomers([...customers, data])
        })
    }

    const handleChange = (e: any) => {
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        if (!AuthService.isAuthenticated()) {
            navigate('/login');
            return
        }
        setFlashMsg({
            success: '',
            error: ''
        })
        RestService.getTime().then(res => setTime(res))
        getCustomers()
    }, [])

    // @ts-ignore
    Home.propTypes = {
        title: PropTypes.string,
        onClick: PropTypes.func,
    }

    return (
        <>
            <MenuBar/>
            <br/>
            <Container>
                <Row>
                    <Col className={"text-center"}>
                        <p className="text-end">Server Time : {time}</p>
                    </Col>
                </Row>
                <br/>

                {flashMsg.success && (
                    <Row>
                        <Col>
                            <Alert key="home-flash" variant="success">
                                {flashMsg.success}
                            </Alert>
                        </Col>
                    </Row>
                )}

                <Row>
                    <Col className={"text-center"}>
                        <h2>Customers</h2>
                    </Col>
                </Row>
                <br/>

                <Row>
                    <Col md={"4"}>
                        <Form onSubmit={onSubmit}>
                            <Form.Group controlId="formFirstName" className={"mb-3"}>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter First Name" name="firstName"
                                              value={customer.firstName} onChange={handleChange}/>
                                <Form.Text className="text-muted">
                                    Enter first name!
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formLastName" className={"mb-3"}>
                                <Form.Label>LastName</Form.Label>
                                <Form.Control type="text" placeholder="LastName" name="lastName"
                                              value={customer.lastName} onChange={handleChange}/>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                    <Col md={"8"}>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {customers.map((customer: any) => (
                                <tr key={customer.id}>
                                    <td>{customer.firstName}</td>
                                    <td>{customer.lastName}</td>
                                    <td><Trash onClick={() => deleteCustomer(customer.id)}
                                               style={{color: 'red', cursor: 'pointer'}}/></td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Home
