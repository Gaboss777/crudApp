import React, { useEffect, useState } from 'react'
import { Badge, Col, FormCheck, Row, Table } from 'react-bootstrap'
import { Bar, Line, Pie } from 'react-chartjs-2'
import Info from 'components/Layouts/InfoSection'
import moment from 'moment'

const DataLegend = ({labels, data, options, variant, count}) => {
    const totalData = count.reduce((a,b) => {return a + b}, 0)
    return (
        <Row>
            <Col className='mt-2'>
                <Pie data={data} options={options} />
            </Col>
            <Col className='mt-3'>
            { totalData !== 0 &&
                <>
                {count.map((c, index) =>
                    <h4 className='mt-2'>
                        <Badge variant={variant[index]} className='mr-2'>{c === 0 ? 0 : c < 10 ? '0'+c : c}</Badge> {labels[index]}
                    </h4>
                )}
                <h4 className='mt-2'><Badge variant='dark' className='mr-2'>{totalData}</Badge> TOTAL</h4>
                </>
            }
            </Col>
        </Row>
    )
}

const handleChartCircle = (config, data) => {

    const result = {}
    data.forEach(element => {
        if(element){
            result[element] = (result[element] || 0) + 1
        }
    })

    const chartData = {
        data: {
            labels: config.labels,
            datasets: [{
                data: Object.values(result),
                backgroundColor: config.colors
            }]
        },
        options: {
            legend: {
                display: false
            },
            responsive: true
        }
    }

    return chartData
}

const handlePeriod = (year) => {
    let period = null
    let currentMonth = new Date().getMonth()
    let currentYear = new Date().getFullYear()
    if(year){
        if(year < currentYear){
            period = 12+'-'+year
        } else{
            period = (currentMonth < 10 ? '0'+(currentMonth+1) : currentMonth+1)+'-'+year
        }
    } else {
        period = (currentMonth < 10 ? '0'+(currentMonth+1) : currentMonth+1)+'-'+currentYear
    }
    return period
}

export const StatusReport = ({list}) => {

    const [data, setData] = useState({})
    const [options, setOptions] = useState({})
    const [count, setCount] = useState([])

    const config = {
        labels: ['Activo', 'Suspendido', 'Cancelado'],
        colors: ['rgba(92,184,92)', 'rgba(240,173,78)', 'rgba(217,83,79)']
    }
    const variant = ['success', 'warning', 'danger']
    
    const statusList = list.map(x => x.status)
    const handleData = () => {
        let x = handleChartCircle(config, statusList)
        setData(x.data)
        setOptions(x.options)
        setCount(x.data.datasets[0].data)
    }

    useEffect(() => {
        if(list){
            handleData()
        }
    }, [list])


    return (
        <Info>
            <Info.Header>STATUS</Info.Header>
            <Info.Body>
            { count ?
                <DataLegend data={data} options={options} labels={config.labels} count={count} variant={variant} />
                : 'Cargando...'
            }
            </Info.Body>
        </Info>
    )
}

export const ServicesReport = ({list}) => {

    const [data, setData] = useState({})
    const [options, setOptions] = useState({})
    const [count, setCount] = useState([])

    const config = {
        labels: ['PYMES', 'Dedicado', 'Residencial'],
        colors: ['rgba(2,117,216)', 'rgba(240,173,78)', 'rgba(217,83,79)']
    }
    const variant = ['primary', 'warning', 'danger']

    const newList = list.map(x => x.service)
    const handleData = () => {
        let x = handleChartCircle(config, newList)
        setData(x.data)
        setOptions(x.options)
        setCount(x.data.datasets[0].data)
    }

    useEffect(() => {
        if(list){
            handleData()
        }
    }, [list])

    return (
        <Info>
            <Info.Header>SERVICIOS</Info.Header>
            <Info.Body>
                { count ?
                    <DataLegend data={data} options={options} labels={config.labels} count={count} variant={variant} />
                    : 'Cargando...'
                }
            </Info.Body>
        </Info>
    )
}

