

import React from 'react'
import { useState } from "react";
 import { storage } from '../utils/firebase.config';
import * as firebase from "firebase/app";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  notification,
  message,
  Spin,
  Typography,
  Upload
 
} from "antd";
const FirebaseUpload = () => {
// const [image,setImage] = useState();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [progress, setProgress] = useState(0);
// const upload = () => {
//     if(image==null) return;
//     const imageref = storage.ref(`/image/${image.name}`).put(image).on("state_changed",alert("sucess"),alert);

//     imageref();
// }
//   const handleUpload = () => {
//     if (image) {
//       const storageRef = ref(storage, `images/${image.name}`);
//       const uploadTask = uploadBytesResumable(storageRef, image);

//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progress = Math.round(
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//           );
//           setProgress(progress);
//         },
//         (error) => {
//           console.error("Error uploading image:", error);
//         },
//         () => {
//           // Upload completed successfully, get download URL
//           getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//             setImageUrl(url);
//           });
//         }
//       );
//     }
//   };
// console.log(imageUrl);
  return (
    <div>
      <Form >
        <div className="uploadContainer">
          <Upload.Dragger
            listType="picture-card"
            
            multiple={true}
          >
            <div className="uploadIcon">
              <UploadOutlined />
            </div>
            <div className="uploadText">
              <p>Drag and drop here</p>
              <p>OR</p>
              <p>Click</p>
            </div>
          </Upload.Dragger>
        </div>
        <Form.Item >
          <Button shape="round" htmlType="submit">
            {/* {submitting ? "Uploading" : "Upload"} */}
            UPLOAD
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default FirebaseUpload
