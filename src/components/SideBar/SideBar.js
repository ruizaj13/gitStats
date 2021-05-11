import React, { useState, useEffect} from 'react';
import axios from 'axios';
import BuiltWith from './BuiltWith';
import RequestCounter from './RequestCounter'
import Styled from 'styled-components';
import { connect } from 'react-redux';
import { Collapse, Tooltip, Avatar, Badge } from 'antd';
import { LoadingOutlined, GlobalOutlined, MailOutlined, TwitterOutlined } from '@ant-design/icons';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import WorkIcon from '@material-ui/icons/Work';
import OctoCat from '../../assets/octocat.gif';


const { Panel } = Collapse;

const Followers = Styled(Collapse)`
width: 68.95%;
margin-left: 15%;
margin-top: 2%;
background-color:rgba(255, 255, 255, 0.9);
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
const Side = Styled.div`
width: 21%;
height:100vh; 
background-color: rgba(0,0,0,0.14);
overflow-y: hidden;
position:fixed;
left:0;
top:0;
right: 0;
z-index: 1000;
font-family:'Share Tech';
`
const User = Styled(Avatar)`
margin-top: 2%; 
margin-left: 10%;
margin-bottom: 5%;
`

const SideBar = ({ user }) => {
    const [followers, setFollowers] = useState();
    const [following, setFollowing] = useState();
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);

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
            <Side>
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
                    <Followers  accordion>
                        <FollowersPanel header={`Followers: ${user.followers}`} forceRender={'true'}>
                            {loading ? <LoadingOutlined/> : 
                            followers.map( item => {
                                return (
                                    <Avatar.Group>
                                        <Tooltip title={item.login} style={{fontFamily:'Share Tech'}}>
                                            <a href={item.html_url} target='_blank' rel='noreferrer'>
                                                <Avatar src={item.avatar_url} alt='' style={{fontFamily:'Share Tech'}}/>
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
                    <BuiltWith/>
                </div>
                <RequestCounter/>
                    <a href='https://github.com/ruizaj13/gitStats' target='_blank' rel='noreferrer'>
                        <img src={OctoCat} alt='octocat' style={{width:'40%', marginLeft:'30%', marginTop:'-11%'}}/>
                    </a>

            </Side>
        </>
    )
}

const mapStateToProps = state => {
    return {user: state.user}
}

export default connect(mapStateToProps)(SideBar);

