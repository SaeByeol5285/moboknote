import React, { useEffect, useState } from "react";
import { Box, List, ListItemButton, ListItemText, Typography, Divider } from "@mui/material";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/atoms";

function ChatList({ onSelectRoom }) {
    const [rooms, setRooms] = useState([]);
    const user = useRecoilValue(userState);

    useEffect(() => {
        if (!user?.member_no) return;
        fetch(`http://localhost:3005/chat/room/${user.member_no}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) setRooms(data.rooms);

            });
    }, [user]);

    return (
        <Box sx={{ width: 300, borderRight: "1px solid #ccc", height: "100%", overflowY: "auto" }}>
            <Typography variant="h6" sx={{ p: 2 }}>
                내 채팅방
            </Typography>
            <Divider />
            <List>
                {rooms.length === 0 ? (
                    <Typography sx={{ p: 2, color: "gray" }}>채팅방이 없습니다.</Typography>
                ) : (
                    rooms.map((room) => {
                        const opponentNo = room.member1_no === user.member_no ? room.member2_no : room.member1_no;
                        return (
                            <ListItemButton key={room.room_no} onClick={() => onSelectRoom(room)}>
                                <ListItemText
                                    primary={room.opponent_nickname}
                                    secondary={new Date(room.cdatetime).toLocaleString()}
                                />
                            </ListItemButton>
                        );
                    })
                )}
            </List>
        </Box>
    )
}

export default ChatList