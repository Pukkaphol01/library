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

const theme = createTheme();

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const jsonData = {
      Bookname: data.get('addbook'),
      imagebook: data.get('Image')
    }
    
    fetch('http://localhost:3333/addbook', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonData),
  })
  .then(response => response.json())
  .then(data => {
    if(data.status === 'ok'){
        alert('AddBook success')
    }
    else{
        alert('AddBook failed')
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
            AddBook To Library
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="addbook"
              label="Addbook"
              name="addbook"
              autoComplete="book"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Image"
              label="Image Book"
              type="text"
              id="Image"
              autoComplete="image"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              AddBook
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}