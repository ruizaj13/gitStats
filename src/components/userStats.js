import React from 'react'
import {connect} from 'react-redux'
import ghpolyglot from 'gh-polyglot'

//TODO: GET CHART.JS WORKING WITH POLYGLOT DATA AND LOOK INTO THE GIT GRAPH NPM PACKAGE

const userStats = ({user}) => {
    console.log({user})
    const me = new ghpolyglot(`${user.login}`)

    me.userStats(function(err, stats){
        console.log(err||stats)
    })

    return (
        <>
            <h1>{user.login}</h1>
            <img src={user.avatar_url} alt='' style={{width: '10%'}}/>
            <h2>{user.followers}</h2>
            <h2>{user.following}</h2>
            <h2>{user.hireable ? 'Open To Work' : ''}</h2>
            <h2>{user.location}</h2>
        </>
    )
}

const mapStateToProps = state => {
    return {user: state.user}
}

export default connect(mapStateToProps)(userStats);