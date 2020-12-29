import React from 'react'
import SideBar from '../Sidebar'
import ProviderView from '../providers/ProvidersView';
import PayUsers from '../payment/components/PayUsers'
import EmployeeView from '../employee/View';
import SellersView from '../Sellers/SellersView';

export const PaymentsView = () => {
    const data = [
        {id: '1', route: 'client', linkName: 'Cobro Clientes', component: PayUsers},
        {id: '2', route: 'provider', linkName: 'Pago Proveedores', component: ProviderView},
        {id: '3', route: 'employee', linkName: 'Pago Empleados', component: EmployeeView},
        {id: '4', route: 'sellers', linkName: 'Pago Vendedores', component: SellersView}
    ]
  
    return (
        <SideBar data={data} />
    )
}