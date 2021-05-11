import React, { useState, useEffect} from 'react';
import ghpolyglot from 'gh-polyglot';
import { connect } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

import { Doughnut } from 'react-chartjs-2';
import Styled from 'styled-components';

const Chart = Styled.div`
font-family:'Share Tech';
background-color: rgba(255, 255, 255, 0.9);
border: 2px solid rgba(0, 0, 0, 0.1);
border-radius: 10px;
padding-top: 1.5%;
/* margin-top: 1em; */
margin-bottom: -.5%;
margin-left: 78%; 
width: 19.9%;
height: 41.8vh;
`
const Spinner = Styled(LoadingOutlined)`
margin-left: 40%;
margin-top: 40%;
font-size: 320%;
`



const DoughnutChart = ({user}) => {
    const [stats, setStats] = useState()
    const [loading, setLoading] = useState(true);
    const { Title } = Typography;


    useEffect(() => {
        const me = new ghpolyglot(`${user.login}`)
        me.userStats((err, stats) => {
            setStats(stats)
            //setTimeout is needed to allow loading time for proper rendering
            setTimeout(() => {
                setLoading(false)
              }, 1500)
        }) 
    }, [user.login]);
    console.log(stats)
    
    return (
        <Chart>
            <Title level={5} style={{marginLeft:'31%', marginTop:'-7.5%', marginBottom:'-1.5%'}}>Top Languages</Title>
            { loading ? <Spinner/> : 
            <Doughnut data={{
                labels: stats.map(item => `${item.label}`),
                datasets: [
                    {
                        data: stats.map(item => `${item.value}`),
                        backgroundColor: stats.map(item => `${item.color}`),
                        borderWidth: 1,
                    },
                ],
            }}/>
            }
        </Chart>
    )
};

const mapStateToProps = state => {
    return {user: state.user, error: state.error}
}

export default connect(mapStateToProps)(DoughnutChart);

