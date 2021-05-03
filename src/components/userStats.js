import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import ghpolyglot from 'gh-polyglot';
import { Collapse } from 'antd';

//TODO: GET CHART.JS WORKING WITH POLYGLOT DATA AND LOOK INTO THE GIT GRAPH NPM PACKAGE

const UserStats = ({user}) => {
    const { Panel } = Collapse;
    const [stats, setStats] = useState()
    console.log(user)
    const me = new ghpolyglot(`${user.login}`)

    useEffect(() => {
        me.userStats(function(err, stats){
        console.log(err||stats)
        setStats(stats)
        }) 
    }, [user]);
 
    console.log(stats)

    return (
        <>
            <h1>{user.login}</h1>
            <img src={user.avatar_url} alt='' style={{width: '10%'}}/>
            <div>
                <Collapse style={{width: '10%', marginLeft:'50%'}}>
                    <Panel header={`Followers: ${user.followers}`}> Placeholder </Panel>
                </Collapse>
                <Collapse style={{width: '10%'}}>
                    <Panel header={`Following: ${user.following}`}> Placeholder </Panel>
                </Collapse>
            </div>
            {/* <h2>Followers: {user.followers}</h2> */}
            {/* <h2>Following: {user.following}</h2> */}
            <h2>Employment Status:{user.hireable ? 'Open To Work' : ''}</h2>
            <h2>Location: {user.location}</h2>
        </>
    )
}

const mapStateToProps = state => {
    return {user: state.user}
}

export default connect(mapStateToProps)(UserStats);