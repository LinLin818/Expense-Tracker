import React from 'react';
import { Stack, Alert } from '@mui/material'; // Ensure you're importing these from MUI

function YourComponent({ message, severity }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center', // Center horizontally
      alignItems: 'center', // Center vertically
      height: '100vh' // Full viewport height
    }}>
      <Stack sx={{ width: '50' }} spacing={2}>
        {message && (
          <Alert severity={severity}>{message}</Alert>
        )}
      </Stack>
    </div>
  );
}

export default YourComponent;
