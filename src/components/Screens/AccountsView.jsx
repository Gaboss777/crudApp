import React, { useEffect } from 'react'
import { ButtonGroup, Col, Container, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { registerAccount, registerRole, getAccountsList, selectRow, getRolesList, updateAccount, removeAccount, clearSelectedRow } from '../../ducks/authReducer'
import ListAccounts from '../Login/ListAccounts'
import AccountForm from '../Login/AccountForm'
import RolesForm from '../Login/RolesForm'
import DeleteAccount from '../Login/DeleteAccount'

const AccountsView = ({accounts, roles, selected, account, registerAccount, updateAccount, registerRole, getAccountsList, getRolesList, selectRow, removeAccount, clearSelectedRow}) => {

    useEffect(() => {
        getAccountsList()
        getRolesList()
        if(selected.length > 0) {
            clearSelectedRow()
        }
    }, [])

    return (
    <>
        <h1 className='text-center text-white py-2 bg-warning title-section'>CUENTAS</h1>
        <Container fluid>
            <Row>
                <Col sm lg={2} className='mb-2'>
                    <ButtonGroup>
                        <AccountForm isModal={true} roles={roles} registerAccount={registerAccount} edit={false} selected={selected} account={account} />
                        <AccountForm isModal={true} roles={roles} updateAccount={updateAccount} edit={true} selected={selected} account={account} />
                        <DeleteAccount selected={selected} removeAccount={removeAccount} />
                    </ButtonGroup>
                </Col>
                <Col sm lg={4} className='mb-2'>
                    <ButtonGroup>
                        <RolesForm isModal={true} registerRole={registerRole} />
                    </ButtonGroup>
                </Col>
                <Col sm lg={12}>
                    <ListAccounts accounts={accounts} selectRow={selectRow} selected={selected} />
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
        roles: state.auth.roles
    }
)

const MDTP = dispatch => (
    {
        registerAccount: (data) => dispatch(registerAccount(data)),
        registerRole: (data) => dispatch(registerRole(data)),
        getAccountsList: () => dispatch(getAccountsList()),
        getRolesList: () => dispatch(getRolesList()),
        selectRow: (e, data) => dispatch(selectRow(e, data)),
        updateAccount: (data) => dispatch(updateAccount(data)),
        removeAccount: (data) => dispatch(removeAccount(data)),
        clearSelectedRow: () => dispatch(clearSelectedRow())
    }
)

export default connect(MSTP, MDTP)(AccountsView)