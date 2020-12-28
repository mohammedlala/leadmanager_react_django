import { Box, Button, FormControl, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { addLead } from '../../actions/leads';
import { useDispatch } from 'react-redux'

const useStyles = makeStyles({
  paper:{
    margin: 'auto',
    width: 'fit-content',
    marginTop: '3rem',
    padding: '1.5rem'
  },
  field: {
    width: '20rem',
    paddingBottom: '1rem',
    marginLeft: '2rem',
    marginRight: '2rem'
  }
});

const Form = () => {
  const classes = useStyles();
  const defaultState = {
    name: '',
    email: '',
    message: '',
  }

  const [value, setValue] = useState(defaultState)
  const dispatch = useDispatch() 
  
  const handleChange = (event) => {
    event.preventDefault()
    setValue({...value, [event.target.name]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const {name, email, message} = value
    const lead = {name, email, message}
    dispatch(addLead(lead))
    setValue(defaultState)
  }

  return (
    <>
    <Paper className={classes.paper} elevation={3}>
      <Typography component='div' align='center' gutterBottom>
        <Box fontWeight='fontWeightBold' fontSize='h5.fontSize'>
          Add Form
        </Box>
      </Typography>
      <form onSubmit={handleSubmit} method='post'>
      <FormControl>
        <TextField label='Name' type='text' name='name' value={value.name} onChange={handleChange} variant='outlined' className={classes.field} autoFocus required />
        
        <TextField label='Email' type='email' name='email' value={value.email} onChange={handleChange} variant='outlined' className={classes.field} required />

        <TextField label='Message' type='text' name='message' value={value.message} onChange={handleChange} variant='outlined' multiline rows={4} className={classes.field} required />

        <Button type='submit' variant='contained' color='primary' size='large' style={{width:'9rem', margin: 'auto'}}>
          Submit
        </Button>
      </FormControl>
      </form>
    </Paper>
    
    </>
  )
}

export default Form
