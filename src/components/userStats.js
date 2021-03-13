import React from 'react'
import {connect} from 'react-redux'

const userStats = ({user}) => {
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