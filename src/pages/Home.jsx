import React from 'react'
import { base_url } from '../utils/constant'
import LogoutButton from '../components/Logout/Logout'
import Display from '../components/Home/Display'
import FirebaseUpload from '../components/ImageUpload/FirebaseUpload'
import Post from '../components/Post/Post'

import { Button } from 'antd'
const Home = () => {

  const postsa = () =>{
    return <Post/>
  }
  return (
    <div style={{ backgroundColor: "#FFF6DC" }}>
      <a href="http://localhost:3000/post">
        <button>Post</button>
      </a>
      <LogoutButton />
      <Display />
       <Button
                  key="like"
                  type="button"
                  onClick={postsa}
                >post </Button>
      {/* <FirebaseUpload /> */}
    </div>
  );
}

export default Home
