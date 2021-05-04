import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Styled from 'styled-components';
import { connect } from 'react-redux';
import ghpolyglot from 'gh-polyglot';
import { Collapse, Tooltip } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const ProfilePic = Styled.img`
width: 17%;
margin-top: 1%;
margin-left: 1%;
`

const Username = Styled.h1`
margin-left: 1%;
font-size: 200%;
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
    const [loading, setLoading] = useState(true);
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
            <ProfilePic src={user.avatar_url} alt=''/>
            <Username>@{user.login}</Username>
            <div>
                <Followers accordion>
                    <FollowersPanel header={`Followers: ${user.followers}`}>
                        {loading ? <LoadingOutlined/> : 
                        followers.map( item => {
                            return (
                                <>
                                    <Tooltip title={item.login}>
                                        <a href={item.html_url} target='_blank' rel='noreferrer'>
                                            <FollowerPics src={item.avatar_url} alt=''/>
                                        </a>
                                    </Tooltip>
                                </>
                            )
                        })}
                    </FollowersPanel>
                    <Panel header={`Following: ${user.following}`}> Placeholder </Panel>
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