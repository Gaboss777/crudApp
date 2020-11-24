//import librerias
import React, {useEffect} from 'react';
import { ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import SelectionYear from '../SelectionYear';
import ListBills from './ListBills';
import CreateProvider from './CreateProvider';
import { connect } from 'react-redux';
import { getBills, removeBills, createBill, createProvider, getProviders, removeProvider } from '../../ducks/provider';
import Listprovider from './Listprovider';

//crear componente
const ProviderView = ({year, createBill, createProvider, removeBills, getBills, getProviders, bills, providers, removeProvider}) => {

    useEffect(() => {
        getProviders()
        getBills()
    }, [])

    return (
        <Container fluid className='mt-2'>
            <Row>
                <Col sm lg={12}>
                    <h3 className='text-center my-2'>REGISTRO PAGOS PROVEEDORES</h3>
                </Col>
                <Col sm lg={2} className='my-2'>
                    <SelectionYear />
                </Col>
                <Col sm lg={2} >
                    <ButtonGroup>
                        <CreateProvider isModal={true} createProvider={createProvider} />
                        <Listprovider providers={providers} removeProvider={removeProvider} />
                    </ButtonGroup>
                </Col>
                {year &&
                <>
                    <Col sm lg={12}>
                        <h3 className='text-center my-2'>CALENDARIO DE PAGOS</h3>
                    </Col>
                    <Col sm lg={12}>
                        <ListBills year={year} bills={bills} removeBills={removeBills} createBill={createBill} providers={providers} />
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
        bills: state.providers.bills
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
