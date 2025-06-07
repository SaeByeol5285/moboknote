import React, { useState } from "react";
import {
    Box,
    Select,
    MenuItem,
    TextField,
    Button,
    FormControl,
    InputLabel,
} from "@mui/material";

function HeaderFilter({ setFilters }) {
    const [region, setRegion] = useState("");
    const [season, setSeason] = useState("");
    const [bariType, setBariType] = useState("");
    const [locationType, setLocationType] = useState("");
    const [ccType, setCcType] = useState("");
    const [keyword, setKeyword] = useState("");

    const handleSearch = () => {
        setFilters({
            region,
            season,
            bariType,
            locationType,
            ccType,
            keyword,
        });

        setRegion("");
        setSeason("");
        setBariType("");
        setLocationType("");
        setCcType("");
        setKeyword("");
    };

    return (
        <Box
            sx={{
                padding: "20px 0",
                display: "flex",
                gap: 2,
                flexWrap: "nowrap",
                justifyContent: "center",
                alignItems: "center",
                overflowX: "auto",
            }}
        >

            {/* 지역 */}
            <FormControl size="small" sx={{ minWidth: 160 }} color="success">
                <InputLabel id="region-label">지역</InputLabel>
                <Select labelId="region-label" value={region} onChange={(e) => setRegion(e.target.value)} label="지역">
                    <MenuItem value="">전체</MenuItem>
                    <MenuItem value="seoul">서울특별시</MenuItem>
                    <MenuItem value="busan">부산광역시</MenuItem>
                    <MenuItem value="daegu">대구광역시</MenuItem>
                    <MenuItem value="incheon">인천광역시</MenuItem>
                    <MenuItem value="gwangju">광주광역시</MenuItem>
                    <MenuItem value="daejeon">대전광역시</MenuItem>
                    <MenuItem value="ulsan">울산광역시</MenuItem>
                    <MenuItem value="gyeonggi">경기도</MenuItem>
                    <MenuItem value="gangwon">강원도</MenuItem>
                    <MenuItem value="chungbuk">충청북도</MenuItem>
                    <MenuItem value="chungnam">충청남도</MenuItem>
                    <MenuItem value="jeonbuk">전라북도</MenuItem>
                    <MenuItem value="jeonnam">전라남도</MenuItem>
                    <MenuItem value="gyeongbuk">경상북도</MenuItem>
                    <MenuItem value="gyeongnam">경상남도</MenuItem>
                    <MenuItem value="jeju">제주특별자치도</MenuItem>
                </Select>
            </FormControl>

            {/* 계절 */}
            <FormControl size="small" sx={{ minWidth: 100 }} color="success">
                <InputLabel id="season-label">계절</InputLabel>
                <Select labelId="season-label" value={season} onChange={(e) => setSeason(e.target.value)} label="계절">
                    <MenuItem value="">전체</MenuItem>
                    <MenuItem value="spring">봄</MenuItem>
                    <MenuItem value="summer">여름</MenuItem>
                    <MenuItem value="fall">가을</MenuItem>
                    <MenuItem value="winter">겨울</MenuItem>
                </Select>
            </FormControl>

            {/* 바리 종류 */}
            <FormControl size="small" sx={{ minWidth: 120 }} color="success">
                <InputLabel id="bari-label">바리</InputLabel>
                <Select labelId="bari-label" value={bariType} onChange={(e) => setBariType(e.target.value)} label="바리">
                    <MenuItem value="">전체</MenuItem>
                    <MenuItem value="night">밤바리</MenuItem>
                    <MenuItem value="oneday">당일바리</MenuItem>
                    <MenuItem value="twoday">1박2일</MenuItem>
                    <MenuItem value="etc">기타</MenuItem>
                </Select>
            </FormControl>

            {/* 장소 유형 */}
            <FormControl size="small" sx={{ minWidth: 120 }} color="success">
                <InputLabel id="location-label">장소</InputLabel>
                <Select labelId="location-label" value={locationType} onChange={(e) => setLocationType(e.target.value)} label="장소">
                    <MenuItem value="">전체</MenuItem>
                    <MenuItem value="mountain">산/숲</MenuItem>
                    <MenuItem value="coastal">해안도로</MenuItem>
                    <MenuItem value="urban">도시</MenuItem>
                    <MenuItem value="straight">직선코스</MenuItem>
                    <MenuItem value="curve">곡선코스</MenuItem>
                    <MenuItem value="etc">기타</MenuItem>
                </Select>
            </FormControl>

            {/* 바이크 cc */}
            <FormControl size="small" sx={{ minWidth: 140 }} color="success">
                <InputLabel id="cc-label">바이크 cc</InputLabel>
                <Select labelId="cc-label" value={ccType} onChange={(e) => setCcType(e.target.value)} label="바이크 cc">
                    <MenuItem value="">전체</MenuItem>
                    <MenuItem value="125">125cc</MenuItem>
                    <MenuItem value="quarter">쿼터급 (125~400cc)</MenuItem>
                    <MenuItem value="middle">미들급 (400~900cc)</MenuItem>
                    <MenuItem value="liter">리터급</MenuItem>
                </Select>
            </FormControl>


            {/* 검색창 */}
            <TextField
                size="small"
                placeholder="검색어 입력"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                sx={{ width: 250 }}
            />

            <Button variant="contained" sx={{ backgroundColor: "#707C5C" }} onClick={handleSearch}>
                검색
            </Button>
        </Box>
    );
}

export default HeaderFilter;
