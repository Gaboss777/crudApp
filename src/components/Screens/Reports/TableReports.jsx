import React, { useState } from 'react'
import { Col, Row, Table, Container } from 'react-bootstrap'
import moment from 'moment'
import PaginationList from 'components/Utils/PaginationList'
import { BtnPagination } from 'components/Utils/PaginationList'

export const TableReports = ({reports, data}) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage, setUsersPerPage] = useState(15)
    
    const indexOfLastUser = currentPage * usersPerPage
    const indexOfFirstUser = indexOfLastUser - usersPerPage
    const currentList = reports.slice(indexOfFirstUser, indexOfLastUser)
    
    return(
        <Container className='px-0'>
        <Row>
            <Col sm lg={2} className='mt-2'>
                <p className='font-weight-bold'>Mostrar del {indexOfFirstUser + 1} al {indexOfLastUser}</p>
            </Col>
            <Col sm lg={1}>
                <BtnPagination setUsersPerPage={setUsersPerPage} usersPerPage={usersPerPage} list={reports} />
            </Col>
            <Col sm lg={9}>
                <PaginationList usersPerPage={usersPerPage} currentPage={currentPage} list={reports} setUsersPerPage={setUsersPerPage} setCurrentPage={setCurrentPage} />
            </Col>
        </Row>
        <Row>
            <Col sm lg={12}>
                <Table responsive striped bordered size='sm' className='text-center'>
                    <thead className='bg-dark text-white'>
                        <tr>
                            <th>FECHA</th>
                            <th>DESCRIPCION</th>
                            <th>MONTO</th>
                            <th>MONEDA</th>
                            <th>METODO DE PAGO</th>
                            <th>CONCEPTO</th>
                        </tr>
                    </thead>
                    <tbody>
                    { reports.length > 0 ?
                        <>
                        {currentList.sort((a,b) => {return a.date < b.date ? 1 : a.date > b.date ? -1 : 0 }).map(report => {
                            let description = ''
                            let info = ''
                            if(report.user_id){ 
                                description = data[1].filter(client => client.id === report.user_id).map(x => x.name)
                                info = 'COBRO CLIENTE'
                            } else if(report.provider_id) {
                                description = data[2].filter(provider => provider.id === report.provider_id).map(x => x.name)
                            } else if(report.seller_id){
                                description = data[3].filter(seller => seller.id === report.seller_id).map(x => {return x.firstname+' '+x.secondname+' '+x.lastname+' '+x.secondsurname})
                            } else if(report.employie_id) {
                                description = data[0].filter(employie => employie.id === report.employie_id).map(x => {return x.firstname+' '+x.secondname+' '+x.lastname+' '+x.secondsurname})
                            }
                            let amountFormat = new Intl.NumberFormat("es-VE").format(report.amount)

                            return(
                                <tr className='font-cerecom-sm'>
                                    <td>{moment(report.date, 'YYYY-MM-DD').format('YYYY-MM-DD')}</td>
                                    <td>{description[0]}</td>
                                    <td className={info !== 'COBRO CLIENTE' ? 'text-danger' : 'text-success'  } >{info === 'COBRO CLIENTE' ? '+ '+amountFormat : '- '+amountFormat}</td>
                                    <td>{report.currency}</td>
                                    <td>{report.method ? report.method : 'N/A'}</td>
                                    <td>{report.concept ? report.concept : 'N/A'}</td>
                                </tr>
                            )}
                        )}
                        </>
                    : <tr><td colSpan={6} className='text-center'>NO SE HAN GENERADO REPORTES</td></tr>
                    }
                    </tbody>
                </Table>
            </Col>
        </Row>
    </Container>
    )
}