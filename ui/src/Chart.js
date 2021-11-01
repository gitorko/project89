import MenuBar from "./components/MenuBar";
import {Col, Container, Row} from "react-bootstrap-v5";
import {Bar, Line, Pie} from "react-chartjs-2";
import {useEffect, useState} from "react";
import RestService from "./services/RestService"
import AuthService from "./services/AuthService"
import {useHistory} from 'react-router-dom';

const Chart = () => {

    let history = useHistory();
    const [pieData, setPieData] = useState([])
    const [barData, setBarData] = useState([])
    const [lineData, setLineData] = useState([])
    const [columnData, setColumnData] = useState([])

    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const pieOptions = {
        title: {
            display: true,
            text: 'Pie Chart'
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    const barOptions = {
        title: {
            display: true,
            text: 'Bar Chart'
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    const lineOptions = {
        title: {
            display: true,
            text: 'Line Chart'
        },
        responsive: true,
        maintainAspectRatio: false,
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
        await RestService.getPieDataFromServer().then(dataRespsone => {
            setPieData({
                labels: dataRespsone[0],
                datasets: [{
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1,
                    hoverOffset: 4,
                    data: dataRespsone[1]
                }]
            })
            console.log(dataRespsone)
        })

    }

    const getBarData = async () => {
        await RestService.getPieDataFromServer().then(dataRespsone => {
            setBarData({
                labels: dataRespsone[0],
                datasets: [{
                    label: 'My First Dataset',
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1,
                    hoverOffset: 4,
                    data: dataRespsone[1]
                }]
            })
            console.log(dataRespsone)
        })

    }

    const getLineData = async () => {
        await RestService.getPieDataFromServer().then(dataRespsone => {
            setLineData({
                labels: dataRespsone[0],
                datasets: [{
                    label: 'My First Dataset',
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1,
                    hoverOffset: 4,
                    data: dataRespsone[1]
                }]
            })
            console.log(dataRespsone)
        })

    }

    const getColumnData = async () => {
        await RestService.getColumnDataFromServer().then(dataRespsone => {
            setColumnData({
                labels: dataRespsone[0]["data"],
                datasets: [{
                    label: dataRespsone[1]["name"],
                    backgroundColor: backgroundColors[0],
                    borderColor: borderColors[0],
                    fill: false,
                    borderWidth: 1,
                    hoverOffset: 4,
                    data: dataRespsone[1]["data"]
                }, {
                    label: dataRespsone[2]["name"],
                    backgroundColor: backgroundColors[1],
                    borderColor: borderColors[1],
                    fill: false,
                    borderWidth: 1,
                    hoverOffset: 4,
                    data: dataRespsone[2]["data"]
                }, {
                    label: dataRespsone[3]["name"],
                    backgroundColor: backgroundColors[2],
                    borderColor: borderColors[2],
                    fill: false,
                    borderWidth: 1,
                    hoverOffset: 4,
                    data: dataRespsone[3]["data"]
                }]
            })
            console.log(dataRespsone)
        })

    }

    useEffect(() => {
        if (!AuthService.isAuthenticated()) {
            history.push("/login");
            return
        }
        getPieData()
        getBarData()
        getLineData()
        getColumnData()
    }, [history])

    return (
        <>
            <MenuBar/>
            <Container>
                <br/>
                <Row>
                    <Col md={"6"}>
                        <Pie data={data} options={pieOptions} width="200" height="300"/>
                    </Col>
                    <Col md={"6"}>
                        <Bar data={data} options={barOptions} width="200" height="300"/>
                    </Col>
                </Row>
                <br/>
                <br/>
                <Row>
                    <Col md={"6"}>
                        <Line data={data} options={lineOptions} width="200" height="300"/>
                    </Col>
                    <Col md={"6"}>
                        <Bar data={data} options={columnOptions} width="200" height="300"/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Chart
