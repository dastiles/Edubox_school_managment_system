import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import getUpdatedUser from "../../actions/getUpdatedUser";
import ContentWrapper from "../../components/ContentWrapper";
import TeachersListWrapper from "./TeacherListWrapper";
import getTeachers from "../../actions/getTeachers";

const TeachersView = async () => {
  const user = await getUpdatedUser();
  const teachers = await getTeachers();

  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
        <Header currentUser={user!} />
        {/* Sidebar */}
        <Sidebar />
        {/* Page Wrapper */}

        <ContentWrapper
          title="Teachers"
          titleActive="All Teachers"
          href="/"
          linkTitle="Dashboard"
        >
          {teachers ? (
            <TeachersListWrapper teachers={teachers!} />
          ) : (
            <p>No teachers found</p>
          )}
        </ContentWrapper>
      </div>
    </>
  );
};
export default TeachersView;
