

//------------
import { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const VerifyOtp = () => {
  const navigate=useNavigate();

  const [otp, setOtp] = useState(['', '', '', '']);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };
  const capValue = () => {
    const otpValue = otp.join(''); 
console.log(otpValue);
    axios.get('http://localhost:3000/api/verifyOtp',otpValue)
    .then((res)=>{
      alert(res.data.message);
      navigate('/home');
    })
    .catch((error)=>{
        alert('Invalid!!');
        console.log(error)
    })
  };

  return (
    <>
    <Box display="flex" justifyContent="space-between" width="200px" component="form" style={{ marginLeft:"40vw", textAlign:'center' }}>

        {otp.map((digit, index) => (

            <TextField
            key={index}
            id={`otp-input-${index}`}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            variant="outlined"
            inputProps={{ maxLength: 1, style: { textAlign: 'center', marginBottom:'20px'} }}
            />
            
        ))}
    </Box>
    <Button variant="contained" onClick={capValue} style={{ marginLeft:'45vw',marginTop:'10vh' }}>Submit</Button>
    </>
    
  );
};

export default VerifyOtp;
