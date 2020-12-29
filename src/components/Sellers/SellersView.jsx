import React, { useEffect, useState } from 'react';
import {Container, Row, Col, ButtonGroup} from 'react-bootstrap';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createSell, createSellUser, getSellsList, removeSellUser, removeSell, selectedSellUser, updateSellUser, getSellUsersList } from '../../ducks/sellersReducer';
import { getUserList } from '../../ducks/usersReducer';
import Calendar from './Calendar';
import SellerForm from './forms/SellerForm';
import {connect} from 'react-redux';
import SellersList from './List';
import SelectionYear from '../SelectionYear';
import DropdownList from '../DropdownList';

const SellersView = ({createSellUser, removeSellUser, list, selected, sellUserSelected, clientsList, getUserList, createSell, removeSell, sells, getSellsList, updateSellUser, getSellersList, year}) => {

    const [count, setCount] = useState(0)
    const names = list.map(x => {return {name: x.firstname.toUpperCase()+' '+x.secondname.toUpperCase()+' '+x.lastname.toUpperCase()+' '+x.secondsurname.toUpperCase(), id: x.id}} )

    useEffect(() => {
        if(selected) {
            sellUserSelected('')
        }
        if(count !== 1){
            setCount(1)
            getSellersList()
        }
        getUserList()
        getSellsList()
    }, [count])

    return (
        <Container fluid className='px-0' >
            <h1 className='text-center text-white py-2 bg-warning title-section'>REGISTRO PAGOS VENDEDORES</h1>
            <Row className='mt-2'>
                <Col sm lg={5}>
                    <DropdownList data={names} action={sellUserSelected} labelKey='name' text='VENDEDORES' placeholder='Elija un venededor' />
                </Col>
                <Col sm lg={2} classNAme='mt-2'>
                    <SelectionYear disabled={selected ? false : true} className={!selected ? 'form-disable' : ''} />
                </Col>
                <Col sm lg={4} classNAme='mt-2'>
                    <ButtonGroup className='mt-1'>
                        <SellerForm isModal={true} createSeller={createSellUser} textBtn={<FontAwesomeIcon icon={faPlusSquare} size='lg' />} />
                        <SellersList list={list} removeSeller={removeSellUser} updateSellUser={updateSellUser} />
                    </ButtonGroup>
                </Col>
            </Row>
            {selected && year && 
                <Row className='mt-2'>
                    <Col>
                    <h4 className='text-center my-3'>CALENDARIO DE PAGOS</h4>
                        <Calendar seller={selected} clientsList={clientsList} getUserList={getUserList} createSell={createSell} removeSell={removeSell} sells={sells} getSellsList={getSellsList} year={year} />
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
        sells: state.sellers.sells,
        year: state.dates.year
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