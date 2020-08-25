import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { PaginationProvider, PaginationListStandalone, PaginationTotalStandalone, SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { Button, ButtonGroup } from 'react-bootstrap';
import { getUserList, getUserActual } from '../../ducks/users';

const TableList =({list, getList, loading, userActual})=> {

    useEffect(() => {
        getList()
    }, [])

    const [ check, setCheck ] = useState(null)

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
        custom: true,
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
                setCheck(null)
                console.log(check)
            }
        },
        onSelectAll: (isSelect, rows, e) => {
            if (isSelect) {
                setCheck(rows)
            } else {
                setCheck(null)
            }
        }

    }

    /* Columnas */
    const columns = [
        { dataField: 'razonSocial', text: 'RAZON SOCIAL', sort: true, align: 'center', headerAlign: 'center', filter: textFilter() },
        { dataField: 'idDocument', text: 'CI / RIF', sort: true, align: 'center', headerAlign: 'center', filter: textFilter() },
        { dataField: 'zoneLocation', text: 'UBICACION', sort: true, align: 'center', headerAlign: 'center', filter: textFilter() },
        { dataField: 'services', text: 'SERVICIO', sort: true, align: 'center', headerAlign: 'center', filter: textFilter() },
        { dataField: 'MB', text: 'MB', sort: true, align: 'center', headerAlign: 'center', filter: textFilter() },
        { dataField: 'Estado', text: 'ESTADO', sort: true, align: 'center', headerAlign: 'center', filter: textFilter() }
    ]

    return (
        <>
            {
                !loading && list.length > 0 &&
                <PaginationProvider pagination={ paginationFactory(options)} >
                {
                    ({ paginationProps, paginationTableProps }) => (
                        <div>
                            <SizePerPageDropdownStandalone { ...paginationProps } className='p-1' />
                            <PaginationTotalStandalone { ...paginationProps } />
                            <PaginationListStandalone { ...paginationProps } />
                            <BootstrapTable
                                bootstrap4
                                hover
                                keyField='id'
                                data={list}
                                columns={columns}
                                selectRow={selectRow}
                                bordered={false}
                                filter={filterFactory()}
                                filterPosition='top'
                                headerClasses='bg-warning text-white'
                                noDataIndication='Tabla vacia'
                                { ...paginationTableProps }
                                />
                        </div>
                    )
                }
                </PaginationProvider>
            }
        </>
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