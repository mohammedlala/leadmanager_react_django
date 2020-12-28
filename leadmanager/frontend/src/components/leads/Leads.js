import React, {useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLead, getLeads } from '../../actions/leads';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IconButton, Tooltip } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  table: {
    //minWidth: 500,
  },
  
});
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const Leads = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const leadlist = useSelector((state => state.leads))
  const {loading, leads} = leadlist

  useEffect( () => {
        dispatch( getLeads() )
    }, [dispatch])

    return (
      <>
        {loading ? 
          <table style={{marginTop: '3rem'}}>
            <tr>
              <th>
                <Skeleton variant="rect" animation='wave' width={460} height={50} />
              </th>
            </tr>
            <tr>
              <td><Skeleton variant="rect" animation='wave' height={30} /></td>
            </tr>
            <tr>
              <td><Skeleton variant="rect" animation='wave' height={30} /></td>
            </tr>
            <tr>
              <td><Skeleton variant="rect" animation='wave' height={30} /></td>
            </tr>
            <tr>
              <td><Skeleton variant="rect" animation='wave' height={30} /></td>
            </tr>
            <tr>
              <td><Skeleton variant="rect" animation='wave' height={30} /></td>
            </tr>
          </table>
        :
        <TableContainer component={Paper} elevation={3} style={{marginTop: '3rem', width: '100%'}}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Message</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leads.length > 0 &&
                leads.map((lead) => (
                <StyledTableRow key={lead.id}>
                  <StyledTableCell align="center">{lead.name}</StyledTableCell>
                  <StyledTableCell align="center">{lead.email}</StyledTableCell>
                  <StyledTableCell align="center">{lead.message}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Tooltip title='Delete Lead'>
                      <IconButton type='submit' color="primary" component="span" onClick={() => dispatch(deleteLead(lead.id))}>
                          <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              {
                leads.length === 0 &&
                <StyledTableRow>
                    <StyledTableCell colSpan={4} align='center'>
                        There is no Data
                    </StyledTableCell>
                </StyledTableRow>
              }  
            </TableBody>
          </Table>
        </TableContainer>
      }
      </>
    );
  }

export default Leads