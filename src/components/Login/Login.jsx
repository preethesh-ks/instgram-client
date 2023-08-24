import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  Form,
  Input,
  notification,
  message,
  Spin,
  Typography,
} from "antd";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import API_ENDPOINT from "../../config/axios";
import "../../index.css";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { base_url } from "../../utils/constant";
import {response} from "../../store/userSlice"
import { setResponse } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
const { Title } = Typography;

const Login = () => {
    const navigate = useNavigate();
const dispatch = useDispatch();
  const responseData = useSelector((state)=> state.user.response)
  // const [messageApi, contextHolder] = message.useMessage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [responseData, setResponseData] = useState(null);
  const [showInvalidCredentialsDialog, setShowInvalidCredentialsDialog] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
 
  //  console.log(responseData)


  //   console.log(email);
  // console.log(password);

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const Submit = async () => {
    setIsLoading(true);
    const userdata = { email, password };
   // console.log(userdata);
    const url = `${base_url}/login`;
try{
    try {
      const response = await axios.post(url, {
        email: userdata.email,
        password: userdata.password,
      });
     // console.log("response", response.data);
      // setResponseData(response.data);
      dispatch(setResponse(response.data))
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      // setTimeout(() => {
      //   message.success("login successful");
      // }, 2000);
      notification.success({
        message: `Login Successful`,
        description: "👋 Welcome Back!",
      });
      navigate("/home")
    } catch (error) {
     // console.log(error.response);
      const emptyField = error.response.status;
      switch (emptyField) {
        case 401:
          message.error("Invalid Credentials Try Again");
          break;
        case 404:
          message.error("All Input Fields Required. Try Again");
          break;
        default:
          notification.error("Something Went Wrong, Try Again!");
          break;
      }
      // setShowInvalidCredentialsDialog(true);
    } finally {
      setIsLoading(false); // Stop the loading spinner when the request is loaded
    }
    } catch (error) {
     // console.log(error);
      message.error("Something went wrong Try Again");}
  
  };
  const navigateRegister = () => {
     navigate("/register");
  }

  return (
    <div>
      
        <div className="login-page">
          <div className="arrange">
          <Spin className="pad" spinning={isLoading} tip="Loading..." size="large">
            <div className="arrange-2">
              <Form
                name="basic"
                // labelCol={{ span: 8 }}
                // wrapperCol={{ span: 26 }}
                initialValues={{ remember: true }}
                //   onFinish={onFinish}
                //   onFinishFailed={onFinishFailed}
                autoComplete="on"
              >
                <Title level={3} className="pad-2">
                  Login || InstGram
                </Title>

                <Form.Item
                  type="email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your Email!" },
                    {
                      type: "email",
                      message: "Please enter a valid email address!",
                    },
                  ]}
                >
                  <Input
                    
                    size="large"
                    prefix={<UserOutlined />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    allowClear
                    placeholder="Enter Your Email"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                  size="large"
                >
                  <Input.Password
                    size="large"
                    prefix={<LockOutlined />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    allowClear
                    placeholder="Enter your password"
                   
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                {/* <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item> */}

                <Form.Item>
                  <Button
                    size="large"
                    block
                    type="primary"
                    htmlType="submit"
                    onClick={Submit}
                    className=""
                  >
                    Login
                    {/* {isLoading ? <Spin /> : "Login"} */}
                  </Button>
                  <br /> or <br />
                  <Button block size="medium" onClick={navigateRegister}>
                    Register
                  </Button>
                </Form.Item>
              </Form>
            </div>

            <div className="register-button"></div>
            </Spin>
          </div>
        </div>
      
    </div>
  );
};

export default Login;
