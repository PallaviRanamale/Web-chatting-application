<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import { Box, IconButton, Spinner, Text, FormControl, Input, useToast, useStatStyles } from '@chakra-ui/react';
=======
import React, { useEffect } from 'react';
import { ChatState } from '../Context/ChatProvider';
import { Box, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
>>>>>>> Coding11-12
import { ArrowBackIcon } from '@chakra-ui/icons';
import {getSender,getSenderFull} from "../config/ChatLogics"
import ProfileModal from './miscellaneous/ProfileModal';
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';
<<<<<<< HEAD
import axios from 'axios';
import './styles.css';
import ScrollableChat from './ScrollableChat';
import io from "socket.io-client";
import Lottie from 'react-lottie';
import animationData from '../animations/typing.json';


const ENDPOINT = "http://localhost:3001";
=======
//import{Spinner} from "@chakra-ui/react";
import { useState } from 'react';
import { FormControl } from "@chakra-ui/react";

import axios from 'axios';
import "./styles.css";
import ScrollableChat from './ScrollableChat';

import io from 'socket.io-client';

const ENDPOINT = "http://localhost:3001";

>>>>>>> Coding11-12
var socket, selectedChatCompare;

const SingleChat = ({fetchAgain, setFetchAgain}) => {

<<<<<<< HEAD
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [IsTyping, setIsTyping] = useState(false);

  const toast = useToast();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const {user, selectedChat, setSelectedChat} = ChatState();
=======
  const [messages , setMessages] = useState([]);
  const [loading , setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [socketConnected,  setSocketConnected] = useState(false);
  const [typing , setTyping] = useState(false);
  const [isTyping , setIsTyping] = useState(false);





  const toast = useToast();
  const { user, selectedChat, setSelectedChat } = ChatState();
>>>>>>> Coding11-12

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
<<<<<<< HEAD
      console.log(data)

      // console.log(messages);
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
=======
      console.log(messages);
      setMessages(data);
      setLoading(false);
      socket.emit('join chat', selectedChat._id);

>>>>>>> Coding11-12
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
<<<<<<< HEAD

  console.log(messages);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);
  


  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if(!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id){
        //give notification
      }
      else{
        setMessages([...messages, newMessageRecieved]);
      }
    })
  })
  


  const sendMessage = async(event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
=======
/*
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('setup', user);
    socket.on('connection', () => setSocketConnected(true));
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
   // eslint-disable-next-line
  }, [selectedChat]);


useEffect(()=>{
  socket.on("message received", (newMessageReceived)=>{
    if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id){
       //give notification
    }
    else{
      setMessages([...messages, newMessageReceived]);
    }
  });
});

*/


useEffect(() => {
  socket = io(ENDPOINT);
  socket.emit("setup", user);
  socket.on("connected", () => setSocketConnected(true));
  // socket.on("typing", () => setIsTyping(true));
  // socket.on("stop typing", () => setIsTyping(false));

  // eslint-disable-next-line
}, []);

useEffect(() => {
  fetchMessages();

  selectedChatCompare = selectedChat;
  // eslint-disable-next-line
}, [selectedChat]);

/*
useEffect(() => {
  socket.on("message recieved", (newMessageRecieved) => {
    if (
      !selectedChatCompare || // if chat is not selected or doesn't match current chat
      selectedChatCompare._id !== newMessageRecieved.chat._id
    ) {
      // if (!notification.includes(newMessageRecieved)) {
      //   setNotification([newMessageRecieved, ...notification]);
      //   setFetchAgain(!fetchAgain);
     // }
    } else {
      setMessages([...messages, newMessageRecieved]);
    }
  });
});
*/

useEffect(() => {
  socket.on("new message", (newMessageReceived) => {
    if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
      // Give notification
    } else {
      setMessages(prevMessages => [...prevMessages, newMessageReceived]);
    }
  });
}, [selectedChatCompare]);



  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      //socket.emit("stop typing", selectedChat._id);
>>>>>>> Coding11-12
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
<<<<<<< HEAD
        console.log(selectedChat._id)
=======
>>>>>>> Coding11-12
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
<<<<<<< HEAD
            chatId: selectedChat._id,
=======
            chatID : selectedChat._id
>>>>>>> Coding11-12
          },
          config
        );
        console.log(data);
        socket.emit("new message", data);
<<<<<<< HEAD
=======
        
>>>>>>> Coding11-12
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
<<<<<<< HEAD
  };
    
  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

=======
  }; 

 
  const typingHandler = (e)=>{
    setNewMessage(e.target.value);

    //Typing Indicator Logic
  };

  
  
 
  //const {user, selectedChat, setSelectedChat} = ChatState();
>>>>>>> Coding11-12

    return(
        <>
        {selectedChat ?(
            <>
            <Text
                fontSize={{ base: "28px", md: "30px" }}
                pb={3}
                px={2}
                w="100%"
                fontFamily="Montserrat"
                display="flex"
                justifyContent={{ base: "space-between" }}
                alignItems="center">
                    <IconButton
                    display={{ base: "flex", md: "none" }}
                    icon={<ArrowBackIcon />}
                    onClick={() => setSelectedChat("")}
            />
            
              {!selectedChat.isGroupChat ? (
                <>
                  {getSender(user, selectedChat.users)}
                  <ProfileModal user={getSenderFull(user, selectedChat.users)}
                  />
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal
                    
                    fetchAgain={fetchAgain}
<<<<<<< HEAD
                    setFetchAgain={setFetchAgain}
                    fetchMessages={fetchMessages} 
=======
                    setFetchAgain={setFetchAgain} 
                    fetchMessages={fetchMessages}
>>>>>>> Coding11-12
                    
                    />
                  
                </>
              )}
            </Text>
            <Box 
                display="flex"
                flexDir="column"
                justifyContent="flex-end"
                p={3}
                bg="#E8E8E8"
                width="100%"
                h="100%"
                borderRadius="lg"
                overflowY="hidden"
            >
                {loading ? (
                  <Spinner
<<<<<<< HEAD
                    size="xl"
                    w={20}
                    h={20}
                    alignSelf="center"
                    margin="auto"
                  />
                ) : (
                  <div className="messages">
                    <ScrollableChat messages={messages} />
                  </div>
                )}

                <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                  {IsTyping ? <div>
                    <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />

                  </div> : <></>}
                  <Input
                    variant="filled"
                    bg="#E0E0E0"
                    placeholder="Enter a message.."
                    value={newMessage}
                    onChange={typingHandler}
                  />
=======
                    size ="xl"
                    width={20}
                    h={20}
                    alignSelf= "center"
                    margin="auto"
                  />
                ):(
                  <div className='messages'>
                    <ScrollableChat messages={messages} />
                    </div>
                )}

                <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                  <Input
                  variant = "filled"
                  bg = "#E0E0E0"
                  placeholder='Enter a message...'
                  onChange = {typingHandler}
                  value = {newMessage}
                    />
>>>>>>> Coding11-12
                </FormControl>
            </Box>
            </>
        ):(
            <Box display="flex" alignItems="center" justifyContent="center" h="100%">
<<<<<<< HEAD
                <Text fontSize="3x1" pb={3} fontFamily="Montserrat">
=======
                <Text fontSize="3x1" pb={3} fontFamily="Work sans">
>>>>>>> Coding11-12
                    Click on a user to start chatting
                </Text>
            </Box>
        )}
        </>
    );

        

       
};

export default SingleChat;


