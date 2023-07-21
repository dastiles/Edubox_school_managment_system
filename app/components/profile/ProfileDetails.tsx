'use client'

import Link from 'next/link'
import ProfileText from './ProfileText'
import { Admin } from '@prisma/client'

interface ProfileDetailsProps {
    user: Admin
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
    user
}) => {
    return (
        <div className="col-lg-9">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title d-flex justify-content-between">
                        <span>Personal Details</span>
                        <Link
                            className="edit-link"
                            // data-bs-toggle="modal"
                            href="#"
                        >
                            <i className="far fa-edit me-1" />
                            Edit
                        </Link>
                    </h5>
                    <ProfileText name='Name' value={user.username} />
                    <ProfileText name='Date of Birth' value='24 Jul 1983' />
                    <ProfileText name='Email ID' value={user.email} />
                    <ProfileText name='Mobile' value='0771315239' />
                    <ProfileText name='Email ID' value={user.email} />
                </div>
            </div>
        </div>
    )
}

export default ProfileDetails