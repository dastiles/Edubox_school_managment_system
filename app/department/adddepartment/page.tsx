import getUpdatedUser from "@/app/actions/getUpdatedUser";
import ContentWrapper from "@/app/components/ContentWrapper";
import Sidebar from "@/app/components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import DepartmentAddWrapper from "./DepartmentAddWrapper";
import getTeachers from "@/app/actions/getTeachers";

const AddDepartment = async () => {
  const user = await getUpdatedUser();
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
          title="Department"
          titleActive="Add Department"
          href="/department"
          linkTitle="Departments"
        >
          <DepartmentAddWrapper teachers={teachers!} />
        </ContentWrapper>
      </div>
    </>
  );
};

export default AddDepartment;
