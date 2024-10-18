import React, { ReactNode } from "react";
import { Box, TextField, Typography } from "@mui/material";

interface FormProps {
  heading?: string;
  headingCenter?: boolean;
  formDetails: {
    label: string;
    input: string;
    readOnly?: boolean;
    onChange?: (value: string) => void;
  }[];
  children?: ReactNode;
}

const MultiForm: React.FC<FormProps> = ({ heading, headingCenter, formDetails, children }) => {
  return (
    <Box
      sx={{
        width: "92%",
        px: { xs: 2, sm: 3, lg: 4 },
        zIndex: 0,
      }}
    >
      {heading && (
        <Typography
          variant="h6"
          sx={{
            textAlign: headingCenter ? "center" : "left",
            fontWeight: "bold",
          }}
        >
          {heading}
        </Typography>
      )}

      <Box
        component="form"
        sx={{
          p: 3,
          mt: 2,
          mb: 0,
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
        noValidate
        autoComplete="off"
      >
        {formDetails.map((formDetail) => (
          <Box key={formDetail.label}>
            <Typography variant="body2" sx={{ fontWeight: "medium" }}>
              {formDetail.label}
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={formDetail.input}
              onChange={(e) => formDetail.onChange && formDetail.onChange(e.target.value)}
              InputProps={{
                readOnly: formDetail.readOnly || false,
              }}
              size="small"
              sx={{ mt: 1 }}
            />
          </Box>
        ))}
      </Box>

      {children && <Box sx={{ mt: 2 }}>{children}</Box>}
    </Box>
  );
};

export default MultiForm;