export const MovementsChart = ({payments, bills, sells, salaries, year}) => {

    const [chartData, setChartData] = useState([])
    const [currency, setCurrency] = useState('USD')
    const [totalGastos, setTotalGastos] = useState([])
    const [totalIngresos, setTotalIngresos] = useState([])

    const months = [{ id: '01', name: 'enero' }, { id: '02', name: 'febrero' }, { id: '03', name: 'marzo' }, { id: '04', name: 'abril' }, { id: '05', name: 'mayo' }, { id: '06', name: 'junio' }, { id: '07', name: 'julio' }, { id: '08', name: 'agosto' }, { id: '09', name: 'septiembre' }, { id: '10', name: 'octubre' }, { id: '11', name: 'noviembre' }, { id: '12', name: 'diciembre' }]
    
    const handleYear = () => {
        let selectedYear = null
        if(year){
            selectedYear = year
        } else {
            selectedYear = new Date().getFullYear().toString()
        }
        return selectedYear
    }

    const currentYear = handleYear()
    const monthsName = months.map(x => x.name)
    const dbTables = [bills, sells, salaries]
    

    const movementsPerYear = (dataArr) => {
        const result = dataArr.filter(x => x.period.includes(currentYear) && x.currency === currency).map(x => {return {period: x.period, amount: x.amount}})
        return result
    }

    const movementsPerMonth = (arr, month) => {
        const dataArr = movementsPerYear(arr)
        const result = dataArr.filter(x => x.period === month.id+'-'+currentYear).reduce((a,b) => a + b.amount, 0)
        return result
    }

    const totalMovements = () => {
        const ingresos = []
        const gastos = []
        months.forEach((month) => {
            let totalExpenses = 0
            let totalPayments = movementsPerMonth(payments, month)
            dbTables.forEach(data => {
                totalExpenses = totalExpenses + movementsPerMonth(data, month)
            })
            gastos.push(totalExpenses)
            ingresos.push(totalPayments)
        })
        setTotalGastos(gastos.reduce((a, b) => {return a + b}, 0).toFixed(2))
        setTotalIngresos(ingresos.reduce((a,b) => {return a + b}, 0).toFixed(2))

        setChartData({
            labels: monthsName,
            datasets: [{
                label: `Ingresos por Mes (${currency})`,
                data: ingresos,
                borderColor: 'rgba(2, 117, 216)',
                borderWidth: 3,
                backgroundColor: 'rgba(0,0,0,0)'
            }, {
                label: `Gastos por Mes (${currency})`,
                data: gastos,
                borderColor: 'rgba(255,0,0)',
                borderWidth: 3,
                backgroundColor: 'rgba(0,0,0,0)'
            }
        ]
        })
    }

    const options = {
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    autoSkip: true,
                    min: 0,
                    maxTicksLimit: 8,
                },
                offset: true
            }],
            xAxes: [{
                ticks: {
                    autoSkip: true
                },
                offset: true
            }]
        },
        title: {
            display: true,
            text: `MOVIMIENTOS DEL ${currentYear}`
        }
    }

    useEffect(() => {
        totalMovements()
    }, [payments, bills, sells, salaries, currency, year])

    return (
        <Info>
            <Info.Header>MOVIMIENTOS ANUALES</Info.Header>
            <Info.Body>
            { chartData ?
            <>
                <Row>
                    <Col sm lg={1}>
                        <FormCheck type='radio' label='BS' name='radioForm' onChange={() => setCurrency('BS')} />
                    </Col>
                    <Col sm lg={1}>
                        <FormCheck type='radio' label='USD' name='radioForm' onChange={() => setCurrency('USD')} />
                    </Col>
                    <Col sm lg={5} className='text-center pl-2'>
                        <p>Ingresos Anual: <span className='text-success'>{totalIngresos}</span></p>
                    </Col>
                    <Col sm lg={5} className='text-center pl-2'>
                        <p>Egresos Anual: <span className='text-danger'>{totalGastos}</span></p>
                    </Col>
                </Row>
                <Line data={chartData} options={options} />
            </>
            : 'Cargando...'
            }
            </Info.Body>
        </Info>
    )
}

