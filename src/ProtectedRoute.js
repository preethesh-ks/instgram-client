import axios from "axios"
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Spin } from "antd";

import { base_url } from "./utils/constant";


const ProtectedRoute = ({children}) => {

     const [authenticated, setAuthenticated] = useState(false);
     const [isLoading, setIsLoading] = useState(true);
     const [authorized, setAuthorize] = useState(false);
 
    const token = localStorage.getItem("access_token");
    const rtoken = localStorage.getItem("refresh_token");

    async function validateToken(token,rtoken){
        try{
            const data = await axios.post("http://localhost:8080/auth", {
              access_token: token,
            });
            return data
        }catch(error){
            if(error?.response?.status === 401 && rtoken){
                return getNewToken(rtoken)
            }else{
                console.log("asdsdsd")
            }
        }
    } 
  
     async function getNewToken(rtoken){
        try{
            const newTokendata = await axios.post("http://localhost:8080/refresh", {rtoken});
            console.log(newTokendata)
        }
        catch(error){
            console.log(error)

        }


     }


  return children;
}

export default ProtectedRoute