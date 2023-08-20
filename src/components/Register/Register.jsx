import React,{useState} from 'react'
import { Form, Input, Button, Typography, notification ,message} from "antd";
import { base_url } from "../../utils/constant";
import axios from 'axios';
const { Title } = Typography;

const Register = () => {
    const [full_name,setFull_Name] = useState("");
    const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [responseData, setResponseData] = useState(null);
    const [profilePic,setProfilePic] = useState();
    const [username,setUsername] = useState();
//console.log(full_name,email,password);
     const validateConfirmPassword = ({ getFieldValue }) => ({
       validator(_, value) {
         if (!value || getFieldValue("password") === value) {
           return Promise.resolve();
         }
         return Promise.reject("Passwords do not match!");
       },
     });

 const Submit = async () => {
   const userdata = { email,full_name, password ,profilePic,username};
   console.log(userdata);
   const url = `${base_url}/register`;
try{
   try {
     const response = await axios.post(url, {
       email: userdata.email,
       full_name:userdata.full_name,
       password: userdata.password,
       profilepic: userdata.profilePic,
       username: userdata.username
     });
     console.log("response ", response.data);
     setResponseData(response.data);
     localStorage.setItem("access_token", response.data.access_token);
     localStorage.setItem("refresh_token", response.data.refresh_token);
    notification.success({
      message: `Register Successful`,
      description: "👋 Welcome !",
    }); 
    window.location.href = "/home";
   } catch (error) {
     const emptyField = error.response.status;
     //console.log(error.response);
     
      switch (emptyField) {
      case 401:
              message.error("Invalid Credentials");
              break;
            default:
              message.error("Something Went Wrong, Try Again!");
              break;
       
   }
 };
}catch(e) {
  console.log("Error",e);
  message.error("Something Went Wrong, Try Again!");
}
 }


  return (
    <div className="center ">
      <Form
        name="register"
        // labelAlign="left"
        // labelWrap
        // labelCol={{ span: 6 }}
        // wrapperCol={{ flex: 6 }}
        // className="box-shadow"
      >
        {/* Full Name Field */}
        <Title className="pad-3" level={3}>
          Register || Instgram
        </Title>
        <Form.Item
          
          name="fullName"
          rules={[{ required: true, message: "Please enter your full name!" }]}
        >
          <Input
            value={full_name}
            onChange={(e) => setFull_Name(e.target.value)}
            placeholder='Full Name'
          />
        </Form.Item>

        {/* Email Field */}
        <Form.Item
         
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>
        </Form.Item>

        {/* Password Field */}
        <Form.Item
          
          name="password"
          rules={[
            { required: true, message: "Please enter your password!" },
            { min: 6, message: "Password must be at least 6 characters!" },
          ]}
            >
              <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
        </Form.Item>

        {/* Confirm Password Field */}
        <Form.Item
         
          name="confirmPassword"
          rules={[
            { required: true, message: "Please confirm your password!" },
            validateConfirmPassword,
          ]}
          className="text-align"
        >
          <Input.Password placeholder='Confirm Password'/>
        </Form.Item>
        <Form.Item
          
          name="username"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "text", message: "Please enter a valid email address!" },
          ]}
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='UserName'
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
          <Button block type="primary" htmlType="submit" onClick={Submit}>
            Register
          </Button>
          {/* <br /> or <br /> */}
          <br />
          <br />
          <a href="/login">
            <Button block size="small">
              Login
            </Button>
          </a>
        </Form.Item>
      </Form>
    </div>
  );
}


export default Register;