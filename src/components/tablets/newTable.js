import React, { useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { PaginationProvider, PaginationListStandalone, PaginationTotalStandalone, SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';
import { Button, ButtonGroup } from 'react-bootstrap';

export const TableNew =({users, updateUser})=> {

    const [ check, setCheck ] = useState([])

    /* Opciones Paginacion */
    const customTotal = (from, to, size) => {
        return <span className='ml-4'>Mostrar del { from } al { to } de { size } Resultados </span>
    }

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
                  className={ `btn ${isSelect ? 'btn-secondary' : 'btn-dark'}` }
                >
                  { option.text }
                  </Button>
              )
            })
          }
          </ButtonGroup>
      )

    const pageButtonRenderer = ({page, active, disable, title, onPageChange}) => {
        const handleClick = (e) => {
          e.preventDefault()
          onPageChange(page)
        }

        const activeStyle = {}

        if (active) {
          activeStyle.backgroundColor = 'black'
          activeStyle.color = 'white';
        } else {
          activeStyle.backgroundColor = 'gray'
          activeStyle.color = 'white'
        }

        if (typeof page === 'string') {
          activeStyle.backgroundColor = 'white'
          activeStyle.color = 'black'
        }

        /* eslint-disable */
        return (
          <li className='page-item'>
              <a href='#' className='page-link' style={ activeStyle } onClick={ handleClick } >{ page }</a>
          </li>
        /* eslint-enable */
        );
      };

    const options = {
        pageButtonRenderer,
        sizePerPageRenderer,
        totalSize: users.length,
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
        }, {
            text: 'Todo', value: users.length
        }]
    }

    const selectRow = {
        mode: 'checkbox',
        //clickToSelect: true,
        classes: 'bg-gradient-primary text-white',
        onSelect: (row, isSelect, rowIndex, e) => {
            if (isSelect) {
                check.push(row.id)
                console.log(check)
            } else {
                setCheck([])
                console.log(check)
            }
        },
        onSelectAll: (isSelect, rows, e) => {
            if (isSelect) {
                setCheck(rows)
            } else {
                setCheck([])
            }
        }
    }

    const afterSaveCell = (oldValue, newValue) => {
        let updateData = users.filter(user => user.idDocument === oldValue || user.name === oldValue || user.lastName === oldValue || user.zoneLocation === oldValue)
        console.log(updateData)
        console.log(newValue)
    }

    /* Columnas */
    const columns = [{
        dataField: 'name',
        text: 'NOMBRE',
        sort: true,
        align: 'center'
    }, {
        dataField: 'lastName',
        text: 'APELLIDO',
        sort: true,
        align: 'center'
    }, {
        dataField: 'idDocument',
        text: 'CI / RIF',
        sort: true,
        align: 'center'
    }, {
        dataField: 'zoneLocation',
        text: 'UBICACION',
        sort: true,
        align: 'center'
    }]

    return (
        <PaginationProvider pagination={ paginationFactory(options)} >
            {
                ({ paginationProps, paginationTableProps }) => (
                    <div>
                        <SizePerPageDropdownStandalone { ...paginationProps } className='p-1' />
                        <PaginationTotalStandalone { ...paginationProps } />
                        <PaginationListStandalone { ...paginationProps } />
                        <BootstrapTable
                            bootstrap4
                            keyField='id'
                            data={users}
                            columns={columns}
                            selectRow={selectRow}
                            cellEdit={ cellEditFactory({ 
                                mode: 'click', 
                                afterSaveCell
                                })}
                            headerClasses='bg-dark text-white'
                            { ...paginationTableProps }
                            />
                    </div>
                )
            }
        </PaginationProvider>
    )
}