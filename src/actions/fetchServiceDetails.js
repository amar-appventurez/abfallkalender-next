"server only"

export const fetchServiceDetails = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const serviceDetails = [
        { id: 1, name: 'Required Documents', description: ['Proof of identity (initial application: birth certificate).', 'Biometric photograph (Not older than 6 months) - photo can be taken in the main office.', 'Proof of identity (initial application: birth certificate).'] },
        { id: 2, name: 'Peculiarities', description: ['For application of identity for a person under 18 years, presence in office is a prerequisite.', 'For application of identity for a person under 18 years, presence in office is a prerequisite.', 'Proof of identity (initial application: birth certificate).'] },
        { id: 3, name: 'Fees', description: ['Proof of identity (initial application: birth certificate).', 'Proof of identity (initial application: birth certificate).'] },
      ];
      resolve(serviceDetails);
    }, 2000);
  });
};
