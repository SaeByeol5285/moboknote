import React from "react";
import { Box, Typography, Paper } from "@mui/material";

function RightWidgets() {
  return (
    <Box sx={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* 광고 박스 */}
      <Paper
        elevation={1}
        sx={{
          height: "160px",
          backgroundColor: "#EFEFE8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="subtitle1" color="text.secondary">
          광고
        </Typography>
      </Paper>

      {/* 날씨 위젯 박스 */}
      <Paper
        elevation={1}
        sx={{
          height: "260px",
          backgroundColor: "#EFEFE8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="subtitle1" color="text.secondary">
          날씨 위젯
        </Typography>
      </Paper>
    </Box>
  );
}

export default RightWidgets;
