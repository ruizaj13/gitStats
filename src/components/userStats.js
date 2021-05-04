import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Styled from 'styled-components';
import { connect } from 'react-redux';
import ghpolyglot from 'gh-polyglot';
import { Collapse, Tooltip, Pagination, Avatar } from 'antd';
import { LoadingOutlined, UserOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const Username = Styled.h1`
margin-left: 3%;
font-size: 200%;
font-style: bold;
`

const Followers = Styled(Collapse)`
width: 16.95%;
margin-left: 1%;
`
const FollowersPanel = Styled(Panel)`
display: flex;
flex-direction: column;
margin: 2%;
`

const FollowerPics = Styled.img`
width: 20%;
margin: 2%;
`


const UserStats = ({ user }) => {
    const [stats, setStats] = useState()
    const [followers, setFollowers] = useState()
    const [following, setFollowing] = useState()
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    console.log(user)
    

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

        me.userStats(function(err, stats){
        console.log(err||stats)
        setStats(stats)
        }) 
    }, [user.login]);
 
    console.log(stats)
    console.log(followers)

    return (
        <>
            <Avatar src={user.avatar_url} alt='' size={264} style={{marginTop: '1%', marginLeft: '1%'}} />
            <Username>@{user.login}</Username>
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
                        {/* <Pagination simple defaultPageSize={28} total={80} /> */}
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
            <h2>Employment Status:{user.hireable ? 'Open To Work' : ''}</h2>
            <h2>Location: {user.location}</h2>
        </>
    )
}

const mapStateToProps = state => {
    return {user: state.user}
}

export default connect(mapStateToProps)(UserStats);