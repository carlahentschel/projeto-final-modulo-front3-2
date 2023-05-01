import { Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import UserType from '../Types/UserType';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addUser, selectByEmail } from '../store/modules/UsersSlice';
import { setUser } from '../store/modules/UserSlice';

interface FormProps {
  mode: 'signin' | 'signup';
  textButton: string;
}

const Form: React.FC<FormProps> = ({ mode, textButton }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [disabled, setDisable] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorRepassword, setErrorRepassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userExist = useAppSelector((state) => selectByEmail(state, email));

  useEffect(() => {
    if (mode === 'signup') {
      const emailValid = email.endsWith('.com') || (email.endsWith('.com.br') && email.includes('@'));

      const passwordValid = password.length >= 6;
      const repasswordValid = password === repassword;

      if (email.length > 0) {
        setErrorEmail(!emailValid);
      }

      if (password.length > 0) {
        setErrorPassword(!passwordValid);
      }

      if (repassword.length > 0) {
        setErrorRepassword(!repasswordValid);
      }
      setDisable(!(emailValid && passwordValid && repasswordValid));
    }
  }, [email, password, repassword, mode]);

  const handleSubmit = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    if (mode === 'signup') {
      const newUser: UserType = {
        email,
        password,
        tasks: [],
      };

      if (userExist) {
        alert('Esse e-mail já está cadastrado!');
        return;
      }

      dispatch(addUser(newUser));
      setEmail('');
      setPassword('');
      setRepassword('');
      navigate('/');
    } else {
      if (!userExist) {
        alert('E-mail ou senha inválidos. Tente novamente!');
        return;
      }

      dispatch(setUser(userExist));
      navigate('/notes');
    }
  };

  return (
    <Box component="form" marginTop={1} onSubmit={(ev) => handleSubmit(ev)}>
      <TextField
        error={errorEmail}
        helperText={errorEmail ? 'E-mail inválido' : ''}
        value={email}
        onChange={(evento) => setEmail(evento.target.value)}
        margin="normal"
        variant="outlined"
        type="email"
        required
        id="email"
        label="E-mail"
        fullWidth
      />
      <TextField
        error={errorPassword}
        helperText={errorPassword ? 'A senha deve ter no mínimo 6 caracteres' : ''}
        value={password}
        onChange={(evento) => setPassword(evento.target.value)}
        margin="normal"
        variant="outlined"
        type="password"
        required
        id="password"
        label="Password"
        fullWidth
      />
      {mode === 'signup' ? (
        <TextField
          error={errorRepassword}
          helperText={errorRepassword ? 'As senhas não são iguais' : ''}
          value={repassword}
          onChange={(evento) => setRepassword(evento.target.value)}
          margin="normal"
          variant="outlined"
          type="password"
          required
          id="repassword"
          label="Repeat Password"
          fullWidth
        />
      ) : (
        <FormControlLabel
          control={<Checkbox checked={remember} onChange={(evento) => setRemember(evento.target.checked)} />}
          label="Permanecer conectado"
        />
      )}
      <Button disabled={disabled} type="submit" variant="contained" fullWidth sx={{ mt: 3, mb: 2 }}>
        {textButton}
      </Button>

      <Grid container>
        {mode === 'signin' && (
          <Grid item xs={4}>
            <Typography variant="body2">
              <Link style={{ color: 'inherit' }} to="/">
                Esqueceu sua senha?
              </Link>
            </Typography>
          </Grid>
        )}
        <Grid item xs={8} textAlign="end">
          {mode === 'signin' ? (
            <Typography variant="body2">
              <Link to="/signup">Não tem uma conta? Cadastre-se</Link>
            </Typography>
          ) : (
            <Typography variant="body2">
              <Link to="/">Já possui conta? Vá para Login</Link>
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Form;
