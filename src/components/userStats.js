import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import Styled from 'styled-components';
import DoughnutChart from './Charts/DoughnutChart';
import GitHubCalendar from 'react-github-calendar';
import SideBar from './SideBar/SideBar';
import RepoCards from './RepoCards/RepoCards';
import ReactTooltip from 'react-tooltip';
import { useHistory } from 'react-router-dom';



const StatCard = Styled.img`
margin-left: 23%;
margin-top: -54.9%;
width: 54.8%;
background-color: rgba(255, 255, 255, 0.9);
border-radius: 10px;
font-family:'Share Tech';
`


const UserStats = ({ user, error }) => {
    const {push} = useHistory()

    useEffect(() => {
        if (error === 'Request failed with status code 404' || 'Request failed with status code 403' ){
            push('/NotFound')
        }
    }, [error, push])

    return (
        <>
            <SideBar/>
            <DoughnutChart/>
            <GitHubCalendar username={user.login} color="hsl(203, 82%, 33%)" Tooltips='true' fontSize= {16} blockSize={17} blockMargin={3} style={{
                width:'75%', 
                marginLeft:'23%', 
                marginTop:'1%', 
                paddingLeft:'3.8%', 
                paddingTop:'1.1%', 
                paddingBottom:'0.1%', 
                backgroundColor:'rgba(255, 255, 255, 0.9)', 
                border: '2px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
                fontFamily:'Share Tech'
                }}>
                <ReactTooltip delayShow={50} html />
            </GitHubCalendar>
            <StatCard  alt="github stats" src={`https://readme-stats-eta-three.vercel.app/api?username=${user.login}&bg_color=00000000&show_icons=true&include_all_commits=true&count_private=true`} /> 
            <RepoCards/>    
        </>
    )
}

const mapStateToProps = state => {
    return {user: state.user, error: state.error}
}

export default connect(mapStateToProps)(UserStats);