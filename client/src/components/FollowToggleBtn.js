import { React, useState, useEffect } from "react";
import { Button } from "@mui/material";


function FollowToggleBtn({ currentUserId, targetUserId, onUnfollow }) {
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        if (currentUserId == targetUserId) return;
        fetch(`http://localhost:3005/follow/check?from=${currentUserId}&to=${targetUserId}`)
            .then(res => res.json())
            .then(data => setIsFollowing(data.result === 1)); // result: 1이면 팔로우 중

    }, [currentUserId, targetUserId]);


    const handleFollowToggle = (e) => {
        e.stopPropagation(); // 카드 클릭 이벤트 막기

        const method = isFollowing ? "DELETE" : "POST";
        fetch(`http://localhost:3005/follow`, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                follower_no: currentUserId,
                following_no: targetUserId,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if(data.success !== false) {
                    setIsFollowing(!isFollowing);
                    //팔로우 중 && 언팔로우 버튼 눌렀을 경우
                    if(isFollowing && onUnfollow){
                        onUnfollow();
                    }
                }

            });
    };

    if (currentUserId == targetUserId) return null;

    return (

        <Button
            size="small"
            onClick={handleFollowToggle}
            sx={{
                ml: 1,
                backgroundColor: isFollowing ? "#fff" : "#707C5C",
                color: isFollowing ? "#707C5C" : "#fff",
                border: "1px solid #707C5C",
                "&:hover": {
                    backgroundColor: isFollowing ? "#f2f2f2" : "#5a6b4f", // 호버 시 색
                },
                textTransform: "none", // 대문자 방지
                fontWeight: 500,
                fontSize: "0.75rem",
                padding: "4px 10px",
                borderRadius: "12px",
                minWidth: "auto",
            }}
        >
            {isFollowing ? "언팔로우" : "팔로우"}
        </Button>
    )

}

export default FollowToggleBtn