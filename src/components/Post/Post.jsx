import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
// const API = process.env.REACT_APP_API_ENDPOINT;
import { base_url } from "../../utils/constant";
import { Button, Upload, Form, Input, Typography, message } from "antd";
import ImageUpload from "../ImageUpload/Imageupload";
const { Title } = Typography;
const { TextArea } = Input;
// const url = `${base_url}/upload`;
const Post = () => {
  const [decodedUserId, setDecoded] = useState();

  const [getImage, setGetImage] = useState([]);
  const [file, setFile] = useState();
  const [caption, setCaption] = useState();

  const [loading, setLoading] = useState(false);
  const [path, setPath] = useState([]);
  const [fpath, setFpath] = useState();

  useEffect(() => {
    const getAccessTokenFromLocalStorage = () => {
      const accessToken = localStorage.getItem("access_token");
      //console.log(accessToken);

      if (accessToken) {
        // Decode the JWT and set the decoded values in state
        try {
          const decoded = jwtDecode(accessToken);
          // console.log(decoded.user_id);
          setDecoded(decoded.user_id);
        } catch (error) {
          // Handle decoding errors
          console.error("Error decoding JWT:", error);
        }
      }
    };

    getAccessTokenFromLocalStorage();
  }, []);

  const handleOnChange = ({ file, fileList, event }) => {
    //  console.log(file.response);
    if (file.response) {
      const path = file.response;
      setPath(path);
      console.log(path);
    } else {
      // console.log("error empty response")
    }
  };

  const AddPost = async () => {
    const Postdata = { fpath, decodedUserId, caption };
    console.log(Postdata);
    // if(!path || !decodedUserId || !caption){
    //   console.log("fill");
    //   message.error("Please fill all fields");
    // }
    if (!fpath) {
      message.error("Please select an image");
    } else if (!decodedUserId) {
      message.error("Please log in");
      window.location.href = "/login";
    } else if (!caption) {
      message.error("Please enter a caption");
    } else {
      // All conditions are met, proceed with the action
      // ...

      // const url = `${base_url}/post`;
      const url = `${base_url}/post`;
      try {
        const response = await axios.post(url, {
          path: Postdata.fpath.url,
          userId: Postdata.decodedUserId,
          caption: Postdata.caption,
          token : localStorage.getItem("access_token"),
        });
        console.log(response.data);
        window.location.href = "/home";
      } catch (err) {
        console.log(err);
        console.log(err.response.status);
        if (err.response.status === 500) {
          localStorage.clear();
          message.error("User not found please try Login again");
          window.location.href = "/login";
        } else if(err.response.status === 403){
          localStorage.clear();
          message.error("Data Not found please try Login again");
          window.location.href = "/login";
        } else if(err.response.status ===401){
          localStorage.clear();
          message.error("Token is invalid Please try Login again");
          window.location.href = "/login";
        }
      }
    }
  };

  const handleData = (data) => {
    setFpath(data);
  };

  return (
    <div className="center-post-items">
      <div style={{ width: 400, margin: "0 auto", padding: 20 }}>
        <Title level={3}>Post Image</Title>
        <ImageUpload send={handleData} />
        <Form name="register" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          {/* Full Name Field */}
          <Form.Item
            label="Caption"
            name="caption"
            rules={[
              {
                required: true,
                message: "Please enter caption for your image",
              },
            ]}
          >
            {/* <Input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              bordered={false}
              showCount
              maxLength={200}
            /> */}
            <TextArea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              bordered={true}
              showCount
              maxLength={200}
            ></TextArea>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button block type="primary" htmlType="submit" onClick={AddPost}>
              Post
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Post;
