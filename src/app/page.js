
import React from 'react'
import DBConnection from './utils/config/db'
import { auth } from './auth'
import { redirect } from 'next/navigation'
import UserNavigation from './components/UserNavigation'
import AdminPage from './admin/page'
import ProductCollection from './components/ProductCollection'
import Image from 'next/image'
import bannerImg from '../../public/banner.jpg';

const HomePage = async() => {

  const session = await auth()

  await DBConnection()
 
  if(!session){
    redirect("/login")
  }



  // console.log('user check: ', userName)

  console.log("role check;:", session.role)

  console.log("username chekc:", session.username)

  const userName = session.username




  return (
    <div>
      {session.role === 'user' &&  (
        <>
        <UserNavigation userName = {userName}/>
        <Image src={bannerImg} alt='banner' className='bannerImage' width={250} height={250}></Image>
        <ProductCollection />
        </>
      ) }
      {session.role === 'admin' &&
        <AdminPage /> 
    }
    </div>
  )
}

export default HomePage
