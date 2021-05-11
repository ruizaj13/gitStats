import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { Card, Typography } from 'antd';


const RequestCounter = () => {
    const [count, setCount] = useState()
    const [loading, setLoading] = useState(true)
    const {Title} = Typography

    useEffect(() => {
        axios
            .get('https://api.github.com/rate_limit')
            .then(res => {
                setCount(res.data.rate)
                setLoading(false)
            })
    },[])

    console.log(count)
    return (
        <>
            <Card style={{width:'68.95%', height: '6vh', margin:'15%', marginTop:'1.5%', border: '1px solid rgba(0, 0, 0, 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.9)'}}>
                {loading ? <></>:<Title level={5} style={{margin:'-8%'}}>Requests: {count.remaining}/{count.limit}</Title>}
            </Card>
        </>
    )
}

export default RequestCounter;