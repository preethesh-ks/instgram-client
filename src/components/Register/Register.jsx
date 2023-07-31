import React,{useState} from 'react'
import { Form, Input, Button, Typography, notification ,message} from "antd";

import axios from 'axios';
const { Title } = Typography;

const Register = () => {
    const [full_name,setFull_Name] = useState("");
    const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [responseData, setResponseData] = useState(null);

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
   const userdata = { email,full_name, password};
   console.log(userdata);
   const url = "http://localhost:5000/register";

   try {
     const response = await axios.post(url, {
       email: userdata.email,
       full_name:userdata.full_name,
       password: userdata.password,
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
     console.log(error.response);
     notification.error({
       message: `${
         error?.response?.data?.message || "Something Went Wrong, Try Again!"
       }`,
       description: "Make sure you have entered right email and password and name.",
     });
     const emptyField = error.response.status;
     if (emptyField === 401) {
       console.log("NOT WORKING");
    //    setShowInvalidCredentialsDialog(true);
     }
   }
 };



  return (
    <div style={{ width: 400, margin: "0 auto", padding: 20 }}>
      <Title level={3}>Register</Title>
      <Form name="register" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        {/* Full Name Field */}
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
        >
          <Input.Password />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" onClick={Submit}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register
