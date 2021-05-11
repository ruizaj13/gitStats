import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Styled from 'styled-components';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import { Typography, Card, Col, Row, Menu, Dropdown, Divider } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import GitHubColors from 'github-colors';


const Sorting = Styled.div`
display: flex; 
flex-direction: row; 
align-items: baseline; 
justify-content: space-between; 
width: 17%; 
height: 4vh;
margin-left: 23%;
font-family:'Share Tech';
`

const Repos = Styled.div`
display: flex; 
flex-direction: row; 
flex-wrap: wrap; 
justify-content: space-evenly; 
width: 75%;  
margin-left: 23%; 
padding-bottom: 3%;
font-family:'Share Tech';
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
    const [repoLang, setRepoLang] = useState();
    const [sort, setSort] = useState('pushed');
    const [direction, setDirection] = useState('desc');
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
        <Menu.Item key="created">Created</Menu.Item>
        <Menu.Item key="updated">Updated</Menu.Item>
        <Menu.Item key="pushed">Pushed</Menu.Item>
      </Menu>
    );
    const directionMenu = (
      <Menu onClick={onClickDirection}>
        <Menu.Item key="asc">asc</Menu.Item>
        <Menu.Item key="desc">desc</Menu.Item>
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

   
    // useEffect( () => {
    //     // GitHubColors.init(true)
    //     console.log(GitHubColors.get(`${repos.language}`, true))
    // }, [loading])

    return (
        <>
            <Divider orientation="left">
            <Sorting>
                <Title level={3}>User Repos</Title>
                <Dropdown overlay={sortMenu}>
                    <a style={{color:'black'}} onClick={e => e.preventDefault()}> {/* eslint-disable-line  */}
                        {sort.charAt(0).toUpperCase()+ sort.slice(1)} <DownOutlined />
                    </a>
                </Dropdown>
                <Dropdown overlay={directionMenu}>
                    <a style={{color:'black'}} onClick={e => e.preventDefault()}> {/* eslint-disable-line  */}
                        {direction.charAt(0).toUpperCase()+ direction.slice(1)} <DownOutlined />
                    </a>
                </Dropdown>
            </Sorting>
            </Divider>
            <Repos>
                {loading ? <></> :
                    repos.slice(0,6).map(repo => {
                        return (
                            <Row>
                                <Col>
                                <QueueAnim type={['right', 'left']} ease={['easeOutQuart', 'easeInOutQuart']}>
                                    <Cards title={repo.name} key={repo.id}>
                                        <p>{repo.language}</p>
                                    </Cards>
                                </QueueAnim>    
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