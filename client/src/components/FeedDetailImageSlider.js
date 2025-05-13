import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KakaoCourseMap from "./KakaoCourseMap";


function FeedDetailImageSlider({ images = [], courseList = [] }) {
    const [current, setCurrent] = useState(0);

    const allSlides = [...images.map(img => ({ type: "image", ...img })), { type: "map" }];


    useEffect(() => {
        setCurrent(0); // 새 images가 들어올 때 인덱스 초기화
    }, [images]);

    if (images.length === 0) return null;

    const handlePrev = () => {
        setCurrent((prev) => (prev === 0 ? allSlides.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrent((prev) => (prev === allSlides.length - 1 ? 0 : prev + 1));
    };

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    height: "600px",
                    backgroundColor: "#000",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* 슬라이드 분기 렌더링 */}
                {allSlides[current].type === "map" ? (
                    <Box sx={{ width: "100%", height: "100%" }}>
                        <KakaoCourseMap courseList={courseList} />
                    </Box>
                ) : (
                    <img
                        src={`http://localhost:3005/${allSlides[current].file_path}`}
                        alt={`이미지 ${current}`}
                        style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                            width: "auto",
                            height: "auto",
                            display: "block",
                            margin: "0 auto",
                        }}
                    />
                )}


                {/* 좌우 버튼 */}
                <IconButton
                    onClick={handlePrev}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: 10,
                        transform: "translateY(-50%)",
                        color: "white",
                        backgroundColor: "rgba(0,0,0,0.4)",
                        zIndex: 2,
                    }}
                >
                    <ArrowBackIosIcon />
                </IconButton>

                <IconButton
                    onClick={handleNext}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        right: 10,
                        transform: "translateY(-50%)",
                        color: "white",
                        backgroundColor: "rgba(0,0,0,0.4)",
                        zIndex: 2,
                    }}
                >
                    <ArrowForwardIosIcon />
                </IconButton>

                {/* 인디케이터 */}
                <Typography
                    variant="caption"
                    sx={{
                        position: "absolute",
                        bottom: 8,
                        right: 16,
                        color: "#fff",
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                        borderRadius: "12px",
                        px: 1,
                    }}
                >
                    {current + 1} / {allSlides.length}
                </Typography>
            </Box>
        </>
    );
}

export default FeedDetailImageSlider;
