import React, { FC } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

interface FormProps {
  heading?: string;
  headingCenter?: boolean;
  formDetails: {
    label: string;
    input: string;
    readOnly?: boolean;
    onChange?: (value: string) => void;
  }[];
  handleSubmit?: (abi: any, bytecode: string, initValue: string) => Promise<any>; // Added handleSubmit prop
  loading?: boolean;
  LoaderButton?: ({ children, ...props }: any) => JSX.Element;
  children?: React.ReactNode;
}

const Form: FC<FormProps> = ({ heading, headingCenter, formDetails, handleSubmit, loading, LoaderButton, children }) => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // If formDetails length is 3, assume deploy form, else adjust accordingly
    const abi = formDetails[0]?.input || '';
    const bytecode = formDetails[1]?.input || '';
    const initValue = formDetails.length > 2 ? formDetails[2]?.input || '' : '';

    // Call the handleSubmit function if provided
    handleSubmit?.(abi, bytecode, initValue);
  };

  return (
    <Box sx={{ width: '92%', px: { xs: 2, sm: 3, lg: 4 }, zIndex: 0 }}>
      {heading && (
        <Typography variant="h6" fontWeight="bold" align={headingCenter ? 'center' : 'left'}>
          {heading}
        </Typography>
      )}
      <Box sx={{ p: 4, mt: 3, mb: 0, borderRadius: 2, backgroundColor: 'white', boxShadow: 1 }}>
        <form onSubmit={onSubmit}>
          {formDetails.map((formDetail) => (
            <Box key={formDetail.label} sx={{ mb: 3 }}>
              <Typography variant="body2" fontWeight="medium">
                {formDetail.label}
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                size="small"
                value={formDetail.input}
                onChange={(e) => formDetail.onChange?.(e.target.value)}
                InputProps={{
                  readOnly: formDetail.readOnly || false,
                }}
              />
            </Box>
          ))}
          {LoaderButton ? (
            <LoaderButton type="submit" loading={loading}>
              Submit
            </LoaderButton>
          ) : (
            <Button type="submit" variant="contained" disabled={loading} fullWidth>
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          )}
        </form>
        {children}
      </Box>
    </Box>
  );
};

export default Form;
