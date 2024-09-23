"use client";
import { useEffect, useState } from 'react';
import { Badge } from '@mui/material';
import { useRouter } from 'next/navigation';
import {fetchLocationDetails} from "../../actions/fetchLocationDetails"
import {useBookingForm} from './BookingFormContext'
import { useTranslations } from 'next-intl';

const LocationSelect = ({serviceId}) => {
  const router = useRouter();


  const { locations, setLocations, selectedLocation, setSelectedLocation }=useBookingForm();



  const [loading, setLoading]= useState(true);
  const handleCardClick = (id) => {
    setSelectedLocation(id);
  };

  //fetch all location available for service and set state
  useEffect(()=>{
    const fetchData=async ()=>{
      setLoading(true);
      try{
        const fetchedData=await fetchLocationDetails(serviceId);
        setLocations(fetchedData);
      }
      catch(err){
        console.log("Error")
      }
      finally{
        setLoading(false)
      }
    }
   
    fetchData();
  },[])

  const multiT= useTranslations("MultiStep");

  return (
    <>
      <div className="flex flex-row items-center py-[15px] px-[16px] bg-white">
        <img className="cursor-pointer" src='chevron-left.svg' alt="back" onClick={() => { router.push('/service-details') }} />
        <div className="flex flex-grow justify-center">
          <span>{multiT('select-location')}</span>
        </div>
        <img src="search copy.svg" alt="header" />
      </div>
      <div className="container mx-auto px-4 py-8 bg-bg-secondary">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {locations?.map((location) => (
            <div
              key={location.id}
              className={`flex flex-col border rounded-lg p-4 cursor-pointer hover:bg-gray-100 w-bottom-nav-button bg-white`}
              onClick={() => handleCardClick(location.id)}
            >


              <span className="font-bold-500 text-title3 mb-2 text-small-tight-regular">{location.name}</span>
              <div className='flex justify-between'>
                <div className='flex gap-2'>
                  <img className="cursor-pointer w-[18px] h-[18px]" src='map-pin.svg' alt="back" />
                  <span className='text-title-7 my-auto text-text-secondary'>{location.address}</span>
                  <img className="cursor-pointer w-[18px] h-[18px]" src='send.svg' alt="back" />
                </div>
                <div>


                  {
                    selectedLocation !== location.id ? (
                      <img src="Group 7.svg" alt="Selected" />
                    ) : (
                      <div className="bg-worms-brand-2 flex items-center justify-center rounded-full w-[24px] h-[24px]">
                        <img src="Ellipse 1523.svg" alt="Not Selected" className='w-[10px] h-[10px]' />
                      </div>
                    )
                  }



                </div>
              </div>
              <div className='flex gap-2'>
                <img className="cursor-pointer" src='map-pin.svg' alt="back" />
                <span className='text-title-7 my-auto text-title3'><span className='text-text-secondary'>{"from "}</span>{location.from}</span>
                <img className="cursor-pointer" src='calendar-clock.svg' alt="back" />
              </div>
            </div>

          ))}
        </div>
        {/* {selectedLocation !== null && (
          <div className="mt-4">
            <div className="flex items-center">
              <span className="inline-flex items-center px-2.5 py-1.5 rounded-full bg-green-100 text-xs font-medium text-green-700 mr-2">
                Selected
              </span>
              <p className="font-bold">Selected Location: {locations.find(loc => loc.id === selectedLocation)?.name}</p>
            </div>
          </div>
        )} */}
      </div>
    </>
  );
};

export default LocationSelect;
