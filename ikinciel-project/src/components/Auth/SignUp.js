import React, { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import loginImg from '../../assets/bg.jpg'

import Alert from "@mui/material/Alert";
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';


import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const  Signup = ()  => {
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState();
  const db = getFirestore();
  const navigate = useNavigate();
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const addToDB = async (user) => {
    console.log("user email:", user.email);
    try {
      const docRef = await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: user.email
       
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const signUpWithoutCheck = () => {
    setError();

    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        addToDB(user);
        sendEmailVerification(auth.currentUser).then(() => {
          // Email verification sent!
          // ...

          console.log("Email verification sent!");
        });
 

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const signUp = () => {
    setError();
    
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            addToDB(user);
            sendEmailVerification(auth.currentUser).then(() => {
              // Email verification sent!
              // ...

              console.log("Email verification sent!");
            });
       

            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(error)

            // ..
          });
      
    
  };

  const onChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
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
           
           
          >
          <Grid item xs={5} sx={{ m: 1 }}>
          <h1 >Sign Up</h1>
        </Grid>
            <Grid item xs={6} sx={{ m: 2 }}>
              <TextField
                id="outlined-basic full-width-text-field"
                label="E-mail"
                variant="outlined"
                name="email"
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={6} sx={{ m: 1 }}>
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
                     
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Grid>
           
            <Grid item xs={5} sx={{ m: 1 }}>
        
        

              {error && (
                <Alert variant="filled" severity="warning">
                  {error}
                </Alert>
              )}
            </Grid>
            <Button size="meduim" onClick={() => signUpWithoutCheck()}>
               SIGNUP
            </Button>
            <p>
              Already have an account?{" "}
              <Button size="small" onClick={() => navigate("/login")}>
                Login
              </Button>
            </p>
          </Grid>
        </Container>
      </Container>
    </div>
  );
}
export default Signup