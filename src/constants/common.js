import CryptoJS from 'crypto-js';

const TOKEN_ENCRYPTION_KEY= ``;
export const encryptToken = (data) => {
    data = data.toString();
    const encrypt = CryptoJS.AES.encrypt(data, TOKEN_ENCRYPTION_KEY);
    return encrypt.toString();
  };
  
  export const decryptToken = (data) => {
    // const test="U2FsdGVkX18w7PVDIIRCdYsZuokCQjWrH3ZIv7ZiMpmYzLVQMrNeOiNRsGfqEHVfQARXnTnA4H9b9M3R9sOzl5FZZxp1I4o4N5owe62mxbAu/bUkdSoo5QijEx5iRx7pDYJ/0kn39Ump2rUpVPMDRyNmgrY2OMMU5VoYzPV2lVunDSBSTWwCZf/g5ySa/v220XfZ6/A7XgyleomsWxUj/O9I2a+HQEAEu8jWsMcH1rBYe17tXvWW9jUL5h98mPQA"
    const decrypt = CryptoJS.AES.decrypt(data, TOKEN_ENCRYPTION_KEY);
    //  console.log( decrypt.toString(CryptoJS.enc.Utf8) === "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYWpqd2FsLnZlcm1hQGtvYmlsLmNvbSIsImlhdCI6MTcyNTAxNjkxNCwiZXhwIjoxNzMzNjU2OTE0fQ.vhAqh0GvZs7jxsQbYEjyAmwvowE2QgrW2qKYghCg9RY" )
    return decrypt.toString(CryptoJS.enc.Utf8);
    // return " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYWpqd2FsLnZlcm1hQGtvYmlsLmNvbSIsImlhdCI6MTcyNTAxNjkxNCwiZXhwIjoxNzMzNjU2OTE0fQ.vhAqh0GvZs7jxsQbYEjyAmwvowE2QgrW2qKYghCg9RY"
  };
  
  
  export const testEncryptionAndDecryption = () => {
    try {
      const originalData = 'testToken123';
      console.log('Original Data:', originalData);
  
      const encryptedData = encryptToken(originalData);
      console.log('Encrypted Data:', encryptedData);
  
      const decryptedData = decryptToken(encryptedData);
      console.log('Decrypted Data:', decryptedData);
  
      if (originalData === decryptedData) {
        console.log('Encryption and decryption are successful and consistent.');
      } else {
        console.error('Mismatch between original and decrypted data.');
      }
    } catch (error) {
      console.error('Test failed:', error);
    }
  };