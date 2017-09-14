import React from 'react'
import moment from 'moment'


export const LongDate = (props) => <span className="grey-if-empty">{ dateToString(serielToDate(props.value)) || '' }</span>

export const ShortDate = (props) => <span className="grey-if-empty">{ dateToShortString(serielToDate(props.value)) || '' }</span>


export const serielToDate = (seriel) => {
  var days = Math.floor(seriel) - 2
  var remainder = seriel % 1
  var hours = remainder * 24
  remainder = hours % 1
  hours = Math.floor(hours)

  var min = Math.round(remainder * 60)

  var end = moment('1900-01-01').add(days, 'days')
  end = moment(end).add(hours, 'hours')
  end = moment(end).add(min, 'minutes')

  return end.toDate()
}



export const dateToString = (date) => {
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  let day = date.getDate()
  let hour = date.getHours()
  let minutes = date.getMinutes()

  return month + '/' + day + '/' + year + ' ' + hour + ':' + minutes
}

export const dateToShortString = (date) => {
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  let day = date.getDate()

  return month + '/' + day + '/' + year
}