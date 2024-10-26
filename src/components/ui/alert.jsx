import React from 'react';
import { Alert, Stack } from '@mui/material';

export default function BasicAlerts({ message, severity }) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      {message && (
        <Alert severity={severity}>{message}</Alert>
      )}
    </Stack>
  );
}