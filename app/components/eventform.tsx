import React, { useState, useEffect } from "react";
import { Calendar, MapPin, User, Clock, Sparkles, Plus, Edit, X } from "lucide-react";

interface EventFormProps {
  onSave?: (event: any) => void;
  initialEvent?: any;
}

const EventForm: React.FC<EventFormProps> = ({ onSave, initialEvent }) => {
  // State for form data
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

  // UI state for animations, loading, and messages
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "error" | null>(null);

  // Trigger fade-in animation on component mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Handler for form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate an API call with a 1.5-second delay
    setTimeout(() => {
      try {
        console.log("Event data submitted:", eventData);
        setModalMessage("Event added successfully!");
        setModalType("success");
        setShowModal(true);
        if (onSave) {
          onSave(eventData);
        }
        // Reset form after successful submission
        setEventData({
          eventName: "",
          location: "",
          address: "",
          organizer: "",
          date: "",
          time: "",
          eventType: "Conference",
        });
      } catch (error) {
        console.error("Failed to save event:", error);
        setModalMessage("Failed to add event. Please try again.");
        setModalType("error");
        setShowModal(true);
      } finally {
        setIsSubmitting(false);
      }
    }, 1500);
  };


  

  // Function to get event-type-specific colors for the new theme

  
  const getEventTypeColor = (type: string) => {
    const colors = {
      'Conference': 'from-red-600 to-red-800',
      'Meeting': 'from-rose-600 to-rose-800',
      'Workshop': 'from-neutral-800 to-neutral-900',
      'Networking': 'from-neutral-600 to-neutral-800',
      'Webinar': 'from-red-500 to-rose-500',
      'Other': 'from-black to-neutral-800'
    };
    return colors[type as keyof typeof colors] || colors.Other;
  };

  // Simple modal component
  const Modal = ({ message, type, onClose }: { message: string, type: "success" | "error" | null, onClose: () => void }) => {
    const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className={`relative ${bgColor} text-white p-8 rounded-xl shadow-lg transform transition-all duration-300 scale-100`}>
          <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors">
            <X size={24} />
          </button>
          <div className="text-center font-bold text-xl">{message}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden py-16" id="eventform">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gray-900/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rose-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900">
              {initialEvent ? "Update" : "Create"}
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-900 via-rose-900 to-black">
              Your Events
            </span>
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-inter">
            Host amazing events and connect with the community
          </p>
        </div>

        {/* Form Container */}
        <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-900 via-rose-900 to-black rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            
            <div className="relative bg-white backdrop-blur-xl rounded-3xl border border-gray-200 shadow-2xl overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${getEventTypeColor(eventData.eventType)}`}></div>
              
              <div className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Event Name & Location */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center text-gray-700 font-semibold text-base mb-2">
                        <Sparkles className="w-4 h-4 text-red-900 mr-2" /> Event Name
                      </label>
                      <input
                        type="text"
                        name="eventName"
                        placeholder="Enter your amazing event name"
                        value={eventData.eventName}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('eventName')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full p-3 bg-white border-2 rounded-lg text-gray-800 placeholder-gray-500 font-medium transition-all duration-300 focus:outline-none ${focusedField === 'eventName' ? 'border-red-900 shadow-lg shadow-red-500/25 scale-[1.01]' : 'border-gray-200 hover:border-gray-300'}`}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center text-gray-700 font-semibold text-base mb-2">
                        <MapPin className="w-4 h-4 text-gray-900 mr-2" /> Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        placeholder="City or venue name"
                        value={eventData.location}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('location')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full p-3 bg-white border-2 rounded-lg text-gray-800 placeholder-gray-500 font-medium transition-all duration-300 focus:outline-none ${focusedField === 'location' ? 'border-gray-900 shadow-lg shadow-gray-900/25 scale-[1.01]' : 'border-gray-200 hover:border-gray-300'}`}
                        required
                      />
                    </div>
                  </div>

                  {/* Full Address */}
                  <div className="space-y-2">
                    <label className="flex items-center text-gray-700 font-semibold text-base mb-2">
                      <MapPin className="w-4 h-4 text-rose-900 mr-2" /> Full Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Complete address with landmarks"
                      value={eventData.address}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('address')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full p-3 bg-white border-2 rounded-lg text-gray-800 placeholder-gray-500 font-medium transition-all duration-300 focus:outline-none ${focusedField === 'address' ? 'border-rose-900 shadow-lg shadow-rose-500/25 scale-[1.01]' : 'border-gray-200 hover:border-gray-300'}`}
                      required
                    />
                  </div>

                  {/* Organizer & Event Type */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center text-gray-700 font-semibold text-base mb-2">
                        <User className="w-4 h-4 text-red-900 mr-2" /> Organizer Name
                      </label>
                      <input
                        type="text"
                        name="organizer"
                        placeholder="Your name or organization"
                        value={eventData.organizer}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('organizer')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full p-3 bg-white border-2 rounded-lg text-gray-800 placeholder-gray-500 font-medium transition-all duration-300 focus:outline-none ${focusedField === 'organizer' ? 'border-red-900 shadow-lg shadow-red-500/25 scale-[1.01]' : 'border-gray-200 hover:border-gray-300'}`}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center text-gray-700 font-semibold text-base mb-2">
                        <Sparkles className="w-4 h-4 text-black mr-2" /> Event Type
                      </label>
                      <select
                        name="eventType"
                        value={eventData.eventType}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('eventType')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full p-3 bg-white border-2 rounded-lg text-gray-800 font-medium transition-all duration-300 focus:outline-none appearance-none cursor-pointer ${focusedField === 'eventType' ? 'border-black shadow-lg shadow-black/25 scale-[1.01]' : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        <option value="Conference">Conference</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Networking">Networking</option>
                        <option value="Webinar">Webinar</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center text-gray-700 font-semibold text-base mb-2">
                        <Calendar className="w-4 h-4 text-rose-900 mr-2" /> Event Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={eventData.date}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('date')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full p-3 bg-white border-2 rounded-lg text-gray-800 font-medium transition-all duration-300 focus:outline-none ${focusedField === 'date' ? 'border-rose-900 shadow-lg shadow-rose-500/25 scale-[1.01]' : 'border-gray-200 hover:border-gray-300'}`}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center text-gray-700 font-semibold text-base mb-2">
                        <Clock className="w-4 h-4 text-gray-800 mr-2" /> Event Time
                      </label>
                      <input
                        type="time"
                        name="time"
                        value={eventData.time}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('time')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full p-3 bg-white border-2 rounded-lg text-gray-800 font-medium transition-all duration-300 focus:outline-none ${focusedField === 'time' ? 'border-gray-800 shadow-lg shadow-gray-800/25 scale-[1.01]' : 'border-gray-200 hover:border-gray-300'}`}
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`group relative px-10 py-3 bg-gradient-to-r ${getEventTypeColor(eventData.eventType)} text-white font-bold text-base rounded-xl shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${!isSubmitting ? 'hover:scale-105 transform' : ''}`}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            {initialEvent ? <Edit className="w-4 h-4 mr-3" /> : <Plus className="w-4 h-4 mr-3" />}
                            {initialEvent ? "Update Event" : "Create Event"}
                          </>
                        )}
                      </span>
                    </button>
                  </div>

                  {/* Event Preview */}
                  {eventData.eventName && (
                    <div className="mt-8 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                      <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center">
                        <Sparkles className="w-4 h-4 text-red-900 mr-2" /> Event Preview
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="flex items-center text-gray-600">
                          <span className="font-medium">Name:</span>
                          <span className="ml-2">{eventData.eventName}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <span className="font-medium">Type:</span>
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs text-white bg-gradient-to-r ${getEventTypeColor(eventData.eventType)}`}>
                            {eventData.eventType}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <span className="font-medium">Location:</span>
                          <span className="ml-2">{eventData.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <span className="font-medium">Organizer:</span>
                          <span className="ml-2">{eventData.organizer}</span>
                        </div>
                      </div>
                    </div>
                  )}

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && <Modal message={modalMessage} type={modalType} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default EventForm;