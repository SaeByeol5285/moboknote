import React from "react";
import { useSetRecoilState} from "recoil";
import { defaultUserState, userState } from "../../recoil/atoms"
import { useNavigate } from "react-router-dom";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";



const LogoutBtn = () => {
    const setUser = useSetRecoilState(userState);
    const navigate = useNavigate();

    const handleLogout = ()=>{
        localStorage.removeItem("token");
        setUser(defaultUserState);
        navigate("/login");
    }

    return (
        <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
                <LogoutRoundedIcon sx={{ color : "#aaa"}}/>
            </ListItemIcon>
            <ListItemText primary="로그아웃"/>
        </ListItemButton>
    );
};

export default LogoutBtn;