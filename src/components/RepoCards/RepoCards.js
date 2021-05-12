import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Styled from 'styled-components';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import { Typography, Card, Col, Row, Menu, Dropdown, Badge } from 'antd';
import { DownOutlined, ForkOutlined, StarOutlined, BranchesOutlined, LinkOutlined } from '@ant-design/icons';
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

const RepoCards = ({ user }) => {
    const [repos, setRepos] = useState();
    const [sort, setSort] = useState('pushed');
    const [direction, setDirection] = useState('desc');
    const [loading, setLoading] = useState(true);
    const { Title } = Typography;
    const { Meta } = Card;

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
        <Menu.Item key="asc">Asc</Menu.Item>
        <Menu.Item key="desc">Desc</Menu.Item>
      </Menu>
    );


    useEffect( () => {
        axios
        .get(`${user.repos_url}?sort=${sort}&direction=${direction}`)
        .then( res => {
            setRepos(res.data)
            setLoading(false)
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
                        {sort.charAt(0).toUpperCase()+ sort.slice(1)} <DownOutlined />
                    </a>
                </Dropdown>
                <Dropdown overlay={directionMenu}>
                    <a style={{color:'black'}} onClick={e => e.preventDefault()}> {/* eslint-disable-line  */}
                        {direction.charAt(0).toUpperCase()+ direction.slice(1)} <DownOutlined />
                    </a>
                </Dropdown>
            </Sorting>
            <Repos>
                {loading ? <></> :
                    repos.slice(0,6).map(repo => {
                        return (
                            <Row key={repo.id}>
                                <Col >
                                <QueueAnim type={['right', 'left']} ease={['easeOutQuart', 'easeInOutQuart']}>
                                    <Card title={repo.name} extra={<a href={repo.html_url} target='_blank' rel='noreferrer'><LinkOutlined /></a>} key={repo.id} style={{
                                        width: '375px', 
                                        height: '25vh', 
                                        marginTop: '5%', 
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        border: '2px solid rgba(0, 0, 0, 0.1)', 
                                        borderRadius: '10px'
                                    }}>
                                        <Meta avatar={ <BranchesOutlined/> } style={{position:'absolute',marginTop:'-16.5%', marginLeft:'-4.6%'}}/>
                                        <Title level={5} style={{position:'absolute'}}>{repo.description}</Title>
                                        <div style={{display:'flex', justifyContent:'space-between'}}>
                                            <div style={{display:'flex', marginTop:'25%'}}>
                                                <Badge color={GitHubColors.get(`${repo.language}`, true).color}/>
                                                {GitHubColors.get(`${repo.language}`) === undefined ? <p>N/A</p> : <p>{repo.language}</p>}
                                            </div>
                                            <div style={{display:'flex', alignItems:'baseline', marginTop:'25%', marginLeft:'-10%'}}>
                                                <StarOutlined style={{marginRight:'15%'}}/><p>{repo.stargazers_count}</p>
                                            </div>
                                            <div style={{display:'flex', alignItems:'baseline' ,marginTop:'25%', marginRight:'30%'}}>
                                                <ForkOutlined style={{marginRight:'15%'}}/><p>{repo.forks_count}</p>
                                            </div>
                                        </div>
                                    </Card>
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