import React from 'react';
import Styled from 'styled-components';

import Img from '../assets/AccurateUnfinishedBergerpicard-size_restricted.gif';

const Page = Styled.div`
overflow-y: hidden;
`

const Message = Styled.h1`
margin-left: 40%;
margin-top: 15%;
`

const Travolta = Styled.img`
margin-left: 30%;
margin-top: -3.8%;
height: 71vh;
`

const NotFound = () => {
    return (
        <Page>
            <Message>Nothing To See Here</Message>
            <Travolta src={Img} alt='confused john travolta'/>
        </Page>
    )
}

export default NotFound;