export const ExpensesChart = ({bills, sells, salaries, year}) => {

    const [chartData, setChartData] = useState({})
    const [currency, setCurrency] = useState('USD')

    const handleYear =()=>{
        let selectedYear = null
        if(year){
            selectedYear = year
        } else {
            selectedYear = new Date().getFullYear().toString()
        }
        return selectedYear
    }

    const labels = ['Proveedores', 'Empleados', 'Vendedores']
    const currentYear = handleYear()

    const handleSum = (data) => {
        let result = data.filter(x => x.currency === currency).filter(x => x.period.includes(currentYear)).reduce((a,b) => {return a + b.amount}, 0)
        return result
    }

    const handleTotal = () => {
        const billsTotalAmount = handleSum(bills)
        const salariesTotalAmount = handleSum(salaries)
        const sellsTotalAmount = handleSum(sells)
        const result = [billsTotalAmount, salariesTotalAmount, sellsTotalAmount]
        setChartData({
            labels: labels,
            datasets: [{
                label: 'Total',
                data: result,
                backgroundColor: [
                    'rgba(2,117,216)',
                    'rgba(217,83,79)',
                    'rgba(101,84,192)'
                ],
                barThickness: 50
            }]
        })
    }

    const options = {
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    autoSkip: true,
                    min: 0,
                    maxTicksLimit: 10
                }
            }],
            xAxes: [{
                ticks: {
                    autoSkip: true
                }
            }]
        },
        legend: {
            display: false
        },
        title: {
            display: true,
            text: `TOTAL DE GASTOS ${currentYear} - (${currency})`
        }
    }

    useEffect(() => {
        handleTotal()
    },[bills, sells, salaries, currency, year])

    return (
        <Info>
            <Info.Header>TOTAL MONTOS POR PAGOS</Info.Header>
            <Info.Body>
                <Row className='mb-2 text-center'>
                    <Col sm lg={1}>
                        <FormCheck type='radio' label='BS' name='radio' onChange={() => setCurrency('BS')} />
                    </Col>
                    <Col sm lg={1}>
                        <FormCheck type='radio' label='USD' name='radio' onChange={() => setCurrency('USD')} />
                    </Col>
                </Row>
                <Bar data={chartData} options={options} />
            </Info.Body>
        </Info>
    )
}

export const PlansMbReport = ({list}) => {

    const [chartData, setChartData] = useState([])
    const plansMb = list.filter(x => x.bandwidth !== '').map(x => x.bandwidth )
    const uniquePlans = [...new Set(plansMb)].sort((a,b) => a - b )

    const totalPlans = () => {
        let result = {}
        plansMb.forEach(e => {
            if(e){
                result[e] = (result[e] || 0) + 1
            }
        })
        return result
    }

    const plansPerUnique = totalPlans()
    const maxPlan = Object.keys(plansPerUnique).find(k => plansPerUnique[k] === Math.max.apply(Math, Object.values(plansPerUnique)))
    const minPlan = Object.keys(plansPerUnique).find(k => plansPerUnique[k] === Math.min.apply(Math, Object.values(plansPerUnique)))

    const handlePlans = () => {
        const data = []
        uniquePlans.forEach(e => {
            let sendData = plansMb.filter(x => x === e)
            data.push(sendData.length)
        })
        setChartData({
            labels: uniquePlans,
            datasets: [{
                label: 'Total',
                data: data,
                backgroundColor: [
                    'rgba(2,117,216)',
                    'rgba(92,184,92)',
                    'rgba(240,173,78)',
                    'rgba(217,83,79)',
                    'rgba(101,84,192)',
                    'rgba(41,43,44)',
                    'rgba(0,128,0)',
                    'rgba(255,255,0)',
                    'rgba(11,4,99)'
                ]

            }]
        })
    }

    const options = {
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    autoSkip: true,
                    min: 0,
                    maxTicksLimit: 10
                }
            }],
            xAxes: [{
                ticks: {
                    autoSkip: true
                }
            }]
        },
        legend: {
            display: false
        },
        title: {
            display: true,
            text: 'TOTAL PLANES'
        }
    }

    useEffect(()=> {
        handlePlans()
    },[list])

    return (
        <Info>
            <Info.Header>PLANES MB</Info.Header>
            <Info.Body >
            {chartData ?
            <>
                <Bar data={chartData} options={options} />
                <h4>Plan mas solicitado: {maxPlan} MB</h4>
                <h4>Plan menos solicitado: {minPlan} MB </h4>
            </>
                : 'Cargando...'
            }
            </Info.Body>
        </Info>
    )
}

