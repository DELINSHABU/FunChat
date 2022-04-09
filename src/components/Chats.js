import React, {useRef, useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";

// import './chats.css'

import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = () => {

    const history = useHistory();
    const { user } =useAuth();
    const [loading, setLoading] = useState(true);

    // console.log(user)

    useEffect(() =>{
        if(!user){
            history.push('/');

            return;
        }

        const getFile = async (url)=>{
            const response = await fetch(url);
            const data = await response.blob();

            return new File([data], "userPhoto.jpg", {type: "image/jpeg"})
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id":"c376cc8f-2ae7-4f63-89a6-69354205cb64",
                "user-name": user.email,
                "user-secret": user.uid,

            }   
        })
        .then(()=> {
            setLoading(false)
        })
        .catch(()=>{
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);

            getFile(user.photoURL)
            .then((avatar) =>{
                formdata.append('avatar', avatar, avatar.name);

                axios.post("https://api.chatengine.io/users",
                formdata,
                { headers:{
                    "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY}}
                )
                .then(() => setLoading (false))
                .catch ((error) =>{
                    console.log(error)
                } )
            })
        })

    },[user, history ])

    if(!user || loading) return ' loading....'

    const handleLogout = async () => {
        await auth.signOut();

        history.push('/');
    }
    return (
       <div className="chats-page">
           <div className="nav-bar">
               <div className="logo-tab">
                    FunChat
               </div>
                <div onClick={handleLogout}
                  className="logout-tab">
                    log out
                </div>
           </div>
        <ChatEngine
        className= "chatengine"
        height = "100vh"
        projectID = {process.env.REACT_APP_CHAT_ENGINE_ID}
        userName ={user.email}
        userSecret ={user.uid}
        />
       </div>
    )
}

export default Chats