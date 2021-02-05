import { registerProfile } from 'ducks/authReducer'
import React from 'react'
import { Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import RolesForm from './ProfileForm'

const RulesView = () => {
      return (
            <Container fluid className='px-0'>
                  <h1>REGLAS</h1>
                  <RolesForm isModal={true}/>

            </Container>
      )
}

const MDTP = dispatch => (
      {
            registerRole: (data) => dispatch(registerProfile(data))
      }
)

export default connect(null, MDTP)(RulesView)