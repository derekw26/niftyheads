import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function LoadingCircle() {
  return (
    <Box sx={{ display: 'flex', position: 'fixed', top: '40%', left: '50%'}}>
      <CircularProgress />
    </Box>
  );
}
