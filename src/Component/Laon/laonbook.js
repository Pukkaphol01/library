import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState} from 'react';

const theme = createTheme();



export default function LoanBook() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const jsonData = {
      firstname: data.get('firstName'),
      lastname: data.get('lastName'),
      Bookid: data.get('Bookid'),
    } 
    
    fetch('http://localhost:3333/borrow', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    
    body: JSON.stringify(jsonData),
  })
  .then(response => response.json())
  .then(data => {
    if(data.status === 'ok'){
        alert('Borrow a Book success')
    }
    else{
        alert('Borrow a Book failed')
        console.log(jsonData)
    }
  })
  }

 

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar alt="Remy Sharp" src="https://www.engdict.com/data/dict/media/images_public/textb-00083814_normal.png">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            LoanBook
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="FirstName"
              name="firstName"
              autoComplete="firstName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="lastName"
              label="LastName"
              type="text"
              id="lastName"
              autoComplete="lastname"
            />
           
             <TextField
              margin="normal"
              required
              fullWidth
              name="Bookid"
              label="Bookid"
              type="text"
              id="Bookid"
              autoComplete="Bookid"
            />
          

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Borrow
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}