import React, { useEffect, useState } from 'react';
import {Container, Row, Col, ButtonGroup} from 'react-bootstrap';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createSell, createSellUser, getSellsList, removeSellUser, removeSell, selectedSellUser, updateSellUser, getSellUsersList, validationSell } from '../../../ducks/sellersReducer';
import { getUserList } from '../../../ducks/usersReducer';
import Calendar from './Calendar';
import SellerForm from './forms/SellerForm';
import {connect} from 'react-redux';
import SellersList from './List';
import SelectionYear from '../../Utils/SelectionYear';
import DropdownList from '../../Utils/DropdownList';
import Permission from '../../Layouts/Permission';

const SellersView = ({createSellUser, removeSellUser, list, selected, sellUserSelected, clientsList, getUserList, createSell, removeSell, sells, getSellsList, updateSellUser, validationSell, getSellersList, year, user, isAuthenticated}) => {

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
        <Container fluid className='px-0 bg-white rounded' >
            { user.role === 'vendedor' 
                ? <h3 className='text-center text-white py-2 bg-warning rounded-top font-weight-bold'>VENTAS DE {user.user}</h3>
                : <h3 className='text-center text-white py-2 bg-warning rounded-top font-weight-bold'>REGISTRO PAGOS VENDEDORES</h3>
            }
            <Row className='p-3'>
                {user.role !== 'vendedor' &&
                        <Col sm lg={5}>
                            <DropdownList data={names} action={sellUserSelected} labelKey='name' text='VENDEDORES' placeholder='Elija venededor...' />
                        </Col>
                }
                <Col sm lg={2}>
                    <SelectionYear disabled={!isAuthenticated ? true : selected || user.role === 'vendedor' ? false : true} />
                </Col>
                <Col sm lg={4}>
                    <ButtonGroup>
                    <Permission
                        role={user.role}
                        perform='sellers:create'
                        yes={
                            <>
                                <SellerForm isModal={true} createSeller={createSellUser} textBtn={<FontAwesomeIcon icon={faPlusSquare} size='lg' />} />
                                <SellersList role={user.role} list={list} removeSeller={removeSellUser} updateSellUser={updateSellUser} />
                            </>
                        }
                    />
                    </ButtonGroup>
                </Col>
            </Row>
            {year &&
                <Row className='pb-3'>
                    <Col>
                        <h4 className='text-center my-3 font-weight-bold'>CALENDARIO DE PAGOS {year}</h4>
                        <Calendar seller={selected} clientsList={clientsList} createSell={createSell} removeSell={removeSell} sells={sells} year={year} user={user} validationSell={validationSell} />
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
        getSellersList: () => dispatch(getSellUsersList()),
        validationSell: (data) => dispatch(validationSell(data))
    }
)

export default connect(MSTP, MDTP)(SellersView)