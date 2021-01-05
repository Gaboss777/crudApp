import AccountView from 'components/Screens/AccUsers/AccountView'
import ProfilesView from 'components/Screens/Rules/ProfilesView'
import SideBar from 'components/Utils/Sidebar'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Route, BrowserRouter as Router, useRouteMatch, Switch } from 'react-router-dom'

const PermissionView = () => {

    const { path } = useRouteMatch()

    const data = [
        {id: '1', route: 'accounts', linkName: 'Cuentas', component: AccountView},
        {id: '2', route: 'profiles', linkName: 'Perfiles', component: ProfilesView}
    ]

    return (
        <Router>
            <Container fluid className='px-0'>
                <Row>
                    <SideBar data={data} path={path} />
                    <Col>
                        <Switch>
                            {data.map(x =>
                                <Route exact path={`${path}/${x.route}`} component={x.component} />
                            )}
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </Router>
    )
}

export default PermissionView