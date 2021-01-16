import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {_useAxios, authRedirect, login as authLogin} from "../services";
import useAxios from "axios-hooks";

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string|boolean>(false);
  const [{ data }, executeMiddleware]= useAxios(
    { url: '/api/login', method: 'POST' },
    { manual: true }
    )

  const handleSubmit = (event:  React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(false);
    executeMiddleware({data: {username, password}})
  };

  useEffect(() => {
    if (data) {
      if (data.isSuccess) {
        authLogin(data.cookie);
      } else {
        setError(data.message);
      }
    }
  }, [data])

  return (
    <>
      <Container>
        <StyledPaper>
          <img src="/logo.svg"/>
          <p>Venga venga, fresquitas las apuestas!</p>
          <form onSubmit={handleSubmit}>
            <StyledTextField
              id="username"
              label="Usuario"
              name="username"
              type="text"
              variant="outlined"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <StyledTextField
              id="password"
              label="Contraseña"
              name="password"
              type="password"
              variant="outlined"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!username || !password}
            >
              Ingresar
            </Button>
          </form>
        </StyledPaper>
      </Container>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert elevation={6} variant="filled" onClose={() => setError(false)} severity="error">
          {error}
        </MuiAlert>
      </Snackbar>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: grey;
  background-image: url('/login-bg.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 100px;
    margin-bottom: 0.5rem;
  }
  p {
    margin-bottom: 3rem;
  }
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 1.5rem;
  &:last-of-type {
    margin-bottom: 2rem;
  }
`;

const StyledPaper = styled(Paper)`
  padding: 2rem 1.5rem 3rem;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

Login.getInitialProps = authRedirect;

export default Login;
