import getUpdatedUser from "@/app/actions/getUpdatedUser"
import ContentWrapper from "@/app/components/ContentWrapper"
import Sidebar from "@/app/components/sidebar/Sidebar"
import Header from '../../components/header/Header'
import TeacherAddWrapper from "./TeacherAddWrapper"



const AddTeacher = async () => {
    const user = await getUpdatedUser()

    return (
        <>
            <div className="main-wrapper">
                {/* Header */}
                <Header currentUser={user!} />
                {/* Sidebar */}
                <Sidebar />
                {/* Page Wrapper */}

                <ContentWrapper title='Teachers' titleActive='Add Teacher' href='/teacher' linkTitle='Teachers' >
                    <TeacherAddWrapper />
                </ContentWrapper>


            </div>
        </>
    )
}

export default AddTeacher