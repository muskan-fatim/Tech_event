import React, { useState, useEffect } from "react";
import { Calendar, MapPin, User, Clock, Sparkles, Plus, Edit } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const initialFormState = {
  eventName: "",
  location: "",
  address: "",
  organizer: "",
  date: "",
  time: "10:00",
  eventType: "Conference",
};

interface EventData {
  eventName: string;
  location: string;
  address: string;
  organizer: string;
  date: string;
  time: string;
  eventType: string;
}

interface EventFormProps {
  onSave?: (event: EventData) => void;
  initialEvent?: EventData;
}

const EventForm: React.FC<EventFormProps> = ({ onSave, initialEvent }) => {
  const [eventData, setEventData] = useState<EventData>(initialEvent || initialFormState);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const minDate = (() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  })();

  // Allowed times: 10:00 to 19:00 (30-min intervals)
  const allowedTimes = Array.from({ length: (19 - 10) * 2 + 1 }, (_, i) => {
    const hour = 10 + Math.floor(i / 2);
    const minute = i % 2 === 0 ? "00" : "30";
    return `${hour.toString().padStart(2, "0")}:${minute}`;
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    setEventData(initialEvent || initialFormState);
  }, [initialEvent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!allowedTimes.includes(eventData.time)) {
      toast.error("Time must be between 10:00 AM and 7:00 PM in 30-minute intervals.");
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Saving event data:", eventData);
      toast.success("Event saved successfully!");
      onSave?.(eventData);
      if (!initialEvent) setEventData(initialFormState);
    } catch (error) {
      console.error("Failed to save event:", error);
      toast.error("Failed to save event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getEventTypeColor = (type: string) => {
    const colors = {
      Conference: "from-red-600 to-red-800",
      Meeting: "from-rose-600 to-rose-800",
      Workshop: "from-neutral-800 to-neutral-900",
      Networking: "from-neutral-600 to-neutral-800",
      Webinar: "from-red-500 to-rose-500",
      Other: "from-black to-neutral-800",
    };
    return colors[type as keyof typeof colors] || colors.Other;
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden py-16 font-sans">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gray-900/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rose-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "4s" }}></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900">
              {initialEvent ? "Update" : "Create"}
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-900 via-rose-900 to-black">
              Your Events
            </span>
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Host amazing events and connect with the community.
          </p>
        </div>

        <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-900 via-rose-900 to-black rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>

            <div className="relative bg-white backdrop-blur-xl rounded-3xl border border-gray-200 shadow-2xl overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${getEventTypeColor(eventData.eventType)}`}></div>

              <div className="p-8 sm:p-12">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Event Name & Location */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {[
                      { label: "Event Name", icon: <Sparkles className="w-5 h-5 text-red-900 mr-2" />, name: "eventName", placeholder: "Enter your amazing event name" },
                      { label: "Location", icon: <MapPin className="w-5 h-5 text-gray-900 mr-2" />, name: "location", placeholder: "City or venue name" },
                    ].map((field) => (
                      <div key={field.name} className="space-y-2">
                        <label className="flex items-center text-gray-700 font-semibold text-lg mb-3">{field.icon}{field.label}</label>
                        <input
                          type="text"
                          name={field.name}
                          value={(eventData as any)[field.name]}
                          onChange={handleChange}
                          onFocus={() => setFocusedField(field.name)}
                          onBlur={() => setFocusedField(null)}
                          placeholder={field.placeholder}
                          className={`w-full p-4 bg-white border-2 rounded-xl text-gray-800 placeholder-gray-500 font-medium transition-all duration-300 focus:outline-none ${focusedField === field.name ? "border-red-900 shadow-lg shadow-red-500/25 scale-[1.01]" : "border-gray-200 hover:border-gray-300"}`}
                          required
                        />
                      </div>
                    ))}
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <label className="flex items-center text-gray-700 font-semibold text-lg mb-3">
                      <MapPin className="w-5 h-5 text-rose-900 mr-2" /> Full Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={eventData.address}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("address")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Complete address with landmarks"
                      className={`w-full p-4 bg-white border-2 rounded-xl text-gray-800 placeholder-gray-500 font-medium transition-all duration-300 focus:outline-none ${focusedField === "address" ? "border-rose-900 shadow-lg shadow-rose-500/25 scale-[1.01]" : "border-gray-200 hover:border-gray-300"}`}
                      required
                    />
                  </div>

                  {/* Organizer & Event Type */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="flex items-center text-gray-700 font-semibold text-lg mb-3">
                        <User className="w-5 h-5 text-red-900 mr-2" /> Organizer Name
                      </label>
                      <input
                        type="text"
                        name="organizer"
                        value={eventData.organizer}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("organizer")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Your name or organization"
                        className={`w-full p-4 bg-white border-2 rounded-xl text-gray-800 placeholder-gray-500 font-medium transition-all duration-300 focus:outline-none ${focusedField === "organizer" ? "border-red-900 shadow-lg shadow-red-500/25 scale-[1.01]" : "border-gray-200 hover:border-gray-300"}`}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center text-gray-700 font-semibold text-lg mb-3">
                        <Sparkles className="w-5 h-5 text-black mr-2" /> Event Type
                      </label>
                      <select
                        name="eventType"
                        value={eventData.eventType}
                        onChange={handleChange}
                        className="w-full p-4 bg-white border-2 rounded-xl text-gray-800 font-medium appearance-none cursor-pointer border-gray-200 hover:border-gray-300 focus:outline-none"
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
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="flex items-center text-gray-700 font-semibold text-lg mb-3">
                        <Calendar className="w-5 h-5 text-rose-900 mr-2" /> Event Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={eventData.date}
                        min={minDate}
                        onChange={handleChange}
                        className="w-full p-4 bg-white border-2 rounded-xl text-gray-800 font-medium border-gray-200 hover:border-gray-300 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center text-gray-700 font-semibold text-lg mb-3">
                        <Clock className="w-5 h-5 text-gray-800 mr-2" /> Event Time
                      </label>
                      <select
                        name="time"
                        value={eventData.time}
                        onChange={handleChange}
                        className="w-full p-4 bg-white border-2 rounded-xl text-gray-800 font-medium border-gray-200 hover:border-gray-300 focus:outline-none appearance-none cursor-pointer"
                        required
                      >
                        {allowedTimes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex justify-center pt-8">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`group relative px-12 py-4 bg-gradient-to-r ${getEventTypeColor(eventData.eventType)} text-white font-bold text-lg rounded-2xl shadow-2xl transition-all duration-300 disabled:opacity-50 ${!isSubmitting ? "hover:scale-105" : ""}`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center"><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div> Saving...</span>
                      ) : (
                        <span className="flex items-center">{initialEvent ? <Edit className="w-5 h-5 mr-3" /> : <Plus className="w-5 h-5 mr-3" />}{initialEvent ? "Update Event" : "Create Event"}</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => (
  <>
    <Toaster
      position="bottom-center"
      toastOptions={{
        style: { background: "linear-gradient(to right, #1f2937, #111827)", color: "#fff" },
      }}
    />
    <EventForm />
  </>
);

export default App;
