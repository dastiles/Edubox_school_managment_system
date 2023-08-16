"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Event } from "@prisma/client";

interface EventListWrapperProps {
  events: Event[];
}
const EventListWrapper: React.FC<EventListWrapperProps> = ({ events }) => {
  const toggleMobileMenu = () => {
    setMenu(!menu);
  };
  const [menu, setMenu] = useState<boolean>(false);
  const [startDate, setDate] = useState<Date>(new Date());
  const [showCategory, setshowCategory] = useState<boolean>(false);
  const [showmodel, setshowmodel] = useState<boolean>(false);
  const [showEvents, setshowEvents] = useState<boolean>(false);
  const [show, setshow] = useState<boolean>(false);
  const [iseditdelete, setiseditdelete] = useState<boolean>(false);
  const [addneweventobj, setaddneweventobj] = useState<any>(null);
  const [isnewevent, setisnewevent] = useState<boolean>(false);
  const [event_title, setevent_title] = useState<string>("");
  const [category_color, setcategory_color] = useState<string>("");
  const [calenderevent, setcalenderevent] = useState<any>("");
  const [weekendsVisible, setweekendsVisible] = useState<boolean>(true);
  const [currentEvents, setscurrentEvents] = useState<any[]>([]);

  let defaultEvents: any[] = events.map((event) => {
    return {
      title: event.name,
      start: event.start_date,
      end: event.end_date,
      className: event.event_type,
    };
  });
  // let defaultEvents: any[] = [
  //   {
  //     title: "Event Name 4",
  //     start: Date.now() + 148000000,
  //     className: "bg-purple",
  //   },
  //   {
  //     title: "Test Event 1",
  //     start: Date.now(),
  //     end: Date.now(),
  //     className: "bg-success",
  //   },
  //   {
  //     title: "Test Event 2",
  //     start: Date.now() + 168000000,
  //     className: "bg-info",
  //   },
  //   {
  //     title: "Test Event 3",
  //     start: Date.now() + 338000000,
  //     className: "bg-primary",
  //   },
  // ];
  useEffect(() => {
    let elements = Array.from(
      document.getElementsByClassName("react-datepicker-wrapper")
    );
    elements.map((element) => element.classList.add("width-100"));
  }, []);

  const handleChange = (date: Date) => {
    setDate(date);
  };
  const addEvent = () => {
    setshowEvents(true);
  };
  const categoryHandler = () => {
    setshowCategory(true);
  };

  const handleClose = () => {
    setisnewevent(false);
    setiseditdelete(false);
    setshow(false);
    setshowCategory(false);
    setshowEvents(false);
    setshowmodel(false);
  };

  const handleEventClick = (clickInfo: any) => {
    setiseditdelete(false);
    setevent_title(clickInfo.event.title);
    setcalenderevent(clickInfo.event);
  };

  const handleDateSelect = (selectInfo: any) => {
    setisnewevent(true);
    setaddneweventobj(selectInfo);
  };
  const addnewevent = () => {
    let calendarApi = addneweventobj.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (event_title) {
      calendarApi.addEvent({
        id: 10,
        title: event_title,
        className: category_color,
        start: addneweventobj.startStr,
        end: addneweventobj.endStr,
        allDay: addneweventobj.allDay,
      });
    }
    setisnewevent(false);
  };

  const onupdateModalClose = () => {
    setiseditdelete(false);
    setevent_title("");
  };
  const oncreateeventModalClose = () => {
    setevent_title("");
    setisnewevent(false);
  };
  const removeevent = () => {
    calenderevent.remove();
    setiseditdelete(false);
  };
  const clickupdateevent = () => {
    const newArray = defaultEvents;
    for (let i = 0; i < newArray.length; i++) {
      if (newArray[i].id === parseInt(calenderevent.id)) {
        newArray[i].title = event_title;
      }
    }
    defaultEvents = newArray;
    setiseditdelete(false);
  };

  const handleClick = () => {
    setshow(true);
  };
  console.log("showmodel", showmodel);
  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col" />
          <div className="col-auto text-end float-end ms-auto">
            <Link href="/event/addevent" className="btn btn-primary">
              <i className="fas fa-plus" />
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="card">
            <div className="card-body">
              <div id="calendar">
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                  }}
                  initialView="dayGridMonth"
                  editable={true}
                  selectable={true}
                  selectMirror={true}
                  dayMaxEvents={true}
                  weekends={weekendsVisible}
                  initialEvents={defaultEvents} // alternatively, use the `events` setting to fetch from a feed
                  select={handleDateSelect}
                  eventClick={(clickInfo) => handleEventClick(clickInfo)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add Event Modal */}
      <div className="modal fade none-border" id="my_event">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Event</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              ></button>
            </div>
            <div className="modal-body" />
            <div className="modal-footer justify-content-center">
              <button
                type="button"
                className="btn btn-success save-event submit-btn"
              >
                Create event
              </button>
              <button
                type="button"
                className="btn btn-danger delete-event submit-btn"
                data-dismiss="modal"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Event Modal */}
    </>
  );
};

export default EventListWrapper;
