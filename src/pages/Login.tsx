import { Box, Button, TextField } from '@mui/material'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';

const LoginPaper = styled(Paper)(() => ({
  padding: 10,
  width: 500,
  height: 300,
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}));



function Login() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }


  const handleSumbit = async (e:FormEvent) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:5000/users/login', {
        studentID: name,
        password: password,
      })

      // Check if the response status code is successful
        if (response.status === 200) {
          const data = response.data;
          // Handle the API response data
          console.log(data)

          // If the login is successful, you can navigate to another page using history.push()
          // history.push('/home');
        }
        else {
          // Handle the case when the response is not successful (e.g., login failed)
          console.error('Login failed')
        }
    }
    catch (error) {
      console.error('Error making API call:', error)
    }
  }

  return (
    <>
    <Box
      sx={{
        p: 0,
        m: 0,
        width: "100vw",
        height: "100vh",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('src/img/background.png')",
        backgroundSize: "cover"
      }}
    >
      <img 
        src={'src/img/logo.png'} 
        alt="Logo" 
        style={{
          marginBottom: "20px",
          height: "40px",
          width: "240px"
        }}
      />

      <LoginPaper 
        elevation={3} 
      >
        <TextField
          required
          id="outlined-required"
          label="Student ID"
          defaultValue=""
          sx={{
            width: "300px",
            my: 1
          }}
          value={name}
          onChange={handleNameChange}
        />

        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          sx={{
            width: "300px",
            my: 1
          }}
          value={password}
          onChange={handlePasswordChange}
        />
        <Button variant="contained" sx={{ my: 1 }} onClick={handleSumbit}>Login</Button>
      </LoginPaper>
      
    </Box>      
    </>
  )
}

export default Login
