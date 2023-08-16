"use client";
/* eslint-disable @next/next/no-img-element */
import StudentActivity from "@/app/students/studentview/[studentId]/StudentActivity";
import { Teacher } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface TeacherProfileWrapperProps {
  teacher: Teacher;
}
const TeacherProfileWrapper: React.FC<TeacherProfileWrapperProps> = ({
  teacher,
}) => {
  const router = useRouter();

  const deleteTeacher = () => {
    axios
      .delete(`/api/teachers/deleteteacher/${teacher.id}`)
      .then(() => {
        toast.success("Teacher deleted successfully");
        router.refresh();
        router.push("/teachers");
      })
      .catch(() => toast.error("Something went wrong"));
  };
  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-md-12">
            <div className="about-info">
              <h4>Profile </h4>
            </div>
            {/* student profile heade */}
            <div className="student-profile-head">
              <div className="profile-bg-img">
                <img src="/img/profile-bg.jpg" alt="Profile" />
              </div>
              <div className="row">
                <div className="col-lg-4 col-md-4">
                  <div className="profile-user-box">
                    <div className="profile-user-img">
                      <img src="/img/profile-user.jpg" alt="Profile" />
                      <div className="form-group students-up-files profile-edit-icon mb-0">
                        <div className="uplod d-flex">
                          <label className="file-upload profile-upbtn mb-0">
                            <i className="feather-edit-3"></i>
                            <input type="file" />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="names-profiles">
                      <h4>{teacher.name}</h4>
                      {/* <h5>Computer Science</h5> */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 d-flex align-items-center">
                  <div className="follow-btn-group">
                    <Link href={`/teachers/editteacher/${teacher.id}`}>
                      <button
                        type="submit"
                        className="btn btn-info follow-btns"
                      >
                        Edit
                      </button>
                    </Link>

                    <button
                      className="btn btn-info message-btns"
                      onClick={deleteTeacher}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <div className="student-personals-grp">
                    <div className="card">
                      <div className="card-body">
                        <div className="heading-detail">
                          <h4>Personal Details :</h4>
                        </div>

                        <StudentActivity title={teacher.name!} heading="Name" />
                        <StudentActivity
                          title={teacher.email!}
                          heading="Email"
                        />
                        <StudentActivity
                          title={teacher.phone_number!}
                          heading="Phone Number"
                        />
                        <StudentActivity
                          title={teacher.gender!}
                          heading="Gender"
                        />
                        <StudentActivity
                          title={teacher.subject_taught!}
                          heading="Department"
                        />
                        <StudentActivity
                          title={teacher.address!}
                          heading="Address"
                        />
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
                          <h5>Hello I am {teacher.name}</h5>
                          <p>{/* {student.} */}</p>
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
  );
};

export default TeacherProfileWrapper;
