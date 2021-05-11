import React from 'react';
import Styled from 'styled-components';
import { Typography } from 'antd';

const BuiltWithList = Styled.div`
margin-left: 15%;
`

const BuiltWith = () => {
    const { Title } = Typography;


    return (
        <>
            <BuiltWithList>
                <Title level={4} style={{marginBottom:'-.5%'}}> Built With: </Title>
                <ul>
                    <li>
                        <a href='https://reactjs.org/' target='_blank' rel='noreferrer'>
                            React.JS
                        </a>
                    </li>
                    <li>
                        <a href='https://ant.design/' target='_blank' rel='noreferrer'>
                            Ant Design
                        </a>
                    </li>
                    <li>
                        <a href='https://material-ui.com/' target='_blank' rel='noreferrer'>
                            Material-UI
                        </a>
                    </li>
                    <li>
                        <a href='https://github.com/IonicaBizau/node-gh-polyglot' target='_blank' rel='noreferrer'>
                            Github Polyglot
                        </a>
                    </li>
                    <li>
                        <a href='https://github.com/reactchartjs/react-chartjs-2' target='_blank' rel='noreferrer'>
                            React Chart.JS 2 / Chart.JS
                        </a>
                    </li>
                    <li>
                        <a href='https://styled-components.com/' target='_blank' rel='noreferrer'>
                            Styled Components
                        </a>
                    </li>
                </ul>
                <p>And More!</p>
            </BuiltWithList>
        </>
    )
}

export default BuiltWith;