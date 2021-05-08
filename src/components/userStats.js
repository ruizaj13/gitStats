import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Styled from 'styled-components';
import { connect } from 'react-redux';
import { Collapse, Tooltip, Pagination, Avatar, Badge, Card } from 'antd';
import { LoadingOutlined, GlobalOutlined, MailOutlined } from '@ant-design/icons';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DoughnutChart from './Charts/DoughnutChart';
// import ghpolyglot from 'gh-polyglot';
import GitHubCalendar from 'react-github-calendar';
import ReactTooltip from 'react-tooltip';

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
`
const User = Styled(Avatar)`
margin-top: 2%; 
margin-left: 10%;
margin-bottom: 5%;
`

const StatCard = Styled.img`
margin-left: 23%;
margin-top: -54.4%;
width: 54.5%;
background-color: rgba(255, 255, 255, 0.9);
border-radius: 10px;
`

// const GhCalendar = Styled.div`
// margin-left: 25%;
// margin-top: 1%;
// padding: 10%;
// width: 70%;
// background-color: red;
// `


const UserStats = ({ user, error }) => {
    const [followers, setFollowers] = useState()
    const [following, setFollowing] = useState()
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    // const [test, setTest] = useState()
    const {push} = useHistory()
    console.log(user)

    // useEffect(() => {
    //     const me = new ghpolyglot(`${user.login}`)
    //     me.repoStats((err, stats) => {
    //         console.log(err || stats);
    //     }) 
    // }, [user.login]);
    // console.log(test)


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


    return (
        <>
        <SideBar>
            <a href={`${user.html_url}`} target='_blank' rel='noreferrer'>
                <Badge count={`@${user.login}`} offset={[-106, 260]} size={'default'} style={{backgroundColor:'#4183C4'}} >
                    <User src={user.avatar_url} alt='' size={264}/>
                </Badge>
            </a>
            {user.location ?
                <PersonalInfo>
                    <LocationOnIcon/> {user.location} 
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
            { user.email ?  
                <PersonalInfo>
                    <MailOutlined/> {user.email} 
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
        </SideBar>
        <DoughnutChart/>
        {/* <GhCalendar> */}
            <GitHubCalendar username={user.login} color="hsl(203, 82%, 33%)" Tooltips='true' fontSize= {16} blockSize={17} blockMargin={3} style={{
                width:'75%', 
                marginLeft:'23%', 
                marginTop:'.5%', 
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
        </>
    )
}

const mapStateToProps = state => {
    return {user: state.user, error: state.error}
}

export default connect(mapStateToProps)(UserStats);