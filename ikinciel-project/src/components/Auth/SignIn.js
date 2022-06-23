import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword , GoogleAuthProvider  } from "firebase/auth";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import loginImg from '../../assets/bg.jpg'
import Alert from "@mui/material/Alert";
import firebase from 'firebase/compat/app'
import {auth} from '../../firebase'

import { useNavigate } from 'react-router-dom';
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

export default function Login() {
  const [error, setError] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const authx = getAuth();


  console.log(firebase.auth) // Undefined
  console.log(firebase.default.auth) // Function
  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      navigate('/')
      // ...
    }).catch((error) => {
      // Handle Errors here.

    });
  }  

  const logIn = () => {
    setError();
    
    signInWithEmailAndPassword(authx, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user is signed in:\n", user);
        navigate("/");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
     
      });
  };

  const onChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
      console.log("password:", e.target.value);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${loginImg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <Container sx={{ p: 25 }}>
        <Container
          sx={{
            width: "700px",
            height: "470px",

            backgroundColor: "rgba(216, 216, 255, 0.4)",
            p: 5,
            borderRadius: "20px",
          }}
        >
          <Grid
            maxWidth="md"
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            align="center"
            sx={{ p: 3, border: "1px solid black", borderRadius: "5px" }}
          >  
          <Grid item xs={6} sx={{ m: 1 }}>
          <h1>Login</h1>

        </Grid>
            <Grid item xs={5} sx={{ m: 2 }}>
              <TextField
                id="outlined-basic full-width-text-field"
                label="Email"
                variant="outlined"
                name="email"
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={5} sx={{ m: 1 }}>
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={(e) => onChange(e)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword }
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Grid>
            <Grid item xs={5} sx={{ m: 1 }}>
              <Button size="small" onClick={() => logIn()}>
                Login
              </Button>
              </Grid>
              <Grid item xs={5} sx={{ m: 1 }}>
              <Button style={{width:'170px',height:'50px'}} onClick={signInWithGoogle}>Google ile giriş yap</Button>

              </Grid>
              <InputLabel htmlFor="outlined-adornment-password">
              Kayıtlı değil misiniz?            </InputLabel>
                  
            <Button size="small" onClick={() => navigate("/signup")}>
              Sign up
            </Button>
            {error && (
              <Alert variant="filled" severity="warning">
                {error}
              </Alert>
            )}
          </Grid>
        </Container>
      </Container>
    </div>
  );
}
