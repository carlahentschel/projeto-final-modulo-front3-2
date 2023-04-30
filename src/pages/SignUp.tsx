import { VerifiedUser } from '@mui/icons-material';
import { Box, Grid } from '@mui/material';
import { green } from '@mui/material/colors';
import React from 'react';
import Form from '../components/Form';
import HeaderForm from '../components/HeaderForm';
import background from '../assets/images/notes.jpg';

const SignUp: React.FC = () => {
  return (
    <Grid container height="100vh">
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${background})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <Grid item xs={12} sm={8} md={5}>
        <Box component="section" marginY={8} marginX={4} display="flex" flexDirection="column" alignItems="center">
          <HeaderForm color={green[500]} icon={<VerifiedUser />} title="Cadastre-se" />
          <Form mode="signup" textButton="Criar conta" />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUp;
