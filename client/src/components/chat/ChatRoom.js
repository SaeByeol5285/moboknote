import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/atoms";
import ChatMessageItem from "./ChatMessageItem";
import ChatInput from "./ChatInput";

function ChatRoom({ room }) {
    const roomNo = room.room_no;
    const user = useRecoilValue(userState);
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef(null);

    const fetchMessages = () => {
        fetch(`http://localhost:3005/chat/message/${roomNo}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) setMessages(data.message);
            });
    };

    useEffect(() => {
        fetchMessages();
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });

    }, [roomNo]);

    const handleMessageSent = () => {
        fetchMessages();
    };

    return (
        <Box
            sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                height: "calc(100vh - 42px)", // or 전체 높이 맞게 조정
            }}
        >
            {/* 🔼 스크롤 가능한 메시지 영역 */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    padding: 2,
                    backgroundColor: "#f9f9f9",
                }}
            >
                {messages?.map((msg) => (
                    <ChatMessageItem
                        key={msg.chat_message_no}
                        message={msg}
                        isMine={msg.sender_no === user.member_no}
                    />
                ))}
                <div ref={scrollRef} />
            </Box>

            {/* 🔽 하단 고정 입력창 */}
            <Box
                sx={{
                    borderTop: "1px solid #ccc",
                    padding: 2,
                    backgroundColor: "white",
                }}
            >
                <ChatInput room={room} onMessageSent={handleMessageSent} />
            </Box>
        </Box>

    );
}

export default ChatRoom;