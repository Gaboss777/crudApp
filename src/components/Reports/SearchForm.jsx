import React, { useEffect, useState } from 'react'
import { Col, Form, Row, Button } from 'react-bootstrap'
import moment from 'moment'

const SearchForm = ({sells, bills, salaries, payments, createReports}) => {

    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()

    const [tableData, setTableData] = useState('')
    const [moreOptions, setMoreOptions] = useState(null)
    const [initialDate, setInitialDate] = useState('')
    const [lastDate, setLastDate] = useState('')
    const [currency, setCurrency] = useState('')
    const [method, setMethod] = useState('')
    const [concept, setConcept] = useState('')
    const [minAmount, setMinAmount] = useState(0)
    const [maxAmount, setMaxAmount] = useState(0)

    const [data, setData] = useState([])

    const filters = {currency: currency, method: method, concept: concept}

    const otherDates = (values) => {
        switch(moreOptions) {
            case '7 dias':
                let lastWeek = values.filter(x => moment(x.date, 'YYYY-MM-DD').format('YYYY-MM-DD') <= moment(currentDate, 'YYYY-MM-DD').format('YYYY-MM-DD') &&  moment(x.date, 'YYYY-MM-DD').format('YYYY-MM-DD') >= moment().subtract(7, 'days').format('YYYY-MM-DD'))
                setData(lastWeek)
                break
            case '1 mes':
                let lastMonth = values.filter(x => x.period === currentMonth+'-'+currentYear)
                setData(lastMonth)
                break
            case '2 meses':
                let twoMonths = values.filter(x => x.period === currentMonth+'-'+currentYear && x.period === (currentMonth - 1)+'-'+currentYear)
                setData(twoMonths)
                break
            case '3 meses':
                let threeMonths = values.filter(x => x.period === currentMonth+'-'+currentYear && x.period === (currentMonth - 1)+'-'+currentYear && x.period === (currentMonth - 2)+'-'+currentYear)
                setData(threeMonths)
                break
            default: setData([])
        }
    }

    const filterOptions = (values) => {
        console.log('datos filtrados con otras opciones')
        let dataFiltered = values.filter(m => !maxAmount || m.amount <= maxAmount).filter(m => !minAmount || m.amount >= minAmount).filter(x => !filters.currency || x.currency === filters.currency).filter(y => !filters.method || y.method === method).filter(z => !filters.concept || z.concept === concept)
        return dataFiltered
    }

    const filterPerDates = (values) => {
        let newData = []
        if(moreOptions || initialDate || lastDate){
            if(initialDate && lastDate ){
                console.log('datos filtrados con fechas variadas')
                newData = values.filter(x => moment(x.date, 'YYYY-MM-DD').format('YYYY-MM-DD') <= lastDate && moment(x.date, 'YYYY-MM-DD').format('YYYY-MM-DD') >= initialDate )
                if(currency || method || concept || minAmount || maxAmount){
                    newData = filterOptions(newData)
                }
                setData(newData)
            } else {
                console.log('datos filtrados por fechas fijas')
                if(currency || method || concept || minAmount || maxAmount){
                    newData = filterOptions(values)
                }
                otherDates(!newData ? newData : values)
            }
        } else {
            if(currency || method || concept || minAmount || maxAmount){
                newData = filterOptions(values)
                setData(newData)
            } else {
                setData(values)
            }
        }
    }

    const handleReports = () => {
        switch(tableData){
            case '1':
                filterPerDates(bills)
                break
            case '2':
                filterPerDates(salaries)
                break
            case '3':
                filterPerDates(sells)
                break
            case '4':
                filterPerDates(payments)
                break
            default: setData([])
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleReports()
    }

    const handleResetFilters = () => {
        setTableData('')
        setConcept('')
        setCurrency('')
        setMethod('')
        setMaxAmount(0)
        setMinAmount(0)
        setMoreOptions('')
        setData([])
        setInitialDate('')
        setLastDate('')
    }

    useEffect(() => {
        createReports(data)
    }, [data])

    console.log(data)

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col sm lg={3}>
                    <Form.Row>
                        <Form.Group as={Col} sm lg={12}>
                            <Form.Label className='w-100 pl-2 bg-dark font-weight-bold text-white'>TABLA</Form.Label>
                            <Form.Control required as='select' value={tableData} onChange={({target}) => setTableData(target.value)} >
                                <option value='' selected>Elija uno</option>
                                <option value='4'>CLIENTES</option>
                                <option value='1'>PROVEEDORES</option>
                                <option value='2'>EMPLEADOS</option>
                                <option value='3'>VENDEDORES</option>
                            </Form.Control>
                        </Form.Group>
                        <Col sm lg={12} className='mt-3'>
                            <Button variant='primary' type='submit'>BUSCAR</Button>
                            <Button variant='danger' className='ml-2' onClick={handleResetFilters} >REINICIAR</Button>
                        </Col>
                    </Form.Row>
                </Col>
                <Col sm lg={9}>
                    <Form.Row>
                        <Form.Group as={Col} sm lg={3}>
                            <Form.Label className='w-100 pl-2 bg-dark font-weight-bold text-white'>FECHA INICIAL</Form.Label>
                            <Form.Control type='date' value={initialDate} onChange={({target}) => setInitialDate(target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} sm lg={3}>
                            <Form.Label className='w-100 pl-2 bg-dark font-weight-bold text-white'>FECHA FINAL</Form.Label>
                            <Form.Control type='date' value={lastDate} onChange={({target}) => setLastDate(target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} sm lg={6}>
                            <Form.Label className='w-100 pl-2 bg-dark font-weight-bold text-white'>OTRAS OPCIONES</Form.Label>
                            <Row className='mt-3'>
                                <Col sm lg={3}><Form.Check label='7 dias' type='radio' name='report' onChange={() => setMoreOptions('7 dias')}  /></Col>
                                <Col sm lg={3}><Form.Check label='1 Mes' type='radio' name='report' onChange={() => setMoreOptions('1 mes')} /></Col>
                                <Col sm lg={3}><Form.Check label='2 Meses' type='radio' name='report' onChange={() => setMoreOptions('2 meses')} /></Col>
                                <Col sm lg={3}><Form.Check label='3 Meses' type='radio' name='report' onChange={() => setMoreOptions('3 meses')} /></Col>
                            </Row>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} sm lg={2}>
                            <Form.Label className='w-100 pl-2 bg-dark font-weight-bold text-white'>MONTO MIN</Form.Label>
                            <Form.Control type='number' value={minAmount} onChange={({target}) => setMinAmount(target.valueAsNumber)} />
                        </Form.Group>
                        <Form.Group as={Col} sm lg={2}>
                            <Form.Label className='w-100 pl-2 bg-dark font-weight-bold text-white'>MONTO MAX</Form.Label>
                            <Form.Control type='number' value={maxAmount} onChange={({target}) => setMaxAmount(target.valueAsNumber)} />
                        </Form.Group>
                        <Form.Group as={Col} sm lg={2}>
                            <Form.Label className='w-100 pl-2 bg-dark font-weight-bold text-white'>MONEDA</Form.Label>
                            <Form.Control as='select' value={currency} onChange={({target}) => setCurrency(target.value)} >
                                <option value='' selected>Todo</option>
                                <option value='USD'>USD</option>
                                <option value='BS'>BS</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} sm lg={3}>
                            <Form.Label className='w-100 pl-2 bg-dark font-weight-bold text-white'>METODO DE PAGO</Form.Label>
                            <Form.Control as='select' value={method} onChange={({target}) => setMethod(target.value)} >
                                <option value='' selected>Todo</option>
                                <option value='Efectivo'>Efectivo</option>
                                <option value='Zelle'>Zelle</option>
                                <option value='Transferencia Bancaria'>Transferencia Bancaria</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} sm lg={3}>
                            <Form.Label className='w-100 pl-2 bg-dark font-weight-bold text-white'>CONCEPTO</Form.Label>
                            <Form.Control as='select' value={concept} onChange={({target}) => setConcept(target.value)} disabled={tableData === '2' || tableData === '4' ? false : true} className={tableData === '2' || tableData === '4' ? '' : 'form-disable' }>
                                <option value='' selected>Todo</option>
                                {tableData === '4' ? 
                                <>
                                    <option value='mensualidad'>Mensualidad</option>
                                    <option value='alquiler'>Alquiler</option>
                                    <option value='mantenimiento'>Mantenimiento</option>
                                    <option value='instalacion'>Instalacion</option>
                                    <option value='otros'>Otros</option>
                                </>
                                : <>
                                    <option value='salario'>Salario</option>
                                    <option value='bono'>Bono</option>
                                    <option value='utilidades'>Utilidades</option>
                                    <option value='vacaciones'>Vacaciones</option>
                                    <option value='adelanto'>Adelanto</option>
                                    <option value='liquidacion'>Liquidacion</option>
                                </>
                                }
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                </Col>
            </Row>
        </Form>
    )
}

export default SearchForm