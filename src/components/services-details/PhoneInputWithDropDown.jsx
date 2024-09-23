// import React, { useState } from 'react';
// import { TextField, MenuItem, InputAdornment,Input } from '@mui/material';
// import PhoneIcon from '@mui/icons-material/Phone';
// import PhoneNumberInput from 'react-phone-number-input';
// import 'react-phone-number-input/style.css'; // Import the default styles for react-phone-number-input
// import { log } from 'console';

// const PhoneInputWithDropdown = ({phone=9787977,setPhone=()=> log("")}) => {
//   const [value, setValue] = useState('');

//   return (
//     <TextField
//       value={phone}
//       onChange={(e) => setPhone(e.target.value)}
//       InputProps={{
//         endAdornment: (
//           <PhoneNumberInput
//             defaultCountry="GM"
//             value={phone}
//             onChange={setPhone}
//             style={{ width: '100%' }}
//           />
//         ),
//       }}
//       variant="outlined"
//       className='w-full border border-border-color-1 rounded-xl '
//     />
//   );
// };

// export default PhoneInputWithDropdown;


import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './phoneInput-style.css'
import { useBookingForm } from './BookingFormContext';
const PhoneNumberInput = () => {
  
  const {formData,setFormData} = useBookingForm();
  return (
    <div>
      <PhoneInput
        country={'de'} // Default country (Germany, for example)
        value={formData.phone}
        onChange={(phone, countryData) => { 
          const countryCode = countryData.dialCode;
          const phoneWithOutCountry = phone.slice(countryCode.length);
          console.log("Without count", phoneWithOutCountry)  
          setFormData((prev)=>{ return {...prev, phoneWithOutCountry, countryCode: `+${countryCode}`, phone} })
        }}
        inputClass="phone-input"
        placeholder='Enter your phone number'
      />
    </div>
  );
};

export default PhoneNumberInput;
