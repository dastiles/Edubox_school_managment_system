import getUpdatedUser from "@/app/actions/getUpdatedUser";
import ContentWrapper from "@/app/components/ContentWrapper";
import Sidebar from "@/app/components/sidebar/Sidebar";
import Header from "../components/header/Header";
import DepartmentListWrapper from "./DepartmentListWrapper";
import getDepartments from "../actions/getDepartments";
import getTeachers from "../actions/getTeachers";

const AddDepartment = async () => {
  const user = await getUpdatedUser();
  const departments = await getDepartments();
  const teachers = (await getTeachers()) || [];

  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
        <Header currentUser={user!} />
        {/* Sidebar */}
        <Sidebar />
        {/* Page Wrapper */}

        <ContentWrapper
          title="Departments"
          titleActive="Dashboard"
          href="/"
          linkTitle="Departments"
        >
          <DepartmentListWrapper
            teachers={teachers!}
            departments={departments!}
          />
        </ContentWrapper>
      </div>
    </>
  );
};

export default AddDepartment;
