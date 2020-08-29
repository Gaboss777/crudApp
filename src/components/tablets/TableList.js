import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { Button, ButtonGroup, FormControl, Badge, InputGroup, Container, Col, Row } from 'react-bootstrap';
import { getUserList, getUserActual } from '../../ducks/users';

const TableList =({list, getList, loading, userActual})=> {

    const [checked, setChecked] = useState([])

    useEffect(() => {
        getList()
    }, [])

    /* Opciones Paginacion */
    const customTotal = (from, to, size) => {
        return <span className='ml-4'>Datos del { from } al { to } Total: { size } Resultados </span>
    }


    /* Boton Cantidad de Datos a Mostrar */
    const sizePerPageRenderer = ({options, currSizePerPage, onSizePerPageChange}) => (
        <ButtonGroup className='rounded-lg' >
          {
            options.map((option) => {
              const isSelect = currSizePerPage === `${option.page}`
              return (
                <Button
                  key={ option.text }
                  type="button"
                  size='sm'
                  onClick={ () => onSizePerPageChange(option.page) }
                  variant={isSelect ? 'warning' : 'dark'}
                >
                  { option.text }
                  </Button>
              )
            })
          }
          </ButtonGroup>
      )

    /* Efecto Pagina seleccionada */
    const pageButtonRenderer = ({page, active, disable, title, onPageChange}) => {
        const handleClick = (e) => {
          e.preventDefault()
          onPageChange(page)
        }

        /* eslint-disable */
        return (
            <li className='page-item'>
                <a href='#' className={`page-link ${active ? 'bg-warning text-white border-warning' : (typeof page === 'string') ? 'bg-light text-dark border-dark' : 'bg-dark text-white border-dark' }`} onClick={ handleClick } >{ page }</a>
            </li>
        /* eslint-enable */
        );
      };

    /* Opciones paginacion botones */
    const options = {
        pageButtonRenderer,
        sizePerPageRenderer,
        totalSize: list.length,
        paginationSize: 10,
        paginationIndex: 0,
        firstPageText: '<<',
        prePageText: '<',
        nextPageText: '>',
        lastPageText: '>>',
        showTotal: true,
        paginationTotalRenderer: customTotal,
        disablePageTitle: true,
        sizePerPageList: [{
            text: '10', value: 10
        }, {
            text: '20', value: 20
        }]
    }

    /* Row Selection effects */
    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        classes: 'bg-gradient-primary text-white',
        onSelect: (row, isSelect, rowIndex, e) => {
            if (isSelect) {
                let dataAdd = checked
                dataAdd.push(row)
                setChecked(dataAdd)
                console.log(checked.length)
                if (checked.length > 1) {
                    userActual(checked)
                    console.log(checked)
                } else {
                    userActual(checked[0])
                }
            } else {
                let dataRemove = checked
                dataRemove.splice(dataRemove.indexOf(row), 1)
                setChecked(dataRemove)
                if( checked.length === 0) {
                    userActual(null)
                }
            }
        }
    }

    /* Form Busqueda y Botones */
    const CustomSearch = props => {
        let input
        const handleClick=()=>{
            props.onSearch(input.value)
        }
        const handleClear=()=>{
            props.onSearch('')
            input.value=''
        }
        return (
            <Container fluid className='my-2 px-0'>
                <Row>
                    <Col xs lg={4}>
                    <InputGroup >
                        <FormControl placeholder='Buscar...' ref={n => input = n} type='text' aria-describedby='form-find' />
                        <InputGroup.Append >
                            <Button variant='warning' type='submit' onClick={ handleClick } >Buscar</Button>
                            <Button variant='dark' type='submit' onClick={ handleClear } >Limpiar</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    </Col>
                </Row>
            </Container>
        )
    }


    /* Columnas */
    const columns = [
        { dataField: 'razonSocial', text: 'Razon Social', sort: true, align: 'center', headerAlign: 'center' },
        { dataField: 'idDocument', text: 'CI / RIF', sort: true, align: 'center', headerAlign: 'center' },
        { dataField: 'zoneLocation', text: 'Ubicacion', sort: true, align: 'center', headerAlign: 'center' },
        { dataField: 'services', text: 'Servicio', sort: true, align: 'center', headerAlign: 'center' },
        { dataField: 'bandwidth', text: 'Bandwidth', sort: true, align: 'center', headerAlign: 'center' },
        { dataField: 'ipAddress', text: 'Direccion IP', sort: true, align: 'center', headerAlign: 'center' },
        { dataField: 'estado', text: 'Estatus', sort: true, align: 'center', headerAlign: 'center', 
            formatter: (CellContent, row)=>{
                return <Badge variant={CellContent === 'Activo' ? 'success' : CellContent === 'Suspendido' ? 'warning' : 'danger'} className='text-uppercase'>{CellContent}</Badge>
            }
        }
    ]

    console.log(loading)
    console.log(list)

    return (
        <div>
            {
                !loading && list.length > 0 &&
                <ToolkitProvider keyField='id' data={list} columns={columns} search >
                {
                    props => (
                        <div>
                            <CustomSearch {...props.searchProps} />
                            <BootstrapTable
                                bootstrap4
                                selectRow={selectRow}
                                bordered={false}
                                headerClasses='bg-warning text-white'
                                noDataIndication='Datos no encontrados'
                                pagination={ paginationFactory(options)}
                                filterPosition='top'
                                { ...props.baseProps }
                                />
                        </div>
                    )
                }
                </ToolkitProvider>
            }
        </div>
    )
}

const mapStateToProps = state => (
    {
        list: state.users.list,
        loading: state.users.loading
    }
)

const mapDispatchToProps = dispatch => (
    {
        getList: () => dispatch(getUserList("usersDedicados")),
        userActual: (data) => dispatch(getUserActual(data))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(TableList)