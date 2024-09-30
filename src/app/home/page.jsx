import React from 'react'
import Home from '../../components/book-appointment/Home'


const page = ({searchParams}) => {
  return (
    <Home userParams={searchParams}></Home>
  )
}

export default page