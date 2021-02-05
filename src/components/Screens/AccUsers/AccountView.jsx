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

const AccountsView = ({accounts, employies, sellers, selected, registerAccount, updateAccount, getAccountsList, selectRow, removeAccount, clearSelectedRow, getEmployies, getSellers}) => {

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
        <Container fluid className='px-0 bg-white rounded'>
            <h3 className='text-center text-white py-2 bg-warning font-weight-bold rounded-top'>CUENTAS DE USUARIOS</h3>
            <Row className='p-3'>
                <Col sm lg={2} className='mb-2'>
                    <ButtonGroup>
                        <AccountForm isModal={true} employies={employies} registerAccount={registerAccount} edit={false} sellers={sellers} selected={selected} />
                        <AccountForm isModal={true} employies={employies} updateAccount={updateAccount} edit={true} selected={selected} sellers={sellers} />
                        <DeleteAccount selected={selected} removeAccount={removeAccount} />
                    </ButtonGroup>
                </Col>
                <Col sm lg={4} className='mb-2'>
                        <SearchData criteria={criteria} setCriteria={setCriteria} data={accounts} />
                </Col>
                <Col sm lg={12}>
                    <AccountsList accounts={accounts} selectRow={selectRow} selected={selected} criteria={criteria} />
                </Col>
            </Row>
        </Container>
    )
}

const MSTP = state => (
    {
        accounts: state.auth.accounts,
        selected: state.auth.selected,
        employies: state.rrhh.employies,
        sellers: state.sellers.list

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