import SearchData from 'components/Utils/SearchData'
import SelectionYear from 'components/Utils/SelectionYear'
import { getPayments, updatePayment } from 'ducks/paymentReducer'
import { getUserList, } from 'ducks/usersReducer'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import StatusList from './StatusList'

const StatusView = ({ clients, payments, getUsersList, updatePayments, getPayments, year}) => {

      useEffect(() => {
            getUsersList()
            getPayments()
      }, [year])

      const [criteria, setCriteria] = useState('')
      const currentYear = year ? year : new Date().getFullYear()

      return (
            <Container fluid className='px-0'>
                  <h1 className='text-center text-white py-2 bg-warning title-section'>ESTADOS DE COBRO</h1>
                  <Row>
                        <Col sm lg={2}>
                              <SelectionYear />
                        </Col>
                        <Col sm lg={3}>
                              <SearchData criteria={criteria} setCriteria={setCriteria} />
                        </Col>
                        <Col sm lg={12} className='mt-2'>
                              <StatusList criteria={criteria} clients={clients} updatePayments={updatePayments} payments={payments} year={currentYear} />
                        </Col>
                  </Row>
            </Container>
      )
}

const MSTP = state => (
      {
            clients: state.users.list,
            payments: state.payment.payments,
            year: state.dates.year
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