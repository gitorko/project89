import MenuBar from "../components/MenuBar";
import {Col, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import RestService from "../services/RestService"
import {useNavigate} from 'react-router-dom';
import {Chart} from "react-google-charts";
import AuthService from "../services/AuthService";

function ChartApp() {

    let navigate = useNavigate();
    const [pieData, setPieData] = useState<any>([])
    const [barData, setBarData] = useState<any>([])
    const [lineData, setLineData] = useState<any>([])
    const [columnData, setColumnData] = useState<any>([])

    const pieOptions = {
        title: 'My Pie Chart',
    };

    const barOptions = {
        title: 'My Bar Chart',
    };

    const lineOptions = {
        title: 'My Line Chart',
    }

    const columnOptions = {
        title: 'My Column Chart',
    }

    const pieChart = () => {
        RestService.getPieDataFromServer().then(res => {
            const chartData = [['Region', 'Amount']]
            for (let i = 0; i < res[1].length; i += 1) {
                chartData.push([res[0][i], res[1][i]])
            }
            setPieData({data: chartData})
        })
    }

    const barChart = () => {
        RestService.getPieDataFromServer().then(res => {
            const chartData = [['Region', 'Amount']]
            for (let i = 0; i < res[1].length; i += 1) {
                chartData.push([res[0][i], res[1][i]])
            }
            setBarData({data: chartData})
        })
    }

    const lineChart = () => {
        RestService.getPieDataFromServer().then(res => {
            const chartData = [['Region', 'Amount']]
            for (let i = 0; i < res[1].length; i += 1) {
                chartData.push([res[0][i], res[1][i]])
            }
            setLineData({data: chartData})
        })
    }

    const columnChart = () => {
        RestService.getColumnDataFromServer().then(res => {
            const chartData = []
            const rowData = []
            rowData.push("Fruit")
            for (let i = 0; i < res[0]["data"].length; i++) {
                rowData.push(res[0]["data"][i]);
            }
            chartData.push(rowData)
            for (let i = 1; i < res.length; i++) {
                const rowValData = []
                rowValData.push(res[i]["name"]);
                for(let j = 0; j< res[i]["data"].length; j++) {
                    rowValData.push(res[i]["data"][j]);
                }
                chartData.push(rowValData)
            }
            setColumnData({data: chartData})
        })
    }

    useEffect(() => {
        if (!AuthService.isAuthenticated()) {
            navigate("/login");
            return
        }
        pieChart()
        barChart()
        lineChart()
        columnChart()
    }, [])

    return (
        <>
            <MenuBar/>
            <Container>
                <br/>
                <Row>
                    <Col md={"6"}>
                        <Chart
                            chartType="PieChart"
                            data={pieData.data}
                            options={pieOptions}
                            width="100%"
                            height="400px"
                            legendToggle
                        />
                    </Col>
                    <Col md={"6"}>
                        <Chart
                            chartType="BarChart"
                            data={barData.data}
                            options={barOptions}
                            width="100%"
                            height="400px"
                            legendToggle
                        />
                    </Col>
                </Row>
                <br/>
                <br/>
                <Row>
                    <Col md={"6"}>
                        <Chart
                            chartType="LineChart"
                            data={lineData.data}
                            options={lineOptions}
                            width="100%"
                            height="400px"
                            legendToggle
                        />
                    </Col>
                    <Col md={"6"}>
                        <Chart
                            chartType="ColumnChart"
                            data={columnData.data}
                            options={columnOptions}
                            width="100%"
                            height="400px"
                            legendToggle
                        />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ChartApp
