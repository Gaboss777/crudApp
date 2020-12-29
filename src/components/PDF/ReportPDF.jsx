import React from 'react'
import { Document, View, Page, Text, Image, StyleSheet} from '@react-pdf/renderer'
import logo from '../../img/Logo 3.png'

const styles = StyleSheet.create({
    page: {
        padding: 30
    },
    imagen: {
        width: 250,
        height: 75
    }

})

export const ReportPDF = () => {

    return (
        <Document>
            <Page style={styles.page}>
                <View>
                    <Image src={logo} style={styles.image} />
                </View>
            </Page>
        </Document>
    )
}
