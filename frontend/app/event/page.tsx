"use client";
//@ts-ignore
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import SearchFilterEvent from "../components/SearchFilterEvent";
import EventCard from "../components/EventCard";
import LightButton from "../components/LightButton";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import {
  EventFilterType,
  getAllUpComingEventType,
} from "../interfaces/event.interface";
import toast from "react-hot-toast";
import { getAllUpComingEventsService } from "../Services/event.service";
function page() {
  const [events, setEvents] = useState<getAllUpComingEventType[]>([]);

  // States for filtering  :-
  const [comedianId, setComedianId] = useState<string | undefined>(undefined);
  const [locationId, setLocationId] = useState<number | undefined>(undefined);
  const [venueId, setVenueId] = useState<number | undefined>(undefined);
  const [ename, setEname] = useState<string | undefined>(undefined);

  const router = useRouter();

  // const token =
  // typeof localStorage !== undefined ? localStorage.getItem("authToken") : "";
  function handleSendToAddEvent() {
    router.push("/event/add");
  }

  async function fetchAllUpComingEventList({
    comedianId,
    ename,
    locationId,
    venueId,
  }: EventFilterType) {
    try {
      const resData = await getAllUpComingEventsService({
        comedianId,
        ename,
        locationId,
        venueId,
      });

      if (resData.data) {
        setEvents(resData.data);
      }

      toast.success("All Events List");
    } catch (error: AxiosError) {
      toast.error(error?.response?.data?.message);
    }
  }
  useEffect(() => {
    // For Fetching all the UpComing Event List :-
    fetchAllUpComingEventList({
      ename,
      locationId: locationId?.toString(),
      comedianId,
      venueId: venueId?.toString(),
    });
  }, [ename, locationId, comedianId, venueId]);

  return (
    <div className="min-h-[70%] w-[80%] mx-auto p-5">
      <div className="flex items-center justify-between">
        <div className="add-event-heading">
          <h1 className="text-2xl">Comedy Events</h1>
          <p className="text-sm">
            Discover upcoming comedy shows and performance in your area
          </p>
        </div>
        <LightButton btnText="+ Add Event" callback={handleSendToAddEvent} />
      </div>

      {/* Component for search and filter events */}
      <SearchFilterEvent
        ename={ename}
        setEname={setEname}
        comedianId={comedianId}
        setComedianId={setComedianId}
        locationId={locationId}
        setLocationId={setLocationId}
        venueId={venueId}
        setVenueId={setVenueId}
      />

      <div className="event-card flex items-center gap-4 justify-center mt-12">
        {events.length > 0 &&
          events.map((eventDetails) => {
            return (
              // <div key={eventDetails.id}>
              <EventCard key={eventDetails.id} eventDetails={eventDetails} />
              // </div>
            );
          })}
      </div>

      <div className="pagination mt-5 flex items-center justify-center gap-2">
        <button>
          {" "}
          <IoIosArrowBack />{" "}
        </button>
        <LightButton btnText="1" />
        <LightButton btnText="2" />
        <LightButton btnText="3" />
        <button>
          {" "}
          <IoIosArrowForward />{" "}
        </button>
      </div>
    </div>
  );
}

export default page;
