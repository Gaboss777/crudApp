import React, { useEffect } from 'react';
import {Container, Row, Col, ButtonGroup} from 'react-bootstrap';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createSell, createSellUser, getSellsList, removeSellUser, removeSell, selectedSellUser, updateSellUser, getSellUsersList } from '../../ducks/sellers';
import { getUserList } from '../../ducks/users';
import Calendar from './Calendar';
import SellerForm from './forms/SellerForm';
import {connect} from 'react-redux';
import SellersList from './List';
import DropdownSellers from './DropdownSellers';

const SellersView = ({createSellUser, removeSellUser, list, selected, sellUserSelected, clientsList, getUserList, createSell, removeSell, sells, getSellsList, updateSellUser, getSellersList}) => {

    useEffect(() => {
        getSellersList()
    }, [])

    return (
        <Container fluid >
            <Row className='mt-3'>
                <Col sm lg={12}>
                    <h3 className='text-center'>REGISTRO PAGO DE VENDEDORES</h3>
                </Col>
            </Row>
            <Row className='mt-2'>
                <Col sm lg={5}>
                    <DropdownSellers list={list} selected={selected} sellUserSelected={sellUserSelected} />
                </Col>
                <Col sm lg={4}>
                    <ButtonGroup className='mt-1'>
                        <SellerForm isModal={true} createSeller={createSellUser} textBtn={<FontAwesomeIcon icon={faPlusSquare} size='lg' />} />
                        <SellersList list={list} removeSeller={removeSellUser} updateSellUser={updateSellUser} />
                    </ButtonGroup>
                </Col>
            </Row>
            {selected && 
                <Row className='mt-2'>
                    <Col>
                    <h2 className='text-center'>CALENDARIO DE PAGOS</h2>
                        <Calendar seller={selected} clientsList={clientsList} getUserList={getUserList} createSell={createSell} removeSell={removeSell} sells={sells} getSellsList={getSellsList} />
                    </Col>
                </Row>
            }
        </Container>
    )
}

const MSTP = state => (
    {
        list: state.sellers.list,
        selected: state.sellers.selected,
        clientsList: state.users.list,
        sells: state.sellers.sells
    }
)

const MDTP = dispatch => (
    {
        createSellUser: (data) => dispatch(createSellUser(data)),
        updateSellUser: (data) => dispatch(updateSellUser(data)),
        removeSellUser: (data) => dispatch(removeSellUser(data)),
        sellUserSelected: (data) => dispatch(selectedSellUser(data)),
        getUserList: () => dispatch(getUserList()),
        createSell: (data) => dispatch(createSell(data)),
        removeSell: (data) => dispatch(removeSell(data)),
        getSellsList: () => dispatch(getSellsList()),
        getSellersList: () => dispatch(getSellUsersList())
    }
)

export default connect(MSTP, MDTP)(SellersView)