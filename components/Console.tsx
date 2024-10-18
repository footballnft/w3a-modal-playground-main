// Console.tsx

import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { usePlayground } from "../services/playground";

const Console: React.FC = () => {
  const { playgroundConsole } = usePlayground();

  return (
    <Box
      sx={{
        py: 4,
        width: "91.67%", // approximately w-11/12
        px: 2,
        display: "flex",
        flexDirection: "column",
        mx: "auto",
        maxWidth: "lg",
      }}
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Console
      </Typography>

      <Paper
        sx={{
          p: 4,
          mt: 2,
          mb: 0,
          backgroundColor: "white",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 1,
            backgroundColor: "gray.200",
            overflowY: "scroll",
            maxHeight: 300, // approximately max-h-72
          }}
        >
          <Typography
            variant="body2"
            component="pre"
            sx={{
              fontFamily: "monospace",
              overflowX: "auto",
              width: "100%",
            }}
          >
            {playgroundConsole}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Console;
