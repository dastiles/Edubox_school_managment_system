"use client";
import { useState } from "react";
import {
  AiFillEdit,
  AiFillDelete,
  AiOutlineUnorderedList,
  AiOutlinePlusSquare,
} from "react-icons/ai";
import { BsFillGridFill } from "react-icons/bs";
import Link from "next/link";
import { Teacher } from "@prisma/client";
import { Table, Tooltip } from "antd";
import {
  itemRender,
  onShowSizeChange,
} from "@/app/students/studentlist/pagination";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import DangerModal from "@/app/components/Modals/dangerModal";

interface TeacherListWrapperProps {
  teachers: Teacher[];
}

const TeacherListWrapper: React.FC<TeacherListWrapperProps> = ({
  teachers,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const router = useRouter();

  const deleteTeacher = (teacher: string) => {
    axios
      .delete(`/api/teachers/deleteteacher/${teacher}`)
      .then(() => {
        toast.success("Teacher deleted successfully");
        router.refresh();
        router.push("/teachers");
      })
      .catch(() => toast.error("Something went wrong"));
  };
  const onSelectChange = (newSelectedRowKeys: any) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const [selectedId, setSelectedId] = useState("");

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const column = [
    {
      title: "Name",
      dataIndex: "name",
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
            >
              {record.name}
            </Link>
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
            <Tooltip placement="top" title={`Edit ${record.name}`}>
              <Link
                href={`/teachers/editteacher/${record.id}`}
                className="btn btn-sm bg-success-light me-2"
              >
                <i className="feather-eye">
                  <AiFillEdit />
                </i>
              </Link>
            </Tooltip>
            <Tooltip placement="top" title={`delete ${record.name}`}>
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
      {/* /Page Header */}
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
                    <h3 className="page-title">Teachers</h3>
                  </div>
                  <div className="col-auto text-end float-end ms-auto download-grp">
                    <Link
                      href="/teachers/teacherlist"
                      className="btn btn-outline-gray me-2 active"
                    >
                      <AiOutlineUnorderedList />
                    </Link>
                    <Link
                      href="/teachers"
                      className="btn btn-outline-gray me-2"
                    >
                      <BsFillGridFill />
                    </Link>

                    <Link
                      href="/teachers/addteacher"
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
                    total: teachers.length,
                    showTotal: (total, range) =>
                      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger: true,
                    onShowSizeChange: onShowSizeChange,
                    itemRender: itemRender,
                  }}
                  columns={column}
                  dataSource={teachers}
                  rowSelection={rowSelection}
                  rowKey={(record) => record.id}
                />
                <DangerModal
                  title="Delete Teacher"
                  info="Are sure you want to delete?"
                  btn_text="Delete"
                  onClick={() => deleteTeacher(selectedId)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherListWrapper;
