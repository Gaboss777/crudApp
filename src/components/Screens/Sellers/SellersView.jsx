import React, { useEffect, useState } from 'react';
import {Container, Row, Col, ButtonGroup} from 'react-bootstrap';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createSell, createSellUser, getSellsList, removeSellUser, removeSell, selectedSellUser, updateSellUser, getSellUsersList } from '../../../ducks/sellersReducer';
import { getUserList } from '../../../ducks/usersReducer';
import Calendar from './Calendar';
import SellerForm from './forms/SellerForm';
import {connect} from 'react-redux';
import SellersList from './List';
import SelectionYear from '../../Utils/SelectionYear';
import DropdownList from '../../Utils/DropdownList';
import Permission from '../../Layouts/Permission';

const SellersView = ({createSellUser, removeSellUser, list, selected, sellUserSelected, clientsList, getUserList, createSell, removeSell, sells, getSellsList, updateSellUser, getSellersList, year, user, isAuthenticated}) => {

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

    console.log(selected)

    return (
        <Container fluid className='px-0' >
            { user.role === 'vendedor' 
                ? <h1 className='text-center text-white py-2 bg-warning title-section'>Ventas de {user.user}</h1>
                : <h1 className='text-center text-white py-2 bg-warning title-section'>REGISTRO PAGOS VENDEDORES</h1>
            }
            <Row className='mt-2'>
                {user.role !== 'vendedor' &&
                        <Col sm lg={5}>
                            <DropdownList data={names} action={sellUserSelected} labelKey='name' text='VENDEDORES' placeholder='Elija un venededor' />
                        </Col>
                }
                <Col sm lg={2} className='mt-2'>
                    <SelectionYear disabled={selected || isAuthenticated ? false : true} className={!selected ? isAuthenticated ? '' : 'form-disabled' : '' } />
                </Col>
                <Col sm lg={4} className='mt-2'>
                    <ButtonGroup className='mt-1'>
                    <Permission 
                        role={user.role}
                        perform='sellers:create'
                        yes={
                            <SellerForm isModal={true} createSeller={createSellUser} textBtn={<FontAwesomeIcon icon={faPlusSquare} size='lg' />} />
                        }
                    />
                        <SellersList role={user.role} list={list} removeSeller={removeSellUser} updateSellUser={updateSellUser} />
                    </ButtonGroup>
                </Col>
            </Row>
            {year &&
                <Row className='mt-2'>
                    <Col>
                        <h4 className='text-center my-3'>CALENDARIO DE PAGOS {year}</h4>
                        <Calendar seller={selected} clientsList={clientsList} getUserList={getUserList} createSell={createSell} removeSell={removeSell} sells={sells} getSellsList={getSellsList} year={year} user={user} />
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
        year: state.dates.year,
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated
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