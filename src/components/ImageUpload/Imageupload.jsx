import React, { useState } from 'react'
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
  Upload,
} from "antd";
import { storage } from "../../utils/firebase.config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

//import { getDownloadURL, ref, uploadBytesResumable,child } from "firebase/storage";
const Imageupload = ({send}) => {
  // const [path,setPath]= useState();
  // const [gurl,setGurl] = useState();
  const [item,setItem]= useState();
  const [fileList, setFileList] = useState([]);
  const [submitting, setSubmitting] = useState(false);
const beforeUpload = (file) => {
  if (!["image/jpeg", "image/png"].includes(file.type)) {
    message.error(`${file.name} is not a valid image type`, 2);
    return null;
  }
  return false;
};

const handleChange = ({ fileList }) =>
  setFileList(fileList.filter((file) => file.status !== "error"));

const onRemove = async (file) => {
  const index = fileList.indexOf(file);
  const newFileList = fileList.slice();
  newFileList.splice(index, 1);

  setFileList(newFileList);
};
const handleFinish = async () => {
 try {
   setSubmitting(true); // Assuming you have a state variable 'setSubmitting'

   const storage = getStorage(); // Get the storage instance

   // Map through the fileList and perform the upload operation for each file
   await Promise.all(
     fileList.map(async (file) => {
       const fileName = `uploads/images/${Date.now()}-${file.name}`;
       const storageRef = ref(storage, fileName); // Get the storage reference for the file

       try {
         // Upload the file using uploadBytes and get the snapshot
         const designFileSnapshot = await uploadBytes(
           storageRef,
           file.originFileObj
         );
         const downloadUrl = await getDownloadURL(designFileSnapshot.ref); // Get the download URL

         const item = {
           url: downloadUrl,
           path: fileName,
         };
         setItem(item);
         const sendto = ()=>{
            send(item)
         }
         sendto()

         //console.log("Uploaded item:", item);
       } catch (e) {
         console.log("Error uploading file:", e);
       }
     })
   );

   setFileList([]); // Clear fileList state after successful upload
   message.success(`Images added successfully.`, 2); // Assuming you are using 'message' for displaying success message
 } catch (err) {
   console.log("Error:", err);
   message.error(`Error adding images.`, 2);
 } finally {
   setSubmitting(false); // Set submitting state to false when upload process completes (whether successful or with an error)
 }
};

  return (
    <div>
      <Form onFinish={handleFinish}>
        <div className="uploadContainer">
          <Upload.Dragger
            listType="picture-card"
            fileList={fileList}
            beforeUpload={beforeUpload}
            //onPreview={handlePreview}
            onChange={handleChange}
            onRemove={onRemove}
            multiple={true}
          >
            <div className="uploadIcon">
              <UploadOutlined />
            </div>
          
          </Upload.Dragger>
        </div>
        <Form.Item >
          <Button shape="round" htmlType="submit">
            {submitting ? "Uploading" : "Upload"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Imageupload
