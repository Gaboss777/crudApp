//import librerias
import React, {useEffect} from 'react';
import { ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import SelectionYear from '../../Utils/SelectionYear';
import ListBills from './ListBills';
import PaymentForm from './PaymentForm';
import CreateProvider from './CreateProvider';
import { connect } from 'react-redux';
import { getBills, removeBills, createBill, createProvider, getProviders, removeProvider, updateProvider } from '../../../ducks/providerReducer';
import Listprovider from './Listprovider';
import Permission from '../../Layouts/Permission';
import SelectionMonth from 'components/Utils/SelectionMonth';

const ProviderView = ({year, month, user, createBill, createProvider, removeBills, getBills, getProviders, bills, providers, removeProvider, updateProvider}) => {

    useEffect(() => {
        getProviders()
        getBills()
    }, [])

    return (
        <Container fluid className='px-0 my-3 rounded bg-white' >
            <h3 className='text-center text-white py-2 bg-warning font-weight-bold rounded-top'>REGISTRO PAGO PROVEEDORES</h3>
            <Row className='p-3'>
                <Col sm lg={2} >
                    <SelectionYear />
                </Col>
                <Col sm lg={3} >
                    <SelectionMonth disabled={year ? false : true} />
                </Col>
                <Col sm lg={2} >
                    <ButtonGroup>
                    <Permission
                        role={user.role}
                        perform='providers:create'
                        yes={
                            <CreateProvider isModal={true} createProvider={createProvider} edit={false} />
                        }
                    />
                        <Listprovider user={user} providers={providers} removeProvider={removeProvider} updateProvider={updateProvider} />
                    </ButtonGroup>
                </Col>
                <Permission
                    role={user.role}
                    perform='providers:create'
                    yes={
                        <Col sm lg={2} >
                            <PaymentForm isModal={true} month={month} providers={providers} year={year} createBill={createBill} />
                        </Col>
                    }
                />
                {year && month &&
                <>
                    <Col sm lg={12}>
                        <h5 className='text-center my-2 font-weight-bold'>CALENDARIO DE PAGOS</h5>
                    </Col>
                    <Col sm lg={12}>
                        <ListBills year={year} user={user} bills={bills} removeBills={removeBills} createBill={createBill} providers={providers} month={month} />
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
        user: state.auth.user,
        month: state.dates.month
    }
)

const MDTP = dispatch => (
    {
        createBill: (data) => dispatch(createBill(data)),
        createProvider: (data) => dispatch(createProvider(data)),
        getProviders:() => dispatch(getProviders()),
        getBills:() => dispatch(getBills()),
        removeBills: (data) => dispatch(removeBills(data)),
        removeProvider: (data) => dispatch(removeProvider(data)),
        updateProvider: (data) => dispatch(updateProvider(data))
    }
)

export default connect(MSTP, MDTP)(ProviderView);
