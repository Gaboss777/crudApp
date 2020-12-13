import React from 'react'
import { Document, View, Page, Text, StyleSheet} from '@react-pdf/renderer'
import TableReports from '../Reports/TableReports'

const styles = StyleSheet.create({
    page: {

    },
    section: {

    },

})

export const ReportPDF = () => {
    return (
        <Document >
            <Page>
                <View>
                    <Text></Text>
                </View>
            </Page>
        </Document>
    )
}
