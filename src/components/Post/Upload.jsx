import React, { useState, useRef } from "react";
import { Upload } from "antd";
//const url = `${base_url}/upload`;
const url = "http://localhost:8080/upload";
const UploadData = () => {

    const [path,setPat] =useState();
     const handleOnChange = ({ file, fileList, event }) => {
       console.log(file.response);
       const path = file.response;
       setPat(path);
      };
  

    return (
      <>
        <Upload
          name="file"
          action={`${url}`}
          listType="picture-circle"
          multiple
          onChange={handleOnChange}
        >
          helo
        </Upload>
      </>
    );
}

export default UploadData;
