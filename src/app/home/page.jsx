import React from 'react'
import Home from '../../components/book-appointment/Home'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

const page = ({searchParams}) => {
  return (
    <Home userParams={searchParams}></Home>
  )
}

export default page