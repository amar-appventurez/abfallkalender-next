const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const advancedFormat = require('dayjs/plugin/advancedFormat');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

// Get the user's local timezone
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const getFromatedTimeFromUTCString=(utcDate)=>
{   const localTime = dayjs(utcDate).tz(userTimeZone);
    return `${localTime.format('ddd, DD MMMM YYYY - HH:mm')}`
}

export const getUTCDateFromLocalTime=(localDate)=>{
    return dayjs(localDate).utc().format();
}

export const convertToUnixTimestamp=(dateString, offset) =>{
    if(!offset) return
    const localDate = dayjs(dateString);  // Parse the input date
    const [hours, minutes] = offset.split(':').map(Number);  // Parse the offset

    // Add the offset to the date
    const adjustedDate = localDate.add(hours, 'hour').add(minutes, 'minute');

    // Convert to Unix timestamp (seconds since epoch)
    const unixTimestamp = adjustedDate.unix();  // Unix timestamp in seconds
    return unixTimestamp;
}

// Step 2: Convert the Unix timestamp back to formatted date
export const  convertFromUnixTimestamp=(unixTimestamp)=> {
    // Convert Unix timestamp back to dayjs object
    const dateObject = dayjs.unix(unixTimestamp);
    
    // Format the date as desired
    const formattedDate = dateObject.format('ddd, DD MMMM YYYY - HH:mm');
    return formattedDate;
}

export const getTimeForBookApiCall=(dateString, offset)=>{
    if(!offset) return
    return `${dayjs(dateString).format('YYYY-MM-DD')} ${offset}`
}

export const getDateConversionForBookingCard=(inputDate)=>{
    return dayjs(inputDate).format('ddd, DD MMMM YYYY');

}