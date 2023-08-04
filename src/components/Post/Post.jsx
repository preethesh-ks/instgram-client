import React, { useState,useEffect } from 'react'
import axios from 'axios';
// const API = process.env.REACT_APP_API_ENDPOINT;
import { base_url } from '../../utils/constant';
import { Button, Upload, Form, Input ,Typography} from "antd";

const { Title } = Typography;
const url = `${base_url}/upload`;
const Post = () => {
const [getImage,setGetImage] = useState([])
    const [file,setFile] = useState();
    const [caption,setCaption] = useState()
      const userId = "64c52892ff7a0a651272e97e";

    const [loading, setLoading] = useState(false); 
     const [path, setPath] = useState([]);
     const handleOnChange = ({ file, fileList, event }) => {
      //  console.log(file.response);
       if(file.response){
         const path = file.response;
         setPath(path);
         console.log(path);
       }
       else {
        // console.log("error empty response")
       }
       
     };

     const AddPost = async()=>{
      const Postdata = await {path,userId,caption};
      console.log(Postdata);
      // const url = `${base_url}/post`;
        const url = "http://localhost:8080/post"
        try {
            const response = await axios.post(url,{
              path:Postdata.path,
              userId:Postdata.userId,
              caption:Postdata.caption
            })
            console.log(response.data);
        }catch(err){
        console.log(err);
        }


     }
    // const handleupload = async (e) => {

    //     const formdata = new FormData()
    //     formdata.append('file',file)
    //     try{
    //     const response = await axios.post(`${base_url}/upload`,formdata)
    //     console.log(response.data)
    // }
    // catch(err){
    //         console.log(err)
    //     }
    // }

  
    // useEffect(() => {
    //   const image = async () => {
    //     try {
    //       const getImage = await axios.get(`${base_url}/getimage`);
    //       setGetImage(getImage.data);
    //       console.log(getImage.data);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };
    //   image();
    // }, []);
    


  return (
    <div className="center-post-items">
      {/* <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleupload}>Upload</button> */}

      {/* //<img src={`http://localhost:8080/images/` + getImage} alt="i" /> */}
      {/* {getImage.map((item) => (
        <div key={item._id}>
          <img
            src={`${base_url}/Images/` + item.image}
            alt={item.name}
          />
        </div>
      ))} */}
      <div style={{ width: 400, margin: "0 auto", padding: 20 }}>
        <Title level={3}>Post Image</Title>

        <Upload
          name="file"
          action={"http://localhost:8080/api/upload"}
          listType="picture-circle"
          multiple
          onChange={handleOnChange}
        >
          helo
        </Upload>
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
            <Input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </Form.Item>

          {/* Email Field */}

          {/* Confirm Password Field */}

          {/* Submit Button */}
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button block type="primary" htmlType="submit" onClick={AddPost}>
              Post
            </Button>
            
          
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Post
