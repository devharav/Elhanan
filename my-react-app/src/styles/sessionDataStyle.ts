// SessionDetailsStyles.js

import { styled } from '@mui/system';
import { Button, TextField, FormControl } from '@mui/material';

// Styled component for drag and drop area
export const DragDropArea = styled('div')({
  border: '2px dashed #ccc',
  borderRadius: '5px',
  padding: '40px',
  textAlign: 'center',
  marginTop: '15px',
  cursor: 'pointer',
  position: 'relative',
  backgroundColor: '#f0f0f0',
});

// Styled AddButton component
export const AddButton = styled('button')({
  backgroundColor: 'rgba(0, 123, 255, 0.8)',
  color: 'white',
  padding: '6px 16px',
  fontSize: '14px',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'blue',
  },
});

// Define a custom styled button for the save functionality
export const SaveButton = styled(Button)({
  backgroundColor: 'rgba(0, 123, 255, 0.8)',
  color: 'white',
  padding: '4px 14px',
  fontSize: '14px',
  '&:hover': {
    backgroundColor: 'blue',
  },
});

export const SelectFileButton = styled(Button)(({ theme }) => ({
  minWidth: '5px', 
  minHeight: '5px', 
  backgroundColor: 'transparent',
  border: '1px solid transparent', // Default to no visible border
  color: 'inherit', // Use parent color, customizable in sx
  boxShadow: 'none',

  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.05)', // Slight background change on hover
    borderColor: 'gray', // Visible border on hover
  },
  '&:focus, &:active': {
    outline: 'none',
    boxShadow: 'none',
  },
}));




// Styled component for FormControl
export const StyledFormControl = styled(FormControl)({
  width: '20%',
  '& .MuiInputBase-root': {
    height: '30px',
    fontSize: '12px',
  },
  '& .MuiInputLabel-root': {
    fontSize: '12px',
    transform: 'translate(0, -1.5rem) scale(1)',
  },
  '& .MuiSelect-select': {
    paddingTop: '8px',
    paddingBottom: '8px',
  },
});


// Styled TextField component for the Description field
export const DescriptionField = styled(TextField)({
  width: 'calc(100% - 32px)',
  marginTop: '16px', // Ensure spacing below the other fields
  '& .MuiInputBase-root': {
    height: '30px',
    fontSize: '12px',
    textAlign: 'left', // Aligns the input content to the left
  },
  '& .MuiInputLabel-root': {
    fontSize: '12px',
    transform: 'translate(0, -1.5rem) scale(1)',
  },
  '& .MuiInputBase-input': {
    textAlign: 'left', // Ensures input text is left-aligned
  },
});


