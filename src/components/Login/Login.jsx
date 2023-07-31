import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, notification,message } from "antd";
import axios from "axios";
import { Navigate } from "react-router-dom";
 import API_ENDPOINT from '../../config/axios';
import "../../index.css";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [showInvalidCredentialsDialog, setShowInvalidCredentialsDialog] =
    useState(false);
  //   console.log(email);
  // console.log(password);

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const Submit = async () => {
    const userdata = { email, password };
    console.log(userdata);
    const url = "http://localhost:5000/login";

    try {
      const response = await axios.post(url, {
        email: userdata.email,
        password: userdata.password,
      });
      console.log("response", response.data);
      setResponseData(response.data);
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      // setTimeout(() => {
      //   message.success("login successful");
      // }, 2000);
      notification.success({
        message: `Login Successful`,
        description: "👋 Welcome Back!",
      });
      window.location.href = "/home"
    } catch (error) {
      console.log(error.response);
      const emptyField = error.response.status;
      if (emptyField === 401) {
        console.log("invaalid credentials");
           notification.error({
             message: `${
               error?.response?.data?.message ||
               "Something Went Wrong, Try Again!"
             }`,
             description:
               "Make sure you have entered right email and password.",
           });
        // setShowInvalidCredentialsDialog(true);
      }
    }
  };


  return (
    <div>
      <div className="center">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          //   onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="login-text">Login</div>
          <Form.Item
            type="email"
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
            size="large"
          >
            <Input
              prefix={<UserOutlined />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            size="large"
          >
            <Input.Password
              prefix={<LockOutlined />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={Submit}
              className="login-form-button"
            >
              Login
            </Button>
            or 
            <a href="/register">
              <Button size="small">Register</Button>
            </a>
          </Form.Item>
        </Form>

        
        <div className="register-button"></div>
      </div>
    </div>
  );
};

export default Login;
