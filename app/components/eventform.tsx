import React, { useState, useEffect } from "react";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

// This constant holds the clean slate for the form.
const initialFormState = {
  eventName: "",
  location: "",
  address: "",
  organizer: "",
  date: "",
  time: "10:00", // Default to the first available time slot
  eventType: "Conference",
};


const generateTimeOptions = () => {
  const options = [];
  // Loop from 10 AM (10) to 7 PM (19)
  for (let i = 10; i <= 19; i++) {
    const time = `${i.toString().padStart(2, '0')}:00`;
    options.push(time);
  }
  return options;
};
const timeOptions = generateTimeOptions();

interface EventFormProps {
  onSave?: (event: any) => void;
  initialEvent?: any;
}

const EventForm: React.FC<EventFormProps> = ({ onSave, initialEvent }) => {
  const [eventData, setEventData] = useState(initialEvent || initialFormState);
  
  
  const getMinDate = () => {
    const now = new Date();
    let minDate = new Date();

    
    if (now.getHours() >= 18) {
      minDate.setDate(now.getDate() + 1);
    }
    
    
    const year = minDate.getFullYear();
    const month = (minDate.getMonth() + 1).toString().padStart(2, '0');
    const day = minDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const minDate = getMinDate();

  useEffect(() => {
    if (initialEvent) {
      setEventData(initialEvent);
    } else {
      setEventData(initialFormState);
    }
  }, [initialEvent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/api/save-event', eventData);
      
      console.log("Saving event data:", eventData);

      if (response.status === 200) {
        toast.success('Event saved successfully!');
        
        if (onSave) {
          onSave(response.data);
        }

        if (!initialEvent) {
          setEventData(initialFormState);
        }
      }
    } catch (error) {
      console.error("Failed to save event:", error);
      toast.error('Failed to save event. Please try again.');
    }
  };

  return (
    <div id="eventform" className="max-w-4xl mx-auto bg-white mb-20 mt-5 shadow-lg rounded-xl p-6 md:p-8 lg:p-10 border border-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        {initialEvent ? "Edit Event" : "Create New Event"}
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Event Name */}
        <div className="col-span-1 sm:col-span-2">
          <label className="block font-medium text-gray-700 mb-1">Event Name</label>
          <input
            type="text"
            name="eventName"
            placeholder="Enter event name"
            value={eventData.eventName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none focus:shadow-sm transition-all duration-200 ease-in-out"
            required
          />
        </div>

        {/* Location */}
        <div className="col-span-1">
          <label className="block font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            placeholder="e.g., Conference Center"
            value={eventData.location}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none focus:shadow-sm transition-all duration-200 ease-in-out"
            required
          />
        </div>

        {/* Organizer Name */}
        <div className="col-span-1">
          <label className="block font-medium text-gray-700 mb-1">Organizer Name</label>
          <input
            type="text"
            name="organizer"
            placeholder="Your name or company"
            value={eventData.organizer}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none focus:shadow-sm transition-all duration-200 ease-in-out"
            required
          />
        </div>

        {/* Address */}
        <div className="sm:col-span-2">
          <label className="block font-medium text-gray-700 mb-1">Address</label>
          <input
            type="text"
            name="address"
            placeholder="123 Main St, Anytown, USA"
            value={eventData.address}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none focus:shadow-sm transition-all duration-200 ease-in-out"
            required
          />
        </div>

        {/* Date */}
        <div className="col-span-1">
          <label className="block font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none focus:shadow-sm transition-all duration-200 ease-in-out"
            required
            min={minDate}
          />
        </div>

        {/* Time */}
        <div className="col-span-1">
          <label className="block font-medium text-gray-700 mb-1">Time</label>
          <select
            name="time"
            value={eventData.time}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none focus:shadow-sm transition-all duration-200 ease-in-out"
            required
          >
            {timeOptions.map(time => (
              <option key={time} value={time}>
                {new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
              </option>
            ))}
          </select>
        </div>

        {/* Event Type */}
        <div className="col-span-1 sm:col-span-2">
          <label className="block font-medium text-gray-700 mb-1">Event Type</label>
          <select
            name="eventType"
            value={eventData.eventType}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none focus:shadow-sm transition-all duration-200 ease-in-out"
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
        <div className="sm:col-span-2 flex justify-center mt-4">
          <button
            type="submit"
            className="w-full sm:w-1/2 py-3 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-semibold rounded-lg shadow-md transform hover:scale-105 active:shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            {initialEvent ? "Update Event" : "Add Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans antialiased text-gray-800">
      <Toaster position="top-right" />
      <EventForm />
    </div>
  );
};

export default App;
