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
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';

const theme = createTheme();

export default function Update() {
  const {Borrowid} = useParams();
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const jsonData = {
      firstname: data.get('firstname'),
      lastname: data.get('lastname'),
      Bookid: data.get('Bookid'),
    }
    
    fetch('http://localhost:3333/edit/'+Borrowid, {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonData),
  })
  .then(response => response.json())
  .then(data => {
    if(data.status === 'Ok'){
        alert('Update success')
        window.location='/loan'
    }
    else{
        alert('Update failed')
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
           Edit LoanBook
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
           
           <TextField
              margin="normal"
              required
              fullWidth
              name="Borrowid"
              label="Borrowid"
              type="text"
              id="Borrowid"
              autoComplete="Borrowid"
              value={Borrowid}

            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="firstname"
              label="FirstName"
              type="text"
              id="firstname"
              autoComplete="firstname"
              
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="lastname"
              label="LastName"
              type="text"
              id="lastname"
              autoComplete="lastname"
              
            />
            <TextField
              margin="normal"
              required
              width={300}
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
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );

}