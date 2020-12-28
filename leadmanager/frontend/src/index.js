import React from 'react'
import App from './components/App';
import ReactDOM from 'react-dom'

ReactDOM.render(<App />, document.getElementById('root'))

// const numbers = [1,2,3]

// const index = numbers.indexOf(2)
// const added = [...numbers.slice(0,index), 4, ...numbers.slice(index)]
// console.log(added, '\n4 added')

// const deleted = added.filter(number => number!==2)
// console.log(deleted, '\n2 deleted')

// const updated = deleted.map(n => (n === 4 ? 40 : n))
// console.log(updated, '\n4 updated to 40')

//import {Map} from 'immutable'
// import {produce} from 'immer'

// let book = {title: 'Harry Potter'}

// const publish = book => {
//   return (
//     produce(book, state => {
//       state.isPublised = true
//     })
//   )
// }

// let updated = publish(book)

// console.log(book)
// console.log(updated)