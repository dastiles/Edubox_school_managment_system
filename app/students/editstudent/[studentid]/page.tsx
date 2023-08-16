import getUpdatedUser from '@/app/actions/getUpdatedUser'
import ContentWrapper from '@/app/components/ContentWrapper'
import Header from '@/app/components/header/Header'
import Sidebar from '@/app/components/sidebar/Sidebar'
import StudentEditWrapper from './StudentEditWrapper'
import getStudentById from '@/app/actions/getStudentById'


interface Iparams {
    studentId: string
}
const StudentEdit = async ({ params }: { params: Iparams }) => {
    const user = await getUpdatedUser()
    const student = await getStudentById(params)


    return (
        <>
            <div className="main-wrapper">
                {/* Header */}
                <Header currentUser={user!} />
                {/* Sidebar */}
                <Sidebar />
                {/* Page Wrapper */}

                <ContentWrapper title='Edit Students' titleActive='Edit Students' href='/students' linkTitle='Student' >
                    <StudentEditWrapper student={student!} />
                </ContentWrapper>


            </div>
        </>
    )
}

export default StudentEdit