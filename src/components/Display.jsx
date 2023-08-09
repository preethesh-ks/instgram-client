import React ,{useState,useEffect} from "react";
import { Card, Avatar, Row, Col, Button, } from "antd";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { base_url } from "../utils/constant";
import axios from "axios";
const { Meta } = Card;

// const data = [
//   {
//     name: "John Doe",
//     image:
//       "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
//     likes: 10,
//     comments: 5,
//   },
//   {
//     name: "John Doe",
//     image:
//       "https://firebasestorage.googleapis.com/v0/b/instgram-images.appspot.com/o/images%2FSample-JPEG-Image-File-Download-scaled.jpg?alt=media&token=83bebac8-e6a0-42c7-9629-2065ad22ce58",
//     likes: 10,
//     comments: 5,
//   },
//   {
//     name: "John Doe",
//     image:
//       "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
//     likes: 10,
//     comments: 5,
//   },
//   {
//     name: "John Doe",
//     image:
//       "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
//     likes: 10,
//     comments: 5,
//   },
//   {
//     name: "John Doe",
//     image:
//       "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
//     likes: 10,
//     comments: 5,
//   },
//   {
//     name: "John Doe",
//     image:
//       "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
//     likes: 10,
//     comments: 5,
//   },

//   // Add more data entries here as needed
// ];

const geturl = "http://localhost:8080/getimage"


const Display = () => {

  const [data,setData] = useState([])

const fetchAPi = async() =>{
 try {
   const response = await axios.get(geturl);
   console.log(response.data);
   const jsonData = response.data;
   console.log(jsonData);
   setData(jsonData);
 } catch (e) {
   console.log(e);
 }
}

const userD = async () => {


}
   
    console.log(data);

    useEffect(() => {
      fetchAPi();
    }, [])
    


  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Row gutter={16} justify="center">
        {data.map((item, index) => (
          <Col span={24} key={index} className="center-post">
            <Card
              size="small"
              style={{ width: 500, marginBottom: 20 }}
              hoverable
              cover={<img alt="avatar" src={item.path} />}
              actions={[
                <a>
                  <SettingOutlined key="setting" />:{item.likes}
                </a>,
                // <a>
                //   <EditOutlined key="edit" />:
                //   {item.comments.map((comment) => (
                //     <li key={comment.id}>{comment[1]}</li>
                //   ))}
                // </a>,
                <EllipsisOutlined key="ellipsis" />,
                <>
                  <Link to="aa">
                    <Button key="delete" type="primary">
                      Delete
                    </Button>
                  </Link>
                </>,
              ]}
            >
              {/* <Card type="inner" title="inner"></Card> */}
              <Link to="sss">
                <Meta
                  avatar={<Avatar src={item.profilepic} />}
                  title={item.username}
                  description={`Caption:${item.caption} Likes: ${item.likes}, Comments: ${item.comments}`}
                />
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>

    // <>
    //   {/* <Row>
    //     {data.map((item, index) => (
    //       <Col span={24} className="center">
    //         <Button>j</Button>
    //       </Col>
    //     ))}
    //   </Row> */}
    // </>
  );
};

export default Display;
