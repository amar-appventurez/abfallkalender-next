import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Select, MenuItem } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { format, addMonths, eachDayOfInterval, startOfToday, endOfYear } from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

const DateCardCarousel = () => {
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [dates, setDates] = useState([]);
  const [month, setMonth] = useState(format(startOfToday(), 'MMMM yyyy'));

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    const today = startOfToday();
    const yearEnd = endOfYear(today);
    
    // Convert to user's local timezone
    const localToday = utcToZonedTime(today, timeZone);
    const localYearEnd = utcToZonedTime(yearEnd, timeZone);
    
    const allDates = eachDayOfInterval({
      start: localToday,
      end: localYearEnd,
    });
    
    setDates(allDates);
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const formattedDates = dates.map(date => utcToZonedTime(date, timeZone));

  return (
    <Box className="w-full max-w-screen-lg mx-auto p-4">
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Select
          value={month}
          onChange={handleMonthChange}
          IconComponent={ArrowForwardIosIcon}
          sx={{
            border: 'none',
            '& .MuiSelect-select': {
              paddingRight: 0,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '& .MuiSelect-icon': {
              marginLeft: '0.2rem',
            },
          }}
          disableUnderline
        >
          {/* Populate month options dynamically */}
          <MenuItem value={format(startOfToday(), 'MMMM yyyy')}>{format(startOfToday(), 'MMMM yyyy')}</MenuItem>
          <MenuItem value={format(addMonths(startOfToday(), 1), 'MMMM yyyy')}>{format(addMonths(startOfToday(), 1), 'MMMM yyyy')}</MenuItem>
          {/* Add more options as needed */}
        </Select>
      </Box>

      <Box sx={{ overflowX: 'auto', display: 'flex', gap: 2 }}>
        {formattedDates.map((date) => (
          <Card
            key={date}
            className="rounded-lg"
            sx={{
              minWidth: '100px',
              textAlign: 'center',
              backgroundColor: selectedDate.getTime() === date.getTime() ? '#1976d2' : '#fff',
              color: selectedDate.getTime() === date.getTime() ? '#fff' : '#000',
              border: selectedDate.getTime() === date.getTime() ? '2px solid #1976d2' : '1px solid #e0e0e0',
              cursor: selectedDate.getTime() === date.getTime() ? 'default' : 'pointer',
            }}
            onClick={() => handleDateChange(date)}
            disabled={date < startOfToday()}
          >
            <CardContent>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {format(date, 'EEE')} {/* Display day abbreviation */}
              </Typography>
              <Typography variant="body2">
                {format(date, 'dd')} {/* Display date */}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default DateCardCarousel;
