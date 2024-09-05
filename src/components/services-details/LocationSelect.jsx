"use client";
import { useState } from 'react';
import { Box, Card, CardContent, Typography, FormControlLabel, Radio, FormControl, Badge } from '@mui/material';

const locations = [
  { id: 1, name: 'Dr Otto Octavius', description: 'Deadly adversary', address: '123 Broadway, New York, NY', openFrom: '9 PM' },
  { id: 2, name: 'Date with Iron Man(Robert D Jr)', description: 'Favourite avenger', address: '456 Hollywood Blvd, Los Angeles, CA', openFrom: '10 AM' },
  { id: 3, name: 'Trip to chicago', description: 'Known for its city and night life.', address: '789 Michigan Ave, Chicago, IL', openFrom: '2 AM' },
  { id: 4, name: 'Study Palace', description: 'Read abt timezones', address: '101 Ocean Dr, Miami, FL', openFrom: '11 AM' },
];

const LocationSelect = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleCardClick = (id) => {
    setSelectedLocation(id);
  };

  return (
    <Box className="w-full max-w-md mx-auto p-4">
      <FormControl component="fieldset">
        {locations.map((location) => (
          <Box
            key={location.id}
            className={`mb-4 rounded-lg cursor-pointer ${selectedLocation === location.id ? 'bg-gray-200' : 'bg-white'}`}
            onClick={() => handleCardClick(location.id)}
          >
            <Card
              className={`flex items-center p-4 ${selectedLocation === location.id ? 'border-2 border-blue-500' : ''}`}
            >
              <CardContent sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" className="font-bold mb-2">
                    {location.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" className="mb-1">
                    {location.description}
                  </Typography>
                  <Typography variant="body2" color="text.primary" className="mb-1">
                    <strong>Address:</strong> {location.address}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    <strong>Open From:</strong> {location.openFrom}
                  </Typography>
                </Box>
                <FormControlLabel
                  value={location.id}
                  control={<Radio size="small" checked={selectedLocation === location.id} />}
                  label=""
                  sx={{ ml: 2 }}
                  onClick={(e) => e.stopPropagation()}  // Prevent card click event
                />
              </CardContent>
            </Card>
          </Box>
        ))}
      </FormControl>
      <Box className="mt-4">
        {selectedLocation !== null && (
          <Badge badgeContent="Selected" color="primary">
            <Typography variant="body1" component="div" className="font-bold">
              Selected Location: {locations.find(loc => loc.id === selectedLocation)?.name}
            </Typography>
          </Badge>
        )}
      </Box>
    </Box>
  );
};

export default LocationSelect;
