"server only"

export const fetchSlotTimings = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const timings = [
        {
          id: 1,
          period: 'Morning 7:00-8:00',
          slots: ['7:00-7:15', '7:15-7:30', '7:30-7:45', '7:45-8:00'],
        },
        {
          id: 2,
          period: 'Afternoon 12:00-1:00',
          slots: ['12:00-12:15', '12:15-12:30', '12:30-12:45', '12:45-1:00'],
        },
        {
          id: 3,
          period: 'Evening 5:00-6:00',
          slots: ['5:00-5:15', '5:15-5:30', '5:30-5:45', '5:45-6:00'],
        },
      ];
      resolve(timings);
    }, 5000);
  });
};
