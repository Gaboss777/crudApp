import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { Button, ButtonGroup, FormControl, Container, Row, Col, Badge } from 'react-bootstrap';
import { getUserList, getUserActual } from '../../ducks/users';

const TableList =({list, getList, loading, userActual})=> {

    useEffect(() => {
        getList()
    }, [])

    /* Opciones Paginacion */
    const customTotal = (from, to, size) => {
        return <span className='ml-4'>Mostrar del { from } al { to } de { size } Resultados </span>
    }


    /* Boton Cantidad de Datos a Mostrar */
    const sizePerPageRenderer = ({options, currSizePerPage, onSizePerPageChange}) => (
        <ButtonGroup >
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

        const activeStyle = {}

        if (active) {
          activeStyle.backgroundColor = 'orange'
          activeStyle.color = 'black';
          activeStyle.borderColor = 'orange'
        } else {
          activeStyle.backgroundColor = 'black'
          activeStyle.color = 'white'
          activeStyle.borderColor = 'black'
        }

        if (typeof page === 'string') {
          activeStyle.backgroundColor = 'white'
          activeStyle.color = 'black'
          activeStyle.borderColor = 'black'
        }

        /* eslint-disable */
        return (
          <li className='page-item'>
              <a href='#' className='page-link' style={ activeStyle } onClick={ handleClick } >{ page }</a>
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
        classes: 'bg-gradient-primary',
        onSelect: (row, isSelect, rowIndex, e) => {
            if (isSelect) {
                userActual(row)
                console.log(row)
            } else {
                userActual(null)
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
            <Container className='my-2' fluid >
                <Row>
                    <Col xs lg='4' className='px-0'>
                        <FormControl placeholder='Buscar...' ref={n => input = n} type='text' />
                    </Col>
                    <Col xs lg='1'>
                        <Button variant='warning' type='submit' onClick={ handleClick } >Buscar</Button>
                    </Col>
                    <Col xs lg='1'>
                        <Button variant='dark' type='submit' onClick={ handleClear } >Limpiar</Button>
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
        { dataField: 'bandwidth', text: 'Bandwidth', sort: true, align: 'center', headerAlign: 'center', filter: textFilter() },
        { dataField: 'ipAddress', text: 'Direccion IP', sort: true, align: 'center', headerAlign: 'center', filter: textFilter() },
        { dataField: 'estado', text: 'Estado', sort: true, align: 'center', headerAlign: 'center', 
            formatter: (CellContent, row)=>{
                if(CellContent === 'Activo') {
                    return <Badge variant='success'>Activo</Badge>
                }
                if(CellContent === 'Suspendido' ) {
                    return <Badge variant='warning' >Suspendido</Badge>
                }
                if(CellContent === 'Cancelado') {
                    return <Badge variant='danger' >Cancelado</Badge>
                }
            }
        }
    ]

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
                                filter={ filterFactory() }
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