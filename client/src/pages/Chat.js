import React, { useState } from "react";
import ChatList from "../components/chat/ChatList";
import ChatRoom from "../components/chat/ChatRoom";

function Chat() {

    const [selectedRoom, setSelectedRoom] = useState(null);

    return (
        <div style={{ display: "flex", height: "100%" }}>
            <ChatList onSelectRoom={setSelectedRoom} />
            {selectedRoom ? (
                <ChatRoom room={selectedRoom} />
            ) : (
                <div>채팅방을 선택하세요</div>
            )}
        </div>
    );
}

export default Chat