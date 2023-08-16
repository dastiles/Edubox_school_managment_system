import getUpdatedUser from "@/app/actions/getUpdatedUser";
import ContentWrapper from "@/app/components/ContentWrapper";
import Sidebar from "@/app/components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import EventAddWrapper from "./EventAddWrapper";

const EventAdd = async () => {
  const user = await getUpdatedUser();

  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
        <Header currentUser={user!} />
        {/* Sidebar */}
        <Sidebar />
        {/* Page Wrapper */}

        <ContentWrapper
          title="Add Events"
          titleActive="Events"
          href="/event"
          linkTitle="Add Events"
        >
          <EventAddWrapper />
        </ContentWrapper>
      </div>
    </>
  );
};

export default EventAdd;
