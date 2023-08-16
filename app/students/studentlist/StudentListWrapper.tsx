"use client";
import Link from "next/link";
import { useState } from "react";
import { Student } from "@prisma/client";
import { Table, Tooltip } from "antd";
import { itemRender, onShowSizeChange } from "./pagination";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  AiFillEdit,
  AiFillDelete,
  AiOutlineUnorderedList,
  AiOutlinePlusSquare,
} from "react-icons/ai";
import { BsFillGridFill } from "react-icons/bs";
import DangerModal from "@/app/components/Modals/dangerModal";

interface StudentListWrapperProps {
  students: Student[];
}

const StudentListWrapper: React.FC<StudentListWrapperProps> = ({
  students,
}) => {
  const router = useRouter();

  const deleteStudent = (id: string) => {
    axios
      .delete(`/api/students/deletestudent/${id}`)
      .then(() => {
        toast.success("Student deleted successfully");
        router.refresh();
        router.push("/students");
      })
      .catch(() => toast.error("Something went wrong"));
  };
  const [selectedId, setSelectedId] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys: any) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const data = students.map((student) => {
    return {
      id: student.id,
      first_name: student.first_name,
      last_name: student.last_name,
      address: student.address,
      phone_number: student.phone_number,
      email: student.email,
    };
  });

  const column = [
    {
      title: "Name",
      dataIndex: "last_name",
      sorter: (a: any, b: any) => a.Name.length - b.Name.length,
      render: (text: string, record: any) => (
        <>
          <h2 className="table-avatar">
            <Link
              href={`/students/studentview/${record.id}`}
              className="avatar avatar-sm me-2 "
            >
              <img
                className="avatar-img rounded-circle"
                src="/img/profiles/avatar-07.jpg"
                alt="User Image"
              />
            </Link>
            <Link
              className="text-dark"
              href={`/students/studentview/${record.id}`}
            >{`${record.first_name} ${record.last_name}`}</Link>
          </h2>
        </>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a: any, b: any) => a.Name.length - b.Name.length,
    },
    {
      title: "Phone Numnber",
      dataIndex: "phone_number",
      sorter: (a: any, b: any) => a.Name.length - b.Name.length,
    },

    {
      title: "Address",
      dataIndex: "address",
      sorter: (a: any, b: any) => a.Name.length - b.Name.length,
    },

    {
      title: "Action",
      dataIndex: "Action",
      render: (text: string, record: any) => (
        <>
          <div className="actions">
            <Tooltip
              placement="top"
              title={`Edit ${record.first_name} ${record.last_name}`}
            >
              <Link
                href={`/students/editstudent/${record.id}`}
                className="btn btn-sm bg-success-light me-2"
              >
                <i className="feather-eye">
                  <AiFillEdit />
                </i>
              </Link>
            </Tooltip>
            <Tooltip
              placement="top"
              title={`Delete ${record.first_name} ${record.last_name}`}
            >
              <Link
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#danger-alert-modal"
                onClick={() => setSelectedId(record.id)}
                className="btn btn-sm bg-danger-light"
              >
                <i className="feather-edit">
                  <AiFillDelete />
                </i>
              </Link>
            </Tooltip>
          </div>
        </>
      ),
    },
  ];
  return (
    <>
      <div className="student-group-form">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search by ID ..."
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Name ..."
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Phone ..."
              />
            </div>
          </div>
          <div className="col-lg-2">
            <div className="search-student-btn">
              <button type="button" className="btn btn-primary">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table comman-shadow">
            <div className="card-body pb-0">
              {/* Page Header */}
              <div className="page-header">
                <div className="row align-items-center">
                  <div className="col">
                    <h3 className="page-title">Students</h3>
                  </div>
                  <div className="col-auto text-end float-end ms-auto download-grp">
                    <Link
                      href="/students/studentlist"
                      className="btn btn-outline-gray me-2 active"
                    >
                      <AiOutlineUnorderedList />
                    </Link>
                    <Link
                      href="/students"
                      className="btn btn-outline-gray me-2"
                    >
                      <BsFillGridFill />
                    </Link>

                    <Link
                      href="/students/addstudents"
                      className="btn btn-primary"
                    >
                      <AiOutlinePlusSquare />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <Table
                  pagination={{
                    total: students.length,
                    showTotal: (total, range) =>
                      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger: true,
                    onShowSizeChange: onShowSizeChange,
                    itemRender: itemRender,
                  }}
                  columns={column}
                  dataSource={data}
                  rowSelection={rowSelection}
                  rowKey={(record) => record.id}
                />
                <DangerModal
                  title="Delete Student"
                  info="Are sure you want to delete?"
                  btn_text="Delete"
                  onClick={() => deleteStudent(selectedId)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentListWrapper;
