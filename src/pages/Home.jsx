import React from 'react'
import { base_url } from '../utils/constant'
import LogoutButton from '../components/Logout/Logout'
import Display from '../components/Home/Display'
import FirebaseUpload from '../components/ImageUpload/FirebaseUpload'
const Home = () => {
  return (
    <div style={{ backgroundColor: "#FFF6DC" }}>
      <a href="http://localhost:3000/post">
        <button>Post</button>
      </a>
      <LogoutButton />
      <Display />
      {/* <FirebaseUpload /> */}
    </div>
  );
}

export default Home
