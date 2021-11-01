import MenuBar from "./components/MenuBar";
import { Col, Container, Row } from "react-bootstrap-v5";
import { Bar, Line, Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import RestService from "./services/RestService"
import AuthService from "./services/AuthService"
import { useHistory } from 'react-router-dom';

const Chart = () => {

    let history = useHistory();
    const [pieData, setPieData] = useState([])
    const [barData, setBarData] = useState([])
    const [lineData, setLineData] = useState([])
    const [columnData, setColumnData] = useState([])

    const pieOptions = {
        title: {
            display: true,
            text: 'Pie Chart'
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    const barOptions = {
        title: {
            display: true,
            text: 'Bar Chart'
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    const lineOptions = {
        title: {
            display: true,
            text: 'Line Chart'
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }

    const columnOptions = {
        title: {
            display: true,
            text: 'Column Chart'
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true
            }
        }
    }

    useEffect(() => {
        if (!AuthService.isAuthenticated()) {
            history.push("/login");
            return
        }

        const backgroundColors = [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
        ];
        const borderColors = [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
        ];

        const getPieData = async () => {
            const data = await RestService.getPieDataFromServer()
            setPieData({
                labels: data[0],
                datasets: [{
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1,
                    hoverOffset: 4,
                    data: data[1]
                }]
            })
        }
        const getBarData = async () => {
            const data = await RestService.getPieDataFromServer()
            setBarData({
                labels: data[0],
                datasets: [{
                    label: 'My First Dataset',
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1,
                    hoverOffset: 4,
                    data: data[1]
                }]
            })
        }
        const getLineData = async () => {
            const data = await RestService.getPieDataFromServer()
            setLineData({
                labels: data[0],
                datasets: [{
                    label: 'My First Dataset',
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1,
                    hoverOffset: 4,
                    data: data[1]
                }]
            })
        }
        const getColumnData = async () => {
            const data = await RestService.getColumnDataFromServer()
            setColumnData({
                labels: data[0]["data"],
                datasets: [{
                    label: data[1]["name"],
                    backgroundColor: backgroundColors[0],
                    borderColor: borderColors[0],
                    fill: false,
                    borderWidth: 1,
                    hoverOffset: 4,
                    data: data[1]["data"]
                }, {
                    label: data[2]["name"],
                    backgroundColor: backgroundColors[1],
                    borderColor: borderColors[1],
                    fill: false,
                    borderWidth: 1,
                    hoverOffset: 4,
                    data: data[2]["data"]
                }, {
                    label: data[3]["name"],
                    backgroundColor: backgroundColors[2],
                    borderColor: borderColors[2],
                    fill: false,
                    borderWidth: 1,
                    hoverOffset: 4,
                    data: data[3]["data"]
                }]
            })
        }
        getPieData()
        getBarData()
        getLineData()
        getColumnData()
    }, [history])

    return (
        <>
            <MenuBar />
            <Container>
                <br />
                <Row>
                    <Col md={"6"}>
                        <Pie data={pieData} options={pieOptions} width="200" height="300" />
                    </Col>
                    <Col md={"6"}>
                        <Bar data={barData} options={barOptions} width="200" height="300" />
                    </Col>
                </Row>
                <br />
                <br />
                <Row>
                    <Col md={"6"}>
                        <Line data={lineData} options={lineOptions} width="200" height="300" />
                    </Col>
                    <Col md={"6"}>
                        <Bar data={columnData} options={columnOptions} width="200" height="300" />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Chart
