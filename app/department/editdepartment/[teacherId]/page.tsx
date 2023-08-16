import getUpdatedUser from "@/app/actions/getUpdatedUser";
import ContentWrapper from "@/app/components/ContentWrapper";
import Sidebar from "@/app/components/sidebar/Sidebar";
import Header from "../../../components/header/Header";
import DepartmentEditWrapper from "./DepartmentEditWrapper";
import getTeachers from "@/app/actions/getTeachers";
import getTeacherById from "@/app/actions/getTeacherById";
import getDepartmentById from "@/app/actions/getDepartmentById";

interface Iparams {
  teacherId: string;
}
const EditDepartment = async ({ params }: { params: Iparams }) => {
  const user = await getUpdatedUser();
  const teachers = (await getTeachers()) || [];
  const department = await getDepartmentById(params);
  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
        <Header currentUser={user!} />
        {/* Sidebar */}
        <Sidebar />
        {/* Page Wrapper */}

        <ContentWrapper
          title="Department"
          titleActive="Edit Department"
          href="/department"
          linkTitle="Departments"
        >
          <DepartmentEditWrapper
            teachers={teachers!}
            department={department!}
          />
        </ContentWrapper>
      </div>
    </>
  );
};

export default EditDepartment;
