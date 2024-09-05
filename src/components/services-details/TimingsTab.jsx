"use client";
import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardActionArea, Tabs, Tab } from '@mui/material';
import { fetchSlotTimings } from '@/actions/fetchSlotTimings';

const TimingTabs = () => {
  const [selectedTiming, setSelectedTiming] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null); // Track only one selected slot
  const [timings, setTimings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setSlotTimings = async () => {
      try {
        const fetchedTimings = await fetchSlotTimings();
        setTimings(fetchedTimings || []);
      } catch (error) {
        console.error("Error fetching slot timings:", error);
      } finally {
        setLoading(false);
      }
    };
    setSlotTimings();
  }, []);

  const handleSlotClick = (timingIndex, slotIndex) => {
    setSelectedTiming(timingIndex);
    setSelectedSlot({ timingIndex, slotIndex });
  };

  if (loading) {
    return <>Loading...</>;
  }

  if (timings.length === 0) {
    return <>No timings available</>;
  }

  return (
    <Box sx={{ width: '100%', maxWidth: '900px', mx: 'auto', p: 4 }}>
      {timings.map((timing, timingIndex) => (
        <Box key={timing.id} mb={4}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            {timing.period}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {timing.slots.map((slot, slotIndex) => (
              <Card
                key={slot}
                onClick={() => handleSlotClick(timingIndex, slotIndex)}
                sx={{
                  minWidth: 100,
                  borderRadius: 2,
                  boxShadow: selectedSlot?.timingIndex === timingIndex && selectedSlot.slotIndex === slotIndex
                    ? '0px 0px 0px 2px #1976d2 inset'
                    : '0px 0px 0px 1px #e0e0e0 inset',
                  backgroundColor: selectedSlot?.timingIndex === timingIndex && selectedSlot.slotIndex === slotIndex
                    ? '#e3f2fd'
                    : '#fff',
                  '&:hover': {
                    boxShadow: '0px 0px 0px 2px #1976d2 inset',
                    cursor: 'pointer',
                  },
                }}
              >
                <CardActionArea sx={{ padding: 2, borderRadius: 2 }}>
                  <Typography variant="body2" align="center">
                    {slot}
                  </Typography>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default TimingTabs;
