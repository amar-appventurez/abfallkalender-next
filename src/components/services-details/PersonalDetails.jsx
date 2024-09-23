"use client";
import React, { useState } from 'react';
import PhoneInputWithDropDown from './PhoneInputWithDropDown';
import { useBookingForm } from './BookingFormContext';
import { useTranslations } from 'next-intl';

const PersonalDetails = () => {
 const {formData,setFormData}= useBookingForm();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const personalT= useTranslations("Personal")

  return (
    <div className="w-full max-w-md mx-auto bg-bg-secondary flex flex-col gap-[20px] items-center">
      <form onSubmit={handleSubmit} className='w-bottom-nav-button bg-white w-full p-4 mt-[24px] mb-[50px]'>
        <div className="mb-4 flex flex-col">
          <label htmlFor="firstName" className="text-text-secondary text-title-5 text-bold-500 text-text-secondary mb-2">
           {personalT('first-name')}
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Enter your first name"
            value={formData?.firstName}
            onChange={handleChange}
            className="w-full border border-border-color-1 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="familyName" className="text-text-secondary text-title-5 text-bold-500 mb-2 text-text-secondary">
          {personalT('family-name')}
          </label>
          <input
            id="familyName"
            name="familyName"
            type="text"
            placeholder="Enter your family name"
            value={formData?.familyName}
            onChange={handleChange}
            className="w-full border border-border-color-1 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="email" className="text-text-secondary text-title-5 text-bold-500 mb-2 text-text-secondary">
          {personalT('email')}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            value={formData?.email}
            onChange={handleChange}
            className="w-full border border-border-color-1 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-[12px]"
          />
          <span className="text-text-secondary text-title-5">Your email address is required for confirmation. After submitting the form, you’ll receive a link via email. You must confirm this. Only then will the appointment be considered booked.</span>
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="reenterEmail" className="text-text-secondary text-title-5 text-bold-500 mb-2">
          {personalT('email-repeat')}
          </label>
          <input
            id="reenterEmail"
            name="reenterEmail"
            type="email"
            placeholder="Re-enter your email address"
            value={formData?.reenterEmail}
            onChange={handleChange}
            className="w-full border border-border-color-1 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <label htmlFor="" className="text-text-secondary text-title-5 text-bold-500 mb-2">
        {personalT('phone')}
          </label>
        {/* <div className="mb-4 flex flex-col">
          <label htmlFor="reenterEmail" className="text-text-secondary text-title-5 text-bold-500 mb-2">
            Telephone No
          </label>
          <input
            id="reenterEmail"
            name="reenterEmail"
            type="tel"
            placeholder="Enter your phone no"
            value={formData.reenterEmail}
            onChange={handleChange}
            className="w-full border border-border-color-1 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> */}
        <PhoneInputWithDropDown value={formData?.phone} onChange={ handleChange}/>
        <div className="mb-4 flex items-center">
          <input
            id="declaration"
            name="declaration"
            type="checkbox"
            checked={formData?.declaration}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="declaration" className="ml-2 block text-semiBold text-title-6 text-text-secondary text-gray-900">
          {/* I consent to my personal data collected for the purpose of booking and processing appointments being processed by the responsible party.  Data protection information on the declaration of consent & Data protection & CONDITIONS */}
          {personalT('declaration')}
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
        >
          {personalT('submit')}
        </button>
      </form>
    </div>
  );
};

export default PersonalDetails;
  