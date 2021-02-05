import SearchData from 'components/Utils/SearchData'
import SelectionMonth from 'components/Utils/SelectionMonth'
import SelectionYear from 'components/Utils/SelectionYear'
import { getPayments, updatePayment } from 'ducks/paymentReducer'
import { getUserList, } from 'ducks/usersReducer'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import StatusList from './StatusList'

const StatusView = ({ clients, payments, getUsersList, updatePayments, getPayments, year, month}) => {

      useEffect(() => {
            getUsersList()
            getPayments()
      }, [year])

      const [criteria, setCriteria] = useState('')
      const currentYear = year ? year : new Date().getFullYear()

      return (
            <Container fluid className='bg-white px-0 rounded'>
                  <h3 className='text-center text-white py-2 bg-warning rounded-top font-weight-bold'>VALIDACION DE PAGOS</h3>
                  <Row className='p-3'>
                        <Col sm lg={2}>
                              <SelectionYear />
                        </Col>
                        <Col sm lg={3}>
                              <SelectionMonth disabled={year ? false : true} />
                        </Col>
                        <Col sm lg={4}>
                              <SearchData criteria={criteria} setCriteria={setCriteria} />
                        </Col>
                        { year && month &&
                              <Col sm lg={12} className='mt-2'>
                                    <StatusList criteria={criteria} clients={clients} updatePayments={updatePayments} payments={payments} year={currentYear} month={month} />
                              </Col>
                        }
                  </Row>
            </Container>
      )
}

const MSTP = state => (
      {
            clients: state.users.list,
            payments: state.payment.payments,
            year: state.dates.year,
            month: state.dates.month
      }
)

const MDTP = dispatch => (
      {
            getUsersList: () => dispatch(getUserList()),
            getPayments: () => dispatch(getPayments()),
            updatePayments: (data) => dispatch(updatePayment(data))
      }
)

export default connect(MSTP, MDTP)(StatusView)