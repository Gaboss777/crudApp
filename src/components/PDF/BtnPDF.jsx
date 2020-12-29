import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { PDFDownloadLink } from '@react-pdf/renderer'

export const BtnPDF = ({file, loadingText}) => {
    return (
        <PDFDownloadLink 
            document={file}
            className='btn btn-dark mb-2'
            fileName='reportes.pdf'
        >
            {({ blob, url, loading, error}) =>
                loading ? ( loadingText )
                : (
                    <FontAwesomeIcon
                        title='PDF'
                        size='lg'
                        icon={faFilePdf}
                    />
                )
            }
        </PDFDownloadLink>
    )
}