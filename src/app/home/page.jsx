import React from 'react'
import Home from '../../components/book-appointment/Home'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

const page = ({searchParams}) => {
  const session = cookies().get('session')?.value;
  if(!session)return redirect(`${process.env.NEXT_SERVER ?? 'http://localhost:3000/'}`)
  return (
    <Home userParams={searchParams}></Home>
  )
}

export default page