export const TableLastPayments = ({payments, list, year}) => {

    const currentYear = (year ? year : new Date().getFullYear().toString())
    const currentPeriod = handlePeriod(year)
    

    const lastsPay = payments.filter(x => x.period <= currentPeriod && x.period.includes(currentYear) ).sort((a, b) => a.date < b.date ? 1 : -1)

    useEffect(() => {
    }, [year])

    return (
        <Info >
            <Info.Header>ULTIMOS PAGOS CLIENTES</Info.Header>
            <Info.Body>
                <Table>
                    <thead>
                        <tr>
                            <th>RAZON SOCIAL</th>
                            <th>FECHA</th>
                            <th>CONCEPTO</th>
                            <th>MONTO</th>
                            <th>MONEDA</th>
                        </tr>
                    </thead>
                    <tbody>
                    { lastsPay.slice(0,5).map(x => {
                        let name = list.filter(e => e.id === x.user_id).map(x => {return x.name})
                        return(
                            <tr>
                                <td>{name}</td>
                                <td>{moment(x.date, 'YYYY-MM-DD').format('YYYY-MM-DD')}</td>
                                <td>{x.concept}</td>
                                <td>{new Intl.NumberFormat().format(x.amount)}</td>
                                <td>{x.currency}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </Info.Body>
        </Info>
    )
}

export const TableLastExpenses = ({bills, sells, salaries, year}) => {

    const [lastPay, setLastPay] = useState([])

    const currentYear = (year ? year : new Date().getFullYear().toString())
    const currentPeriod = handlePeriod(year)

    const dbTables = [bills, sells, salaries]

    const handleLastItem = () =>{
        let result = []
        dbTables.forEach(table => {
            let info = table.filter(x => x.period <= currentPeriod && x.period.includes(currentYear) ).sort((a, b) => a.date < b.date ? 1 : -1)
            result.push(...info)
        })
        setLastPay(result)
    }

    useEffect(() => {
        handleLastItem()
    }, [bills, salaries, sells, year])

    return (
        <Info>
            <Info.Header>ULTIMOS GASTOS</Info.Header>
            <Info.Body>
                <Table>
                        <thead>
                            <tr>
                                <th>FECHA</th>
                                <th>METODO</th>
                                <th>MONTO</th>
                                <th>MONEDA</th>
                            </tr>
                        </thead>
                        <tbody>
                        { lastPay.slice(0,5).map(x => {

                            return(
                                <tr>
                                    <td>{moment(x.date, 'YYYY-MM-DD').format('YYYY-MM-DD')}</td>
                                    <td>{x.method}</td>
                                    <td>{new Intl.NumberFormat().format(x.amount)}</td>
                                    <td>{x.currency}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
            </Info.Body>
        </Info>
    )
}