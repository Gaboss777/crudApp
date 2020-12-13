import { PDFDownloadLink } from '@react-pdf/renderer'
import React from 'react'
import { Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { ReportPDF } from '../PDF/ReportPDF'

const TableReports = ({reports, list, providers, sellers, employies}) => {
    return(
    <>
        {reports && 
            <PDFDownloadLink 
                document={<ReportPDF />}
                className='btn btn-dark mb-2'
                fileName='reportes.pdf'
            >
                {({ blob, url, loading, error}) =>
                    loading ? ( 'Cargando ...')
                    : (
                        <FontAwesomeIcon
                            title='PDF'
                            size='lg'
                            icon={faFilePdf}
                        />
                    )
                }
            </PDFDownloadLink>
        }
        <Table >
            <thead className='bg-dark text-white'>
                <tr>
                    <th>FECHA</th>
                    <th>RAZON SOCIAL</th>
                    <th>MONTO</th>
                    <th>MONEDA</th>
                    <th>METODO DE PAGO</th>
                    <th>CONCEPTO</th>
                </tr>
            </thead>
            <tbody>
            { reports ?
                <>
                {reports.sort((a,b) => {return a.date < b.date ? 1 : a.date > b.date ? -1 : 0 }).map(report => {

                    return(
                        <tr>
                            <td>{report.date}</td>
                            <td>CLIENTE</td>
                            <td>{report.amount}</td>
                            <td>{report.currency}</td>
                            <td>{report.method}</td>
                            <td>{report.concept ? report.concept : 'N/A'}</td>
                        </tr>
                    )}
                )}
                </>
            : <tr><td colSpan={6} className='text-center'>NO SE HAN GENERADO REPORTES</td></tr>
            }
            </tbody>
        </Table>
    </>
    )
}

export default TableReports