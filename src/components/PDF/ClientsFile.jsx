import React from 'react'
import { Document, View, Page, Text, StyleSheet} from '@react-pdf/renderer'

const styles = StyleSheet.create({
    page: {

    },
    section: {

    },

})

const PdfClient = () => {
    return (
        <Document >
            <Page>
                <View>
                    <Text>PRUEBA DE PDF</Text>
                </View>
            </Page>
        </Document>
    )
}

export default PdfClient