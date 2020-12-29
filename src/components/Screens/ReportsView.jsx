import React from 'react'
import SideBar from '../Sidebar'
import GeneralDataView from '../Reports/ReportsView/GeneralDataView';
import ReportsPayment from '../Reports/ReportsView/ReportsPayment';

export const ReportsView =()=>{

    const data = [
        {id: '1', route: 'graphics', linkName: 'Datos Generales', component: GeneralDataView},
        {id: '2', route: 'movements', linkName: 'Reportes', component: ReportsPayment}
    ]
  
    return (
        <SideBar data={data} />
    )
  }