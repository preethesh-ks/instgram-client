import React, { useState, useEffect } from "react";
import { Card, Avatar, Row, Col, Button, Space, message, Image ,Spin} from "antd";
import { Link } from "react-router-dom";
import {
  HeartFilled,
  HeartOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import jwtDecode from "jwt-decode";
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

const geturl = "http://localhost:8080/api/home";

const Display = () => {
  const [data, setData] = useState([]);
  const [userLikes, setUserLikes] = useState({});
  const [decodedUserId, setDecoded] = useState();
  const [loading, setLoading] = useState(true);
  console.log(decodedUserId);
//console.log(userLikes);
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
      } else{
        console.log("no acces token")
      }
    };

    getAccessTokenFromLocalStorage();
  }, []);

  const fetchAPi = async () => {
    try {
      const response = await axios.get(geturl);
      console.log(response.data);
      const jsonData = response.data;

      const likedStatus ={} 
      jsonData.forEach((post) => {
        likedStatus[post._id] = post.likes.some(
          (like) => like.userId === decodedUserId
        ); 
      });
      console.log(jsonData);
      
      console.log(userLikes);
      setData(jsonData);
      setUserLikes(likedStatus);
      
    } catch (e) {
      console.log(e);
      message.error("Something Went Wrong Try Again!");
    }
  };
  const updateLike = async (postId) => {
    console.log(postId);
    const userId = decodedUserId;
    console.log(userId);
    try{
      const likeStatus = await axios.post(`http://localhost:8080/api/like`,{userId:userId,postId:postId});
      console.log(likeStatus);
      fetchAPi();
      
    }
    catch(error){
      console.log(error);
    }




  }
  const userD = async () => {};

  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      await fetchAPi(); // Fetch data and update userLikes
      setLoading(false); // Set loading to false after data is fetched and userLikes is updated
    };
    fetchData();
  }, [decodedUserId]);



  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {loading ? ( // Display Spin component while loading is true
        <Spin size="large" />
      ) : (
      <Row gutter={16} justify="center">
        {data.map((item, index) => (
          <Col span={15} key={index} className="center-post">
            <Card
              title={
                <div style={{}}>
                  <Space>
                    <Avatar src={item.path} className="profile-pic-meta" />

                    {item.username}
                  </Space>
                </div>
              }
              size="small"
              style={{ width: 400, marginBottom: 20 }}
              hoverable
              loading={loading}
              extra="sss"
              cover={
                <Link to="/ss">
                  <Image
                    src={item.path}
                    preview={false}        
                     style={{
                      borderRadius: "3px",
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                      width: "60%",
                    }}
                  />
                </Link>
              }
              actions={[
                // <Button
                //   key="like"
                //   type="button"
                //   onClick={() => updateLike(item._id)}
                // >
                //   <>
                //     {/* <HeartFilled twoToneColor="#eb2f96" />
                //     {item.likes.length} */}

                //     { userLikes[item._id] ? (
                //       <HeartFilled style={{ color: "hotpink" }} />
                //     ) : (
                //       <HeartOutlined />
                //     )}
                //     <Space />
                //     {/* <span style={{ paddingLeft: "10px" }}>
                //       {userLikes[item._id] ? "Liked" : "Like"}
                //     </span> */}
                //     <span> {item.likes.length} </span>
                //   </>
                //   {/* <HeartOutlined /> */}
                // </Button>,
                 <Button
                  key="like"
                  type="button"
                  onClick={() => updateLike(item._id)}
                >
                  {userLikes[item._id] !== undefined ? (
                   
                    <>
                      {userLikes[item._id] ? (
                        <HeartFilled style={{ color: "hotpink" }} />
                      ) : (
                        <HeartOutlined />
                      )}
                      <Space />
                      <span> {item.likes.length} </span>
                    </>
                  ) : (
                    // Show a loading or placeholder
                    "Loading..."
                  )}
                </Button>,
                // <a>
                //   <EditOutlined key="edit" />:
                //   {item.comments.map((comment) => (
                //     <li key={comment.id}>{comment[1]}</li>
                //   ))}
                // </a>,
                <CommentOutlined
                  style={{ fontSize: "20px", paddingTop: "5px" }}
                />,
                <>
                  <Link to="aa">
                    <Button key="delete" type="text">
                      Delete
                    </Button>
                  </Link>
                </>,
              ]}
            >
              {/* <Card type="inner" title="inner"></Card> */}
              <Link to="sss">
                <Meta title={`${item.caption}`} />
              </Link>
            </Card>
          </Col>
        ))}
      </Row>)}
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
