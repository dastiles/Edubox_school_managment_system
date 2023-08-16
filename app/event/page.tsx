import getUpdatedUser from "@/app/actions/getUpdatedUser";
import ContentWrapper from "@/app/components/ContentWrapper";
import Sidebar from "@/app/components/sidebar/Sidebar";
import Header from "../components/header/Header";
import EventListWrapper from "./EventListWrapper";
import getEvents from "../actions/getEvents";

const Event = async () => {
  const user = await getUpdatedUser();
  const events = await getEvents();

  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
        <Header currentUser={user!} />
        {/* Sidebar */}
        <Sidebar />
        {/* Page Wrapper */}

        <ContentWrapper
          title="Events"
          titleActive="Dashboard"
          href="/"
          linkTitle="Events"
        >
          <EventListWrapper events={events!} />
        </ContentWrapper>
      </div>
    </>
  );
};

export default Event;
