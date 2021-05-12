import React, {useEffect, useState} from 'react';
import axios from 'axios';
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

const NotFound = () => {
    const [limitHit, setLimitHit] = useState()


    useEffect(() => {
        axios
            .get('https://api.github.com/rate_limit')
            .then(res => {
                console.log(res.data.rate.remaining)
                if (res.data.rate.remaining === 0) {
                    setLimitHit(true)
                }
            })
    })


    return (
        <Page>
            {limitHit ? <Message>API Limit Has Been Reached</Message> : <Message>Nothing To See Here</Message>}
            <Travolta src={Img} alt='confused john travolta'/>
        </Page>
    )
}

export default NotFound;
