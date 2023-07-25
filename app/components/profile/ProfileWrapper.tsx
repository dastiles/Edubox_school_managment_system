'use client'
import { Admin } from '@prisma/client'
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'
import ProfileText from './ProfileText'
import ProfileDetails from './ProfileDetails'
import AccountSkills from './AccountSkills'
import "../../../assets/plugins/bootstrap/js/bootstrap.bundle.min.js"

interface ProfileWrapperProps {
    user: Admin
}

const ProfileWrapper: React.FC<ProfileWrapperProps> = ({
    user
}) => {
    return (
        <div className="page-wrapper">
            <div className="content container-fluid">
                {/* Page Header */}
                <div className="page-header">
                    <div className="row">
                        <div className="col">
                            <h3 className="page-title">Profile</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link href="/">Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active">Profile</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* /Page Header */}
                <div className="row">
                    <div className="col-md-12">
                        <div className="profile-header">
                            <div className="row align-items-center">
                                <div className="col-auto profile-image">
                                    <Link href="#">
                                        <img
                                            className="rounded-circle"
                                            alt="User Image"
                                            src='/img/profiles/avatar-01.jpg'
                                        />
                                    </Link>
                                </div>
                                <div className="col ms-md-n2 profile-user-info">
                                    <h4 className="user-name mb-0">{user.username}</h4>
                                    <h6 className="text-muted">UI/UX Design Team</h6>
                                    <div className="user-Location">
                                        <i className="fas fa-map-marker-alt" /> {user.location}
                                    </div>
                                    <div className="about-text">{user.about}</div>
                                </div>
                                <div className="col-auto profile-btn">
                                    <Link href={`/profile/editprofile`} className="btn btn-primary">
                                        Edit
                                    </Link>
                                </div>

                            </div>
                        </div>
                        <div className="profile-menu">
                            <ul className="nav nav-tabs nav-tabs-solid">
                                <li className="nav-item">
                                    <Link
                                        className="nav-link active"
                                        data-bs-toggle="tab"
                                        href="#per_details_tab"
                                    >
                                        About
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" data-bs-toggle="tab" href="#password_tab">
                                        Password
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="tab-content profile-tab-cont">
                            {/* Personal Details Tab */}
                            <div className="tab-pane fade show active" id="per_details_tab">
                                {/* Personal Details */}
                                <div className="row">
                                    <ProfileDetails user={user!} />
                                    <AccountSkills />
                                </div>
                                {/* /Personal Details Tab */}

                            </div>
                            {/* Change Password Tab */}
                            <div id="password_tab" className="tab-pane fade">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Change Password</h5>
                                        <div className="row">
                                            <div className="col-md-10 col-lg-6">
                                                <form>
                                                    <div className="form-group">
                                                        <label>Old Password</label>
                                                        <input type="password" className="form-control" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>New Password</label>
                                                        <input type="password" className="form-control" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Confirm Password</label>
                                                        <input type="password" className="form-control" />
                                                    </div>
                                                    <button className="btn btn-primary" type="submit">
                                                        Save Changes
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* /Change Password Tab */}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProfileWrapper