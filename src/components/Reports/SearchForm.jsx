import React, { useState } from 'react'
import { Col, Form, Row, Button } from 'react-bootstrap'
import moment from 'moment'
import Alerts from '../Alerts/alerts'

const SearchForm = ({sells, bills, salaries, payments}) => {

    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()

    const [option, setOption] = useState('')
    const [moreOptions, setMoreOptions] = useState(null)
    const [initialDate, setInitialDate] = useState('')
    const [lastDate, setLastDate] = useState('')
    const [currency, setCurrency] = useState('')
    const [method, setMethod] = useState('')
    const [concept, setConcept] = useState('')
    const [minAmount, setMinAmount] = useState(0)
    const [maxAmount, setMaxAmount] = useState(0)

    const [data, setData] = useState([])


    const otherDates = (info) => {
        switch(moreOptions) {
            case '7 dias':
                let lastWeek = info.filter(x => moment(x.date, 'YYYY-MM-DD').format('YYYY-MM-DD') <= moment(currentDate, 'YYYY-MM-DD').format('YYYY-MM-DD') &&  moment(x.date, 'YYYY-MM-DD').format('YYYY-MM-DD') >= moment().subtract(7, 'days').format('YYYY-MM-DD'))
                setData(lastWeek)
                break
            case '1 mes':
                let lastMonth = info.filter(x => x.period === currentMonth+'-'+currentYear)
                setData(lastMonth)
                break
            case '2 meses':
                let twoMonths = info.filter(x => x.period === currentMonth+'-'+currentYear || x.period === (currentMonth - 1)+'-'+currentYear)
                setData(twoMonths)
                break
            case '3 meses':
                let threeMonths = info.filter(x => x.period === currentMonth+'-'+currentYear || x.period === (currentMonth - 1)+'-'+currentYear || x.period === (currentMonth - 2)+'-'+currentYear)
                setData(threeMonths)
                break
            default: setData([])
        }
    }

    const filterOptions = (data) => {
        let newData = data.filter(x => x.amount <= maxAmount || x.amount >= minAmount || x.currency === currency || x.method ===  method || x.concept === concept )
        console.log('Datos filtrados con opciones', data.filter(x => x.currency === currency))
        setData(newData)
    }

    const filterPerDates = (data, filters) => {
        let newData = data.filter(x => moment(x.date, 'YYYY-MM-DD').format('YYYY-MM-DD') <= lastDate && moment(x.date, 'YYYY-MM-DD').format('YYYY-MM-DD') >= initialDate )
        if(filters === true){
            filterOptions(newData)
        } else {
            console.log('Datos filtrados sin opciones')
            setData(newData)
        }
    }

    const handleSearch = (dbTable) => {
        if(moreOptions || initialDate || lastDate) {
            console.log('Datos con fecha')
            if(initialDate && lastDate){
                if(minAmount || maxAmount || currency || method || currency || concept){
                    filterPerDates(dbTable, true)
                } else {
                    filterPerDates(dbTable, false)
                }
            } else {
                otherDates(dbTable)
            }
        } else {
            console.log('Datos sin fecha')
            if(minAmount || maxAmount || currency || method || currency || concept){
                filterOptions(dbTable)
            } else {
                setData(dbTable)
            }
        }
    }

    const reportPerOptions = () => {
        switch(option){
            case '1':
                handleSearch(bills)
                break
            case '2':
                handleSearch(salaries)
                break
            case '3':
                handleSearch(sells)
                break
            case '4':
                handleSearch(payments)
                break
            default: setData([])
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        reportPerOptions()
    }

    console.log(data)
    console.log(method, currency, maxAmount, minAmount, concept)

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col sm lg={3}>
                    <Form.Row>
                        <Form.Group as={Col} sm lg={12}>
                            <Form.Label className='w-100 pl-2 bg-dark font-weight-bold text-white'>TABLA</Form.Label>
                            <Form.Control required as='select' value={option} onChange={({target}) => setOption(target.value)} >
                                <option value='' selected>Elija uno</option>
                                <option value='4'>CLIENTES</option>
                                <option value='1'>PROVEEDORES</option>
                                <option value='2'>EMPLEADOS</option>
                                <option value='3'>VENDEDORES</option>
                            </Form.Control>
                        </Form.Group>
                        <Col sm lg={12} className='mt-3'>
                            <Button variant='primary' type='submit'>BUSCAR</Button>
                            <Button variant='danger' className='ml-2'>REINICIAR</Button>
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
                            <Form.Control as='select' value={concept} onChange={({target}) => setConcept(target.value)} disabled={option === '2' || option === '4' ? false : true} className={option === '2' || option === '4' ? '' : 'form-disable' }>
                                <option value='' selected>Todo</option>
                                {option === '4' ? 
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