import React, { useState } from "react";
import axios from 'axios';

interface EventFormProps {
  onSave?: (event: any) => void;
  initialEvent?: any;
}

const EventForm: React.FC<EventFormProps> = ({ onSave, initialEvent }) => {
  const [eventData, setEventData] = useState(
    initialEvent || {
      eventName: "",
      location: "",
      address: "",
      organizer: "",
      date: "",
      time: "",
      eventType: "Conference",
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/save-event', eventData);
      if (response.status === 200) {
        alert('Event saved successfully');
        if (onSave) {
          onSave(eventData);
        }
      }
    } catch (error) {
      alert('Failed to save event');
    }
  };

  return (
    <div
  id="eventform"
  className="max-w-4xl mx-auto mt-10 mb-20 
    bg-gradient-to-br from-indigo-100 via-purple-100 to-white 
    dark:from-[#1e1b2f] dark:via-[#2a2139] dark:to-[#1e1b2f]
    shadow-xl rounded-2xl p-6 md:p-8 lg:p-10 
    border border-indigo-200 dark:border-purple-900 transition-all"
>
  <h2 className="text-3xl font-bold text-center mb-6 text-indigo-800 dark:text-purple-200 tracking-wide">
    {initialEvent ? "Edit Event" : "Create New Event"}
  </h2>

  <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {/* Event Name */}
    <div className="col-span-1">
      <label className="block font-medium text-indigo-900 dark:text-purple-300">Event Name</label>
      <input
        type="text"
        name="eventName"
        placeholder="Enter event name"
        value={eventData.eventName}
        onChange={handleChange}
        className="w-full p-3 border border-purple-200 dark:border-purple-800 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none bg-white dark:bg-[#322749] text-gray-900 dark:text-purple-100"
        required
      />
    </div>

    {/* Location */}
    <div className="col-span-1">
      <label className="block font-medium text-indigo-900 dark:text-purple-300">Location</label>
      <input
        type="text"
        name="location"
        placeholder="Enter location"
        value={eventData.location}
        onChange={handleChange}
        className="w-full p-3 border border-purple-200 dark:border-purple-800 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none bg-white dark:bg-[#322749] text-gray-900 dark:text-purple-100"
        required
      />
    </div>

    {/* Address */}
    <div className="sm:col-span-2">
      <label className="block font-medium text-indigo-900 dark:text-purple-300">Address</label>
      <input
        type="text"
        name="address"
        placeholder="Enter address"
        value={eventData.address}
        onChange={handleChange}
        className="w-full p-3 border border-purple-200 dark:border-purple-800 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none bg-white dark:bg-[#322749] text-gray-900 dark:text-purple-100"
        required
      />
    </div>

    {/* Organizer */}
    <div className="col-span-1">
      <label className="block font-medium text-indigo-900 dark:text-purple-300">Organizer Name</label>
      <input
        type="text"
        name="organizer"
        placeholder="Organizer name"
        value={eventData.organizer}
        onChange={handleChange}
        className="w-full p-3 border border-purple-200 dark:border-purple-800 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none bg-white dark:bg-[#322749] text-gray-900 dark:text-purple-100"
        required
      />
    </div>

    {/* Date & Time */}
    <div className="grid grid-cols-2 gap-4 col-span-1 sm:col-span-2">
      <div>
        <label className="block font-medium text-indigo-900 dark:text-purple-300">Date</label>
        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          className="w-full p-3 border border-purple-200 dark:border-purple-800 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none bg-white dark:bg-[#322749] text-gray-900 dark:text-purple-100"
          required
        />
      </div>

      <div>
        <label className="block font-medium text-indigo-900 dark:text-purple-300">Time</label>
        <input
          type="time"
          name="time"
          value={eventData.time}
          onChange={handleChange}
          className="w-full p-3 border border-purple-200 dark:border-purple-800 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none bg-white dark:bg-[#322749] text-gray-900 dark:text-purple-100"
          required
        />
      </div>
    </div>

    {/* Event Type */}
    <div className="col-span-1 sm:col-span-2">
      <label className="block font-medium text-indigo-900 dark:text-purple-300">Event Type</label>
      <select
        name="eventType"
        value={eventData.eventType}
        onChange={handleChange}
        className="w-full p-3 border border-purple-200 dark:border-purple-800 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none bg-white dark:bg-[#322749] text-gray-900 dark:text-purple-100"
      >
        <option>Conference</option>
        <option>Meeting</option>
        <option>Workshop</option>
        <option>Networking</option>
        <option>Webinar</option>
        <option>Other</option>
      </select>
    </div>

    {/* Submit Button */}
    <div className="sm:col-span-2 flex justify-center">
      <button
        type="submit"
        className="w-full sm:w-1/2 py-3 bg-indigo-700 hover:bg-purple-800 text-white font-semibold rounded-lg shadow-md transform hover:scale-105 transition-all duration-300"
      >
        {initialEvent ? "Update Event" : "Add Event"}
      </button>
    </div>
  </form>
</div>

  );
};

export default EventForm;
