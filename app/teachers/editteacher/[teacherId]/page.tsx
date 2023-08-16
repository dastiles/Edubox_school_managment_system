import getUpdatedUser from "@/app/actions/getUpdatedUser";
import ContentWrapper from "@/app/components/ContentWrapper";
import Sidebar from "@/app/components/sidebar/Sidebar";
import Header from "../../../components/header/Header";
import getTeacherById from "@/app/actions/getTeacherById";
import TeacherEditWrapper from "./TeacherEditWrapper";

interface Iparams {
  teacherId: string;
}

const EditTeacher = async ({ params }: { params: Iparams }) => {
  const user = await getUpdatedUser();
  const teacher = await getTeacherById(params);

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
          titleActive="Add Teacher"
          href="/teacher"
          linkTitle="Teachers"
        >
          <TeacherEditWrapper teacher={teacher!} />
        </ContentWrapper>
      </div>
    </>
  );
};

export default EditTeacher;
