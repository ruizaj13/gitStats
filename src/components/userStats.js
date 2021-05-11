import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Styled from 'styled-components';
import { connect } from 'react-redux';
import { Typography, Card, Col, Row, Menu, Dropdown, message} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import DoughnutChart from './Charts/DoughnutChart';
import GitHubCalendar from 'react-github-calendar';
import ReactTooltip from 'react-tooltip';
import Title from 'antd/lib/skeleton/Title';
import GitHubColors from 'github-colors';
// var GitHubColors = require("github-colors");
import SideBar from './SideBar/SideBar';


const StatCard = Styled.img`
margin-left: 23%;
margin-top: -54.9%;
width: 54.8%;
background-color: rgba(255, 255, 255, 0.9);
border-radius: 10px;
`


const UserStats = ({ user, error }) => {
    const [repos, setRepos] = useState()
    const [loading3, setLoading3] = useState(true);
    const { push } = useHistory();
    const { Title } = Typography;
   
    useEffect( () => {
        const check =() => {
            if (error){
                push('/NotFound')
            }
        }
        check()
    },[error])


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

    useEffect( () => {
        // GitHubColors.init(true)
        console.log(GitHubColors.get('C++', true))
    }, [])

    //sorts: created, updated, pushed
    //directions: asc, desc

    return (
        <>
            <SideBar/>
            <DoughnutChart/>
            <GitHubCalendar username={user.login} color="hsl(203, 82%, 33%)" Tooltips='true' fontSize= {16} blockSize={17} blockMargin={3} style={{
                width:'75%', 
                marginLeft:'23%', 
                marginTop:'1%', 
                paddingLeft:'3.8%', 
                paddingTop:'1.1%', 
                paddingBottom:'0.1%', 
                backgroundColor:'rgba(255, 255, 255, 0.9)', 
                border: '2px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '10px'
                }}>
                <ReactTooltip delayShow={50} html />
            </GitHubCalendar>
            <StatCard  alt="github stats" src={`https://readme-stats-eta-three.vercel.app/api?username=${user.login}&bg_color=00000000&show_icons=true&include_all_commits=true&count_private=true`} /> 
            <div style={{display:'flex', flexDirection:'row', alignItems:'baseline', justifyContent:'space-between', width:'15%', height:'4vh',marginLeft:'23%'}}>
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
            </div>
            <div style={{ display:'flex', flexDirection:'row', flexWrap: 'wrap', justifyContent:'space-evenly', width:'75%', marginLeft:'23%', paddingBottom:'3%'}}>
                {loading3 ? <></> :
                    repos.slice(0,6).map(repo => {
                        return (
                            <Row>
                                <Col>
                                    <Card title={repo.name} style={{width:'375px', height:'25vh', marginTop:'5%', backgroundColor:'rgba(255, 255, 255, 0.9)',border: '2px solid rgba(0, 0, 0, 0.1)', borderRadius: '10px'}}>
                                        {/* <p>{repo.description}</p> */}
                                        <p>{repo.language}</p>
                                    </Card>
                                </Col>
                            </Row>
                        )
                    })
                }
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {user: state.user, error: state.error}
}

export default connect(mapStateToProps)(UserStats);