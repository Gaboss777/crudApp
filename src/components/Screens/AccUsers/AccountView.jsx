import React, { useEffect, useState } from 'react'
import { ButtonGroup, Col, Container, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { registerAccount, getAccountsList, selectRow, updateAccount, removeAccount, clearSelectedRow } from '../../../ducks/authReducer'
import AccountsList from './Lists/AccountsList'
import AccountForm from './Forms/AccountForm'
import DeleteAccount from './DeleteAccount'
import { getEmployies } from '../../../ducks/rrhhReducer'
import { getSellUsersList } from '../../../ducks/sellersReducer'
import SearchData from 'components/Utils/SearchData'

const AccountsView = ({accounts, employies, sellers, user, selected, account, registerAccount, updateAccount, getAccountsList, selectRow, removeAccount, clearSelectedRow, getEmployies, getSellers}) => {

      const [criteria, setCriteria] = useState('')

    useEffect(() => {
        getAccountsList()
        getEmployies()
        getSellers()
        if(selected.length > 0) {
            clearSelectedRow()
        }
    }, [])

    return (
          <>
          <h1 className='text-center text-white py-2 bg-warning title-section'>CUENTAS DE USUARIOS</h1>
          <Container fluid>
              <Row>
                  <Col sm lg={2} className='mb-2'>
                      <ButtonGroup>
                          <AccountForm isModal={true} employies={employies} registerAccount={registerAccount} edit={false} selected={selected} account={account} sellers={sellers} />
                          <AccountForm isModal={true} employies={employies} updateAccount={updateAccount} edit={true} selected={selected} account={account} sellers={sellers} />
                          <DeleteAccount selected={selected} removeAccount={removeAccount} />
                      </ButtonGroup>
                  </Col>
                  <Col sm lg={3} className='mb-2'>
                        <SearchData criteria={criteria} setCriteria={setCriteria} data={accounts} />
                  </Col>
                  <Col sm lg={12}>
                      <AccountsList accounts={accounts} selectRow={selectRow} selected={selected} criteria={criteria} />
                  </Col>
              </Row>
          </Container>
          </>
    )
}

const MSTP = state => (
    {
        accounts: state.auth.accounts,
        account: state.auth.selected[0],
        selected: state.auth.selected,
        employies: state.rrhh.employies,
        sellers: state.sellers.list,
        user: state.auth.user

    }
)

const MDTP = dispatch => (
    {
        registerAccount: (data) => dispatch(registerAccount(data)),
        getAccountsList: () => dispatch(getAccountsList()),
        selectRow: (e, data) => dispatch(selectRow(e, data)),
        updateAccount: (data) => dispatch(updateAccount(data)),
        removeAccount: (data) => dispatch(removeAccount(data)),
        clearSelectedRow: () => dispatch(clearSelectedRow()),
        getEmployies: () => dispatch(getEmployies()),
        getSellers: () => dispatch(getSellUsersList())
    }
)

export default connect(MSTP, MDTP)(AccountsView)