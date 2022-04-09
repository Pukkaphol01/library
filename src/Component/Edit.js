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
  const {Bookid} = useParams();
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const jsonData = {
      Bookname: data.get('Bookname'),
      imagebook: data.get('imagebook'),
    }
    
    fetch('http://localhost:3333/edit/'+Bookid, {
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
        window.location='/'
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
           Edit Book
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
           
           <TextField
              margin="normal"
              required
              fullWidth
              name="Bookid"
              label="Bookid"
              type="text"
              id="Bookid"
              autoComplete="Bookid"
              value={Bookid}

            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Bookname"
              label="Bookname"
              type="text"
              id="Bookname"
              autoComplete="Bookname"
              
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="imagebook"
              label="imagebook"
              type="text"
              id="imagebook"
              autoComplete="imagebook"
              
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