
import getUpdatedUser from '@/app/actions/getUpdatedUser'
import Header from '@/app/components/header/Header'
import ProfileWrapper from '@/app/components/profile/ProfileWrapper'
import Sidebar from '@/app/components/sidebar/Sidebar'





const Profile = async () => {

    const updatedUser = await getUpdatedUser()
    return (
        <div className="main-wrapper">
            {/* Header */}
            <Header currentUser={updatedUser!} />

            {/* Sidebar */}
            <Sidebar />
            <ProfileWrapper user={updatedUser!} />
        </div>
    )
}

export default Profile