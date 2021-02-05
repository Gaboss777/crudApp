import Permission from 'components/Layouts/Permission'
import SearchData from 'components/Utils/SearchData'
import { createMensuality, getMensualityList, removeMensuality, updateMensuality } from 'ducks/usersReducer'
import React, { useState, useEffect } from 'react'
import { ButtonGroup, Col, Container, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import ClientsActions from './ClientsActions'
import ClientsList from './Lists/ClientsList'
import MensualityForm from './Forms/MensualityForm'
import MensualityList from './Lists/MensualityList'

const ClientsView = ({user, client, mensualities, getMensualityList, selected, createMensuality, removeMensuality, updateMensuality}) => {
    const [criteria, setCriteria] = useState('')

    useEffect(() => {
        getMensualityList()
    },[])

    return (
    <Container fluid className='px-0 rounded bg-white shadow-sm'>
        <h3 className=' font-weight-bold text-center text-white py-2 bg-warning rounded-top'>CLIENTES</h3>
        <Row className='p-3 rounded'>
            <Permission 
                role={user.role}
                perform='clients:actions'
                yes={
                    <Col sm lg={2} >
                        <ClientsActions />
                    </Col>
                }
            />
            <Permission 
                role={user.role}
                perform='clients:actions'
                yes={
                    <Col sm lg={2}>
                        <ButtonGroup>
                        <Permission
                            role={user.role}
                            perform='clients:create'
                            yes={<MensualityForm className='rounded-left' edit={false} selected={selected} isModal={true} createMensuality={createMensuality} />}
                        />
                            <MensualityList list={mensualities} selected={client} removeMensuality={removeMensuality} updateMensuality={updateMensuality} user={user} disabled={selected.length !== 1 ? true : false} />
                        </ButtonGroup>
                    </Col>
                }
            />
            <Col sm lg={4}>
                <SearchData criteria={criteria} setCriteria={setCriteria} />
            </Col>
        </Row>
        <Row className='px-3'>
            <Col sm lg={12}>
                <ClientsList criteria={criteria} />
            </Col>
        </Row>
    </Container>
    )
}

const MSTP = state => (
    {
        user: state.auth.user,
        mensualities: state.users.mensuality,
        selected: state.users.selected,
        client: state.users.selected[0]
    }
)

const MDTP = dispatch => (
    {
        getMensualityList: () => dispatch(getMensualityList()),
        createMensuality: (data) => dispatch(createMensuality(data)),
        removeMensuality: (data) => dispatch(removeMensuality(data)),
        updateMensuality: (data) => dispatch(updateMensuality(data))
    }
)

export default connect(MSTP, MDTP)(ClientsView)