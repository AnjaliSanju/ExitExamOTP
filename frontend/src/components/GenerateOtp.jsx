import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GenerateOtp = () => {
    const navigate=useNavigate();
    const [form,setForm]=useState({
        email:''
    });
    const capValue=()=>{

        console.log(form.email);
        axios.post('http://localhost:3000/api/postemail',form)
        .then((res)=>{
            alert(res.data.message);
          navigate('/VerifyOtp');
        })
        .catch((error)=>{
            alert(error);
            window.location.reload();
        })
      }
  return (
    <Box
        component="form"  
        style={{ marginLeft:"40vw", textAlign:'center' }}
    >
        <Typography  variant="h4" style={{ textAlign:'center' }}>
            Generate OTP
        </Typography><br /> 

        <Grid container spacing={2} style={{  textAlign:'center' }}>
       
             <Grid item xs={12} md={12}>
                <TextField
                required
                id="outlined-required"
                label="email"
                value={form.email}
                onChange={(e)=>{
                  setForm({...form,email:e.target.value})
                }}
                />
          </Grid>
          
          <Grid item xs={12} md={12}>
          <Button variant="contained" onClick={capValue}>Submit</Button>
          </Grid>

  
</Grid>

</Box>   
  )
}

export default GenerateOtp
