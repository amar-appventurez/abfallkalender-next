import React from 'react'
import Home from '../../components/book-appointment/Home'
import { cookies } from 'next/headers'
import { redirect } from 'next/dist/server/api-utils';

const page = ({searchParams}) => {
  const session = cookies().get('session');
  if(!session)return redirect('/')
  return (
    <Home userParams={searchParams}></Home>
  )
}

export default page