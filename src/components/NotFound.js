import React from 'react';
import { connect } from 'react-redux'

import Styled from 'styled-components';

import Img from '../assets/AccurateUnfinishedBergerpicard-size_restricted.gif';

const Page = Styled.div`
overflow-y: hidden;
`

const Message = Styled.h1`
margin-left: 40%;
margin-top: 15%;
font-family:'Share Tech';
`

const Travolta = Styled.img`
margin-left: 30%;
margin-top: -3.8%;
height: 71vh;
`

const NotFound = ({error}) => {


    return (
        <Page>
            {error === 'Request failed with status code 403' ? <Message>API Limit Has Been Reached</Message> : <Message>User Not Found</Message>}
            <Travolta src={Img} alt='confused john travolta'/>
        </Page>
    )
}

const mapStateToProps = state => {
    return {user: { ...state.user }, error: state.error}
}

export default connect(mapStateToProps)(NotFound)
