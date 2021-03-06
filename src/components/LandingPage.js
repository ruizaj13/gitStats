import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { connect } from 'react-redux'
import { getUser } from '../actions/actions'

import { TextField, InputAdornment, Fade } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import GitHubIcon from '@material-ui/icons/GitHub'
import img from '../assets/octocat.gif'



const useStyles = makeStyles({
    input: {
        width: '30%',
        marginLeft: '50%',
        marginTop: '26%',
        fontFamily:'Share Tech'
    },
    img: {
        width: '40%',
        marginTop: '-25%',
        marginLeft: '9%'
    }
})


const LandingPage = props => {
    const [formData, setFormData] = useState('')
    const {push} = useHistory()
    const classes = useStyles()


    const handleChange = (e) => {
        setFormData(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.getUser(formData)
        push('/userStats')
        setFormData('')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Fade in={true} timeout={3000}>
                    <TextField  name='username' className = {classes.input} label='username' onChange={handleChange} autoComplete='off' value={formData} InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <GitHubIcon/>
                            </InputAdornment>
                        )
                    }}/>
                </Fade>
            </form>
            <Fade in={true} timeout={2000}>
                <img className = {classes.img} src={img} alt='octocat'/>
            </Fade>
        </div>
    )
}

const mapStateToProps = state => {
    return {user: { ...state.user }, error: state.error}
}

export default connect(mapStateToProps, {getUser})(LandingPage);