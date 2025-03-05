import React, { useEffect, useState } from "react";
import EventTable from "./EventTable"; 
import { GetAllEvents } from "../api"; 

function EventManagementApp() {
  const [eventData, setEventData] = useState({
    "events": [],
    "pagination": {
      "totalEvents": 7,
      "currentPage": 2,
      "totalPages": 2,
      "pageSize": 5,
    },
  });
  
  const [search, setSearch] = useState(""); // Add search state

  const fetchEvents = async (search = "", page = 1, limit = 5) => {
    try {
      const data = await GetAllEvents(search, page, limit); // Fetch events based on search
      console.log(data); // Log fetched data

      // Make sure the API returns the structure we expect
      if (data) {
        setEventData({
          events: data.events || [], // Safely update the events
          pagination: data.pagination || {}, // Safely update the pagination info
        });
      } else {
        console.error("Invalid data structure:", data); // In case data is null or undefined
      }
    } catch (err) {
      console.log("Error fetching events:", err); // Log the error if the fetch fails
    }
  };

  useEffect(() => {
    fetchEvents(search); // Fetch events whenever the component mounts or search changes
  }, [search]); // Dependency array will trigger this effect when the `search` state changes

  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 p-3">
      <h1>Event Management App</h1>
      <div className="w-100 d-flex justify-content-center">
        <div className="w-80 border bg-light p-3" style={{ width: "80%" }}>
          <div className="d-flex justify-content-between mb-3">
            <button className="btn btn-primary">
              Add
            </button>
            <input
              type="text"
              placeholder="Search Event..."
              className="form-control w-50"
              value={search} // Bind input value to the search state
              onChange={(e) => setSearch(e.target.value)} // Update search state when input changes
            />
          </div>
          <EventTable
          events={eventData.events}
          pagination={eventData.pagination}/>
        </div>
      </div>
    </div>
  );
}

export default EventManagementApp;
