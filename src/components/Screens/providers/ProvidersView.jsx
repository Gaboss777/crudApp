//import librerias
import React, {useEffect} from 'react';
import { ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import SelectionYear from '../../Utils/SelectionYear';
import ListBills from './ListBills';
import CreateProvider from './CreateProvider';
import { connect } from 'react-redux';
import { getBills, removeBills, createBill, createProvider, getProviders, removeProvider } from '../../../ducks/providerReducer';
import Listprovider from './Listprovider';
import Permission from '../../Layouts/Permission';

const ProviderView = ({year, user, createBill, createProvider, removeBills, getBills, getProviders, bills, providers, removeProvider}) => {

    useEffect(() => {
        getProviders()
        getBills()
    }, [])

    return (
        <Container fluid className='px-0' >
            <h1 className='text-center text-white py-2 bg-warning title-section'>REGISTRO PAGO PROVEEDORES</h1>
            <Row>
                <Col sm lg={2} className='my-2'>
                    <SelectionYear />
                </Col>
                <Permission
                    role={user.role}
                    perform='providers:list'
                    yes={() =>
                        <Col sm lg={2} >
                            <ButtonGroup>
                            <Permission
                                role={user.role}
                                perform='providers:create'
                                yes={() =>
                                    <CreateProvider isModal={true} createProvider={createProvider} />
                                }
                            />
                                <Listprovider user={user} providers={providers} removeProvider={removeProvider} />
                            </ButtonGroup>
                        </Col>
                    }
                />
                {year &&
                <>
                    <Col sm lg={12}>
                        <h3 className='text-center my-2'>CALENDARIO DE PAGOS</h3>
                    </Col>
                    <Col sm lg={12}>
                        <ListBills year={year} user={user} bills={bills} removeBills={removeBills} createBill={createBill} providers={providers} />
                    </Col>
                </>
                }
            </Row>
        </Container>
    )
}

const MSTP = state => (
    {
        providers: state.providers.providers,
        year: state.dates.year,
        bills: state.providers.bills,
        user: state.auth.user
    }
)

const MDTP = dispatch => (
    {
        createBill: (data) => dispatch(createBill(data)),
        createProvider: (data) => dispatch(createProvider(data)),
        getProviders:() => dispatch(getProviders()),
        getBills:() => dispatch(getBills()),
        removeBills: (data) => dispatch(removeBills(data)),
        removeProvider: (data) => dispatch(removeProvider(data))
    }
)

export default connect(MSTP, MDTP)(ProviderView);
