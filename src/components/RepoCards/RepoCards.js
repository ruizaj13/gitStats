import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Styled from 'styled-components';
import { connect } from 'react-redux';
import { Typography, Card, Col, Row, Menu, Dropdown, message} from 'antd';
import { DownOutlined } from '@ant-design/icons';

const Sorting = Styled.div`
display: flex; 
flex-direction: row; 
align-items: baseline; 
justify-content: space-between; 
width: 15%; 
height: 4vh;
margin-left: 23%;
`
const Repos = Styled.div`
display: flex; 
flex-direction: row; 
flex-wrap: wrap; 
justify-content: space-evenly; 
width: 75%;  
margin-left: 23%; 
padding-bottom: 3%;
`
const Cards = Styled(Card)`
width: 375px; 
height: 25vh; 
margin-top: 5%; 
background-color: rgba(255, 255, 255, 0.9);
border: 2px solid rgba(0, 0, 0, 0.1); 
border-radius: 10px;
`

const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };
  
const menu = (
  <Menu onClick={onClick}>
    <Menu.Item key="1">Created</Menu.Item>
    <Menu.Item key="2">Updated</Menu.Item>
    <Menu.Item key="3">Pushed</Menu.Item>
  </Menu>
);
const menu2 = (
  <Menu onClick={onClick}>
    <Menu.Item key="4">Asc</Menu.Item>
    <Menu.Item key="5">Desc</Menu.Item>
  </Menu>
);


const RepoCards = ({ user }) => {
    const [repos, setRepos] = useState()
    const [loading3, setLoading3] = useState(true);
    const { Title } = Typography;


    useEffect( () => {
        axios
        .get(`${user.repos_url}?sort=updated&direction=desc`)
        .then( res => {
            setRepos(res.data)
            setLoading3(false)
            console.log(repos)
        })
        .catch( err => {
            console.log(err.message)
        })
    }, [user.repos_url]);

    


    return (
        <>
            <Sorting>
                <Title level={3}>User Repos</Title>
                <Dropdown overlay={menu}>
                    <a style={{color:'black'}} onClick={e => e.preventDefault()}> {/* eslint-disable-line  */}
                        Sort <DownOutlined />
                    </a>
                </Dropdown>
                <Dropdown overlay={menu2}>
                    <a style={{color:'black'}} onClick={e => e.preventDefault()}> {/* eslint-disable-line  */}
                        Desc <DownOutlined />
                    </a>
                </Dropdown>
            </Sorting>
            <Repos>
                {loading3 ? <></> :
                    repos.slice(0,6).map(repo => {
                        return (
                            <Row>
                                <Col>
                                    <Cards title={repo.name}>
                                        <p>{repo.language}</p>
                                    </Cards>
                                </Col>
                            </Row>
                        )
                    })
                }
            </Repos>
        </>
    )
}

const mapStateToProps = state => {
    return {user: state.user, error: state.error}
}

export default connect(mapStateToProps)(RepoCards);