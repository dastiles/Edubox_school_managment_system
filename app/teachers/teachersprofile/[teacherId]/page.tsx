import getTeacherById from '@/app/actions/getTeacherById'
import getUpdatedUser from '@/app/actions/getUpdatedUser'
import ContentWrapper from '@/app/components/ContentWrapper'
import Header from '@/app/components/header/Header'
import Sidebar from '@/app/components/sidebar/Sidebar'
import TeacherProfileWrapper from './TeacherProfileWrapper'

interface Iparams {
    teacherId: string
}
const TeacherProfile = async ({ params }: { params: Iparams }) => {
    const user = await getUpdatedUser()
    const teacher = await getTeacherById(params)

    return (
        <>
            <div className="main-wrapper">
                {/* Header */}
                <Header currentUser={user!} />
                {/* Sidebar */}
                <Sidebar />
                {/* Page Wrapper */}

                <ContentWrapper title='Teacher Details' titleActive='Teacher Details' href='/teacher' linkTitle='Teacher' >
                    <TeacherProfileWrapper teacher={teacher!} />
                </ContentWrapper>


            </div>
        </>
    )
}

export default TeacherProfile