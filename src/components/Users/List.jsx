import React from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../../ducks/users';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useEffect } from 'react';
const UserList = ({ list, getUserList, loading }) => {
    useEffect(() => {
        getUserList()
    }, [])
    return (
        <Container>
            {
                !loading && list.length > 0 &&
                <Row>
                    <Col sm={12}>
                        <Table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    list.map((user,key)=>(
                                        <tr key={key}>
                                            <td>{user.id}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            }
        </Container>
    )
}

const mapStateToProps = state => (
    {
        list: state.users.list,
        loading: state.users.loading
    }
)

const mapDispatchToProps = dispatch => (
    {
        getUserList: () => dispatch(getUserList())
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(UserList)