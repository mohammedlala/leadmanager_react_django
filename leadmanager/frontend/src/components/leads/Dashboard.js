import { Box } from '@material-ui/core'
import React from 'react'
import Form from './Form'
import Leads from './Leads'

function Dashboard() {
  return (
    <Box display="flex" style={{flexWrap: 'wrap'}}>
      <Box flexGrow={1} style={{height: 'fit-content', marginTop: '3rem'}}>
        <Form />
      </Box>
      <Box flexGrow={1} style={{height: 'fit-content', width: 'fit-content', marginTop: '3rem'}}>
        <Leads />
      </Box>
    </Box>
  )
}

export default Dashboard
