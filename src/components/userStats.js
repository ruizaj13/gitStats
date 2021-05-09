import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Styled from 'styled-components';
import { connect } from 'react-redux';
import { Collapse, Tooltip, Pagination, Avatar, Badge, Typography, Card, Col, Row, Menu, Dropdown, message} from 'antd';
import { LoadingOutlined, GlobalOutlined, MailOutlined, TwitterOutlined, DownOutlined } from '@ant-design/icons';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import WorkIcon from '@material-ui/icons/Work';
import DoughnutChart from './Charts/DoughnutChart';
// import ghpolyglot from 'gh-polyglot';
import GitHubCalendar from 'react-github-calendar';
import ReactTooltip from 'react-tooltip';
import Title from 'antd/lib/skeleton/Title';

const { Panel } = Collapse;

const Followers = Styled(Collapse)`
width: 68.95%;
margin-left: 15%;
margin-top: 5%;
background-color: white;
`
const FollowersPanel = Styled(Panel)`
display: flex;
flex-direction: column;
margin: 2%;
`
const PersonalInfo = Styled.h2`
margin-left: 15%;
margin-bottom: 0%;
`
const SideBar = Styled.div`
width: 21%;
height:100vh; 
background-color: rgba(0,0,0,0.14);
overflow-y: hidden;
position:fixed;
left:0;
top:0;
right: 0;
z-index: 1000;
`
const User = Styled(Avatar)`
margin-top: 2%; 
margin-left: 10%;
margin-bottom: 5%;
`

const StatCard = Styled.img`
margin-left: 23%;
margin-top: -54.5%;
width: 54.8%;
background-color: rgba(255, 255, 255, 0.9);
border-radius: 10px;
`

const BuiltWith = Styled.div`
margin-left: 15%;
`

// const GhCalendar = Styled.div`
// margin-left: 25%;
// margin-top: 1%;
// padding: 10%;
// width: 70%;
// background-color: red;
// `


const UserStats = ({ user, error }) => {
    const [repos, setRepos] = useState()
    const [followers, setFollowers] = useState()
    const [following, setFollowing] = useState()
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [loading3, setLoading3] = useState(true);
    const { push } = useHistory();
    const { Title, Paragraph } = Typography;

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
        .get(`${user.followers_url}`)
        .then( res => {
            setFollowers(res.data)
            setLoading(false)
        })
        .catch( err => {
            console.log(err.message)
        })
    }, [user.login]);

    useEffect( () => {
        axios
        .get(`https://api.github.com/users/${user.login}/following`)
        .then( res => {
            setFollowing(res.data)
            setLoading2(false)
        })
        .catch( err => {
            console.log(err.message)
        })
    }, [user.login]);

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

    //sorts: created, updated, pushed
    //directions: asc, desc

    return (
        <>
            <SideBar>
                    <Badge count={`@${user.login}`} offset={[-106, 260]} size={'default'} style={{backgroundColor:'#4183C4'}} >
                        <a href={`${user.html_url}`} target='_blank' rel='noreferrer'>
                            <User src={user.avatar_url} alt='' size={264}/>
                        </a>
                    </Badge>
                {user.company ?
                    <PersonalInfo>
                        <WorkIcon/> {user.company} 
                    </PersonalInfo> :
                    <></>
                }
                {user.location ?
                    <PersonalInfo>
                        <LocationOnIcon/> {user.location} 
                    </PersonalInfo> :
                    <></>
                }
                { user.email ?  
                    <PersonalInfo>
                        <MailOutlined/> {user.email} 
                    </PersonalInfo> :
                    <></> 
                }       
                { user.blog ? 
                    <PersonalInfo>
                        <a href={`${user.blog}`} target='_blank' rel='noreferrer' style={{color: 'black'}}>
                            <GlobalOutlined/> {user.blog} 
                        </a>
                    </PersonalInfo> :
                    <></>
                }
                { user.twitter_username ? 
                    <PersonalInfo>
                        <a href={`https://www.twitter.com/${user.twitter_username}`} target='_blank' rel='noreferrer' style={{color: 'black'}}>
                            <TwitterOutlined/> {user.twitter_username} 
                        </a>
                    </PersonalInfo> :
                    <></>
                }
                <div>
                    <Followers accordion>
                        <FollowersPanel header={`Followers: ${user.followers}`} forceRender={'true'}>
                            {loading ? <LoadingOutlined/> : 
                            followers.map( item => {
                                return (
                                    <Avatar.Group>
                                        <Tooltip title={item.login}>
                                            <a href={item.html_url} target='_blank' rel='noreferrer'>
                                                <Avatar src={item.avatar_url} alt=''/>
                                            </a>
                                        </Tooltip>
                                    </Avatar.Group>
                                )
                            })}
                        </FollowersPanel>
                        <FollowersPanel header={`Following: ${user.following}`}>
                            {loading2 ? <LoadingOutlined/> : 
                            following.map( item => {
                                return (
                                    <Avatar.Group>
                                        <Tooltip title={item.login}>
                                            <a href={item.html_url} target='_blank' rel='noreferrer'>
                                                <Avatar src={item.avatar_url} alt=''/>
                                            </a>
                                        </Tooltip>
                                    </Avatar.Group>
                                )
                            })} 
                        </FollowersPanel>
                    </Followers>
                </div>
                <BuiltWith>
                    <Title level={4} style={{marginBottom:'-.5%'}}> Built With: </Title>
                    <ul>
                        <li>
                            <a href='https://reactjs.org/' target='_blank' rel='noreferrer'>
                                React.JS
                            </a>
                        </li>
                        <li>
                            <a href='https://ant.design/' target='_blank' rel='noreferrer'>
                                Ant Design
                            </a>
                        </li>
                        <li>
                            <a href='https://material-ui.com/' target='_blank' rel='noreferrer'>
                                Material-UI
                            </a>
                        </li>
                        <li>
                            <a href='https://github.com/IonicaBizau/node-gh-polyglot' target='_blank' rel='noreferrer'>
                                Github Polyglot
                            </a>
                        </li>
                        <li>
                            <a href='https://github.com/reactchartjs/react-chartjs-2' target='_blank' rel='noreferrer'>
                                React Chart.JS 2 / Chart.JS
                            </a>
                        </li>
                        <li>
                            <a href='https://styled-components.com/' target='_blank' rel='noreferrer'>
                                Styled Components
                            </a>
                        </li>
                    </ul>
                    <p>And More!</p>
                </BuiltWith>
            </SideBar>
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
            <div style={{ display:'flex', flexDirection:'row', flexWrap: 'wrap', justifyContent:'space-evenly', width:'75%', marginLeft:'23%', paddingBottom:'4%'}}>
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