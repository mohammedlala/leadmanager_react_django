import React, { useEffect } from 'react'
import {useAlert} from 'react-alert'
import { useSelector } from 'react-redux'

function Alert() {
  const alert = useAlert()
  const errors = useSelector(state => state.errors)
  const messages = useSelector(state => state.messages)

  useEffect(() => {
    if (errors.msg.name){
      alert.error(`Name: ${errors.msg.name.join()}`)
    }
    if (errors.msg.name){
      alert.error(`Email: ${errors.msg.email.join()}`)
    }
    if (messages.deleteLead){
      alert.success(messages.deleteLead)
    }
    if (messages.addLead){
      alert.success(messages.addLead)
    }
    if (errors.msg.non_field_errors){
      alert.error(errors.msg.non_field_errors.join())
    }
    if (messages.loggedOut){
      alert.success(messages.loggedOut)
    }
    if (messages.passwordNotMatch){
      alert.error(messages.passwordNotMatch)
    }
    if (errors.msg.username){
      alert.error(errors.msg.username.join())
    }
  })

  return (
    <></>
  )
}

export default Alert
