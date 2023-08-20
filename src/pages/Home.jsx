import React from 'react'
import { base_url } from '../utils/constant'
import LogoutButton from '../components/Logout/Logout'
import Display from '../components/Home/Display'
import FirebaseUpload from '../components/ImageUpload/FirebaseUpload'
import Post from '../components/Post/Post'

import { Button } from 'antd'
import Header1 from './Header'
const Home = () => {

  const postsa = () =>{
    return <Post/>
  }
  return (
    <>
      <Header1/>
      <LogoutButton />
      <Display />
     
    </>
  );
}

export default Home
