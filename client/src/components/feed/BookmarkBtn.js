import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/atoms";

const BookmarkBtn = ({feed_no}) => {
    const user = useRecoilValue(userState);
    const [isBookmarked, setIsBookmarked] = useState(false);
    //북마크 여부 확인
    useEffect(()=> {
        if(!user?.member_no) return;
        fetch(`http://localhost:3005/bookmark/check?member_no=${user.member_no}&feed_no=${feed_no}`)
        .then(res => res.json())
        .then(data => {
            setIsBookmarked(data.result);
        })
    }, [user, feed_no])

    //토글 핸들러
    const handleToggleBookmark = () => {
        const url = "http://localhost:3005/bookmark"
        const options = {
            method: isBookmarked? "DELETE" : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({
                member_no : user.member_no,
                feed_no : feed_no,
            })
        };
        fetch(url,options)
        .then(res => res.json())
        .then(data => {
            if(data.success){
                setIsBookmarked(!isBookmarked);
            }
        })
        .catch(err => console.error("북마크 처리 실패:", err))
    };

    return (
        <>
            <IconButton onClick={(e) => {
                e.stopPropagation();
                handleToggleBookmark();
            }}>
                {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
        
        
        </>
    )

};

export default BookmarkBtn