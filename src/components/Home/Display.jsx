import React, { useState, useEffect } from "react";
import {
  Card,
  Avatar,
  Row,
  Col,
  Button,
  Space,
  message,
  Image,
  Spin,
} from "antd";
import { Link } from "react-router-dom";
import {
  HeartFilled,
  HeartOutlined,
  CommentOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Comment from "../../pages/Comment";
import { useSelector,useDispatch } from "react-redux";
import {
  setSelectedCardIndex,
  setCommentBoxVisibility,
  toggleCommentBox,
} from "../../store/cardSlice";
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

const geturl = `${process.env.REACT_APP_API_ENDPOINT}api/home`;

const Display = () => {
  // const [comment,setComment] = useState(false)
  const [data, setData] = useState([]);
  const [userLikes, setUserLikes] = useState({});
  const [decodedUserId, setDecoded] = useState();
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  // const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  console.log(decodedUserId);
  //console.log(userLikes);
 const dispatch = useDispatch();

  const cardRead = useSelector((state) => state.card.selectedCardIndex);
  console.log(cardRead)
  const commentBoxVisible = useSelector(
    (state) => state.card.commentBoxVisible
  );
   console.log(cardRead,commentBoxVisible)

  const handleCommentButtonClick =  (index) => {
   dispatch(setSelectedCardIndex(index));
    dispatch(toggleCommentBox(index));
  };

  const handleCloseCommentBox = (index) => {
    dispatch(setCommentBoxVisibility({ cardIndex: index, isVisible: false }));
  };

  // const Toggle = () =>{
  //   setComment(prevState => ! prevState);
  // }
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
      } else {
        console.log("no acces token");
      }
    };

    getAccessTokenFromLocalStorage();
  }, []);

  const fetchAPi = async () => {
    try {
      const response = await axios.get(geturl);
      console.log(response.data);
      const jsonData = response.data;

      const likedStatus = {};
      jsonData.forEach((post) => {
        likedStatus[post._id] = post.likes.some(
          (like) => like.userId === decodedUserId
        );
      });
      console.log(jsonData);

      console.log(userLikes);
      setData(jsonData);
      setUserLikes(likedStatus);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      message.error("Something Went Wrong Try Again!");
    }
  };
  const updateLike = async (postId) => {
    console.log(postId);
    const userId = decodedUserId;
    console.log(userId);
    try {
      const likeStatus = await axios.post(`http://localhost:8080/api/like`, {
        userId: userId,
        postId: postId,
      });
      console.log(likeStatus);
      fetchAPi();
    } catch (error) {
      console.log(error);
    }
  };
  const userD = async () => {};
  // const handleCommentButtonClick = (index) => {
  //   setSelectedCardIndex(index);
  // };
  // console.log(data);

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
        <Spin size="large" spinning={loading}>
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
                    <Link to={`/:${item._id}`}>
                      <Spin spinning={isLoading}>
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
                      </Spin>
                    </Link>
                  }
                  actions={[
                    <Button
                      key="like"
                      type="text"
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
                        "Loading..."
                      )}
                    </Button>,

                    <>
                      <Button
                        type="text"
                        onClick={() => handleCommentButtonClick(index)}
                      >
                        <CommentOutlined
                        // style={{ fontSize: "20px", paddingTop: "5px" }}
                        />
                        {"" + item.comments.length}
                      </Button>
                    </>,

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
                  {/* {item.comments.map((comment, index) => (
                    <li key={index}>
                      <span>User: {comment.username}</span>
                      <span>Comment: {comment.comment}</span>
                    </li>
                  ))} */}
                  {commentBoxVisible[index] && (
                    <>
                      <Comment comments={item.comments} />
                      <Button
                        danger
                        onClick={() => handleCloseCommentBox(index)}
                      >
                        <CloseOutlined />
                      </Button>
                      {/* Show Comment component when the button is clicked */}
                    </>
                  )}
                </Card>
              </Col>
            ))}
          </Row>
        </Spin>
      )}
    </div>
  );
};

export default Display;
