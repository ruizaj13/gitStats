import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Styled from 'styled-components';
import { connect } from 'react-redux';
import ghpolyglot from 'gh-polyglot';
import { Collapse, Tooltip, Pagination, Avatar, Badge, Card } from 'antd';
import { LoadingOutlined, GlobalOutlined, MailOutlined } from '@ant-design/icons';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DoughnutChart from './Charts/DoughnutChart';

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


const UserStats = ({ user, error }) => {
    const [stats, setStats] = useState()
    const [followers, setFollowers] = useState()
    const [following, setFollowing] = useState()
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const {push} = useHistory()
    console.log(user)

    // useEffect( () => {
    //     const check =() => {
    //         if (user.login === undefined){
    //             push('/NotFound')
    //         }
    //     }
    //     check()
    // },[user.login])

    useEffect( () => {
        axios
        .get(`https://api.github.com/users/${user.login}/followers`)
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

    useEffect(() => {
        const me = new ghpolyglot(`${user.login}`)
        me.userStats((err, stats) => {
        // console.log(err||stats)
        setStats(stats)
        }) 
    }, [user.login]);
    console.log(stats)

    return (
        <div style={{width:'21%', height:'100vh', backgroundColor:'rgba(0,0,0,0.14)'}}>
            <a href={`${user.html_url}`} target='_blank' rel='noreferrer'>
                <Badge count={`@${user.login}`} offset={[-106, 260]} size={'default'} style={{backgroundColor:'#4183C4'}} >
                    <Avatar src={user.avatar_url} alt='' size={264} style={{
                        marginTop: '2%', 
                        marginLeft: '10%',
                        marginBottom:'5%'
                        }}/>
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
            <DoughnutChart/>
        </div>
    )
}

const mapStateToProps = state => {
    return {user: state.user, error: state.error}
}

export default connect(mapStateToProps)(UserStats);