import * as React from 'react';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

interface FeedbackProps {
  feedback: 'error' | 'success';
  success: '';
  error: '';
}

const Feedback: React.FC<FeedbackProps> = ({ feedback, success, error }) => {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {feedback === 'error' ? <Alert severity="error">{error}</Alert> : <Alert severity="success">{success}</Alert>}
    </Stack>
  );
};

export default Feedback;
