import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Styled from 'styled-components';
import { connect } from 'react-redux';
import { Typography, Card, Col, Row, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const Sorting = Styled.div`
display: flex; 
flex-direction: row; 
align-items: baseline; 
justify-content: space-between; 
width: 17%; 
height: 4vh;
margin-left: 23%;
/* margin-right:615%; */
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




const RepoCards = ({ user }) => {
    const [repos, setRepos] = useState();
    const [sort, setSort] = useState('Pushed');
    const [direction, setDirection] = useState('Desc');
    const [loading, setLoading] = useState(true);
    const { Title } = Typography;

    const onClickSort = ({ key }) => {
        setSort(`${key}`);
    };

    const onClickDirection = ({ key }) => {
        setDirection(`${key}`);
    };
      
    const sortMenu = (
      <Menu onClick={onClickSort}>
        <Menu.Item key="Created">Created</Menu.Item>
        <Menu.Item key="Updated">Updated</Menu.Item>
        <Menu.Item key="Pushed">Pushed</Menu.Item>
      </Menu>
    );
    const directionMenu = (
      <Menu onClick={onClickDirection}>
        <Menu.Item key="Asc">Asc</Menu.Item>
        <Menu.Item key="Desc">Desc</Menu.Item>
      </Menu>
    );


    useEffect( () => {
        axios
        .get(`${user.repos_url}?sort=${sort}&direction=${direction}`)
        .then( res => {
            setRepos(res.data)
            setLoading(false)
            console.log(repos)
        })
        .catch( err => {
            console.log(err.message)
        })
    }, [user.repos_url, sort, direction]);

   

    return (
        <>
            <Sorting>
                <Title level={3}>User Repos</Title>
                <Dropdown overlay={sortMenu}>
                    <a style={{color:'black'}} onClick={e => e.preventDefault()}> {/* eslint-disable-line  */}
                        {sort} <DownOutlined />
                    </a>
                </Dropdown>
                <Dropdown overlay={directionMenu}>
                    <a style={{color:'black'}} onClick={e => e.preventDefault()}> {/* eslint-disable-line  */}
                        {direction} <DownOutlined />
                    </a>
                </Dropdown>
            </Sorting>
            <Repos>
                {loading ? <></> :
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