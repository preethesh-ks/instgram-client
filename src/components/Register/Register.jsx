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
console.log(full_name,email,password);
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
              notification.error("Something Went Wrong, Try Again!");
              break;
       
   }
 };
 }


  return (
    <div className="center ">
      <Form
        name="register"
        labelAlign="left"
        labelWrap
        labelCol={{ span: 6 }}
        wrapperCol={{ flex: 6 }}
        // className="box-shadow"
      >
        {/* Full Name Field */}
        <Title className="pad-3" level={3}>
          Register || Instgram
        </Title>
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: "Please enter your full name!" }]}
        >
          <Input
            value={full_name}
            onChange={(e) => setFull_Name(e.target.value)}
          />
        </Form.Item>

        {/* Email Field */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>

        {/* Password Field */}
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please enter your password!" },
            { min: 6, message: "Password must be at least 6 characters!" },
          ]}
            >
              <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        {/* Confirm Password Field */}
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            { required: true, message: "Please confirm your password!" },
            validateConfirmPassword,
          ]}
          className="text-align"
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Profile Picture"
          name="profilePic"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "text", message: "Please enter a valid email address!" },
          ]}
        >
          <Input
            value={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="username"
          name="username"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "text", message: "Please enter a valid email address!" },
          ]}
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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