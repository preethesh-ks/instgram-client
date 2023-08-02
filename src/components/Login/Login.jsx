import React, { useEffect, useState } from "react";
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
import { Navigate } from "react-router-dom";
import API_ENDPOINT from "../../config/axios";
import "../../index.css";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title } = Typography;
const Login = () => {
  // const [messageApi, contextHolder] = message.useMessage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [showInvalidCredentialsDialog, setShowInvalidCredentialsDialog] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //   console.log(email);
  // console.log(password);

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const Submit = async () => {
    setIsLoading(true);
    const userdata = { email, password };
    console.log(userdata);
    const url = "http://localhost:8080/login";

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
      window.location.href = "/home";
    } catch (error) {
      console.log(error.response);
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
  };

  return (
    <div>
      <div className="center">
        <Spin className="center" spinning={isLoading} tip="Loading..." />

        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          //   onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Title level={3} center>
            Login
          </Title>
          <Form.Item
            type="email"
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your Email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
            size="large"
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              allowClear
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            size="large"
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              allowClear
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
            <a href="/register">
              <Button block size="small">
                Register
              </Button>
            </a>
          </Form.Item>
        </Form>

        <div className="register-button"></div>
      </div>
    </div>
  );
};

export default Login;
