/* eslint-disable @next/next/no-img-element */
import { Student } from "@prisma/client"
import StudentActivity from "./StudentActivity"

interface StudentViewWrapperProps {
    student: Student
}

const StudentViewWrapper: React.FC<StudentViewWrapperProps> = ({
    student
}) => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12">
                        <div className="about-info">
                            <h4>
                                Profile{" "}

                            </h4>
                        </div>
                        {/* student profile heade */}
                        <div className="student-profile-head">
                            <div className="profile-bg-img">
                                <img src='/img/profile-bg.jpg' alt="Profile" />
                            </div>
                            <div className="row">
                                <div className="col-lg-4 col-md-4">
                                    <div className="profile-user-box">
                                        <div className="profile-user-img">
                                            <img src='/img/profile-user.jpg' alt="Profile" />
                                            <div className="form-group students-up-files profile-edit-icon mb-0">
                                                <div className="uplod d-flex">
                                                    <label className="file-upload profile-upbtn mb-0">
                                                        <i className="feather-edit-3">

                                                        </i>
                                                        <input type="file" />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="names-profiles">
                                            <h4>{student.name}</h4>
                                            {/* <h5>Computer Science</h5> */}
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="col-lg-4 col-md-4 d-flex align-items-center">
                                    <div className="follow-btn-group">
                                        <button type="submit" className="btn btn-info follow-btns">
                                            Follow
                                        </button>
                                        <button type="submit" className="btn btn-info message-btns">
                                            Message
                                        </button>
                                    </div> 
                                </div>*/}
                            </div>
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="student-personals-grp">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="heading-detail">
                                                    <h4>Personal Details :</h4>
                                                </div>

                                                <StudentActivity title={student.name!} heading="Name" />
                                                <StudentActivity title={student.email!} heading="Email" />
                                                <StudentActivity title={student.phone_number!} heading="Phone Number" />
                                                <StudentActivity title={student.gender!} heading="Gender" />

                                                <StudentActivity title={student.address!} heading="Address" />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <div className="student-personals-grp">
                                        <div className="card mb-0">
                                            <div className="card-body">
                                                <div className="heading-detail">
                                                    <h4>About Me</h4>
                                                </div>
                                                <div className="hello-park">
                                                    <h5>Hello I am {student.name}</h5>
                                                    <p>
                                                        {/* {student.} */}
                                                    </p>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentViewWrapper