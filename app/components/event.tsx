interface EventGridProps {
    events: Array<{
        "Event Type": string;
        "Event Name": string;
        "Organizer Name": string;
        "Event Date": string;
        "Event Time": string;
        Location: string;
        Address: string;
    }>;
}

const EventGrid: React.FC<EventGridProps> = ({ events }) => {
    console.log("Received events:", events); // Debugging

    if (!events || events.length === 0) {
        return <p className="text-center text-gray-500">No events found.</p>;
    }

    return (
        <div className="p-6" id="event">
            <h1 className="text-3xl font-bold text-center mb-6">Upcoming Tech Events</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                        <img
                            src={event["Event Type"] === "Conference" ? 
                                "https://images.unsplash.com/photo-1540575467063-178a50c2df87" :
                                "https://images.unsplash.com/photo-1591115765373-5207764f72e7"}
                            alt={event["Event Name"]}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    event["Event Type"] === "Conference" ? "bg-blue-100 text-blue-800" :
                                    event["Event Type"] === "Workshop" ? "bg-purple-100 text-purple-800" :
                                    "bg-green-100 text-green-800"
                                }`}>
                                    {event["Event Type"]}
                                </span>
                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                    {event.Location}
                                </span>
                            </div>
                            <h2 className="text-xl font-bold mb-2">{event["Event Name"]}</h2>
                            <div className="text-gray-600 mb-2"><strong>Organizer:</strong> {event["Organizer Name"]}</div>
                            <div className="flex items-center text-gray-600 mb-2">
                                <span className="material-symbols-outlined mr-2">calendar_today</span>
                                <span>{event["Event Date"]} at {event["Event Time"]}</span>
                            </div>
                            <div className="flex items-center text-gray-600 mb-4">
                                <span className="material-symbols-outlined mr-2">location_on</span>
                                <span>{event.Address}</span>
                            </div>
                            <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg transform hover:scale-105 transition-all duration-300">
                                {event["Event Type"] === "Workshop" ? "Join Workshop" : "Register Now"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default EventGrid;
