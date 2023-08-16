"use client";
import { Table, Tooltip } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import {
  itemRender,
  onShowSizeChange,
} from "../students/studentlist/pagination";
import { Department, Teacher } from "@prisma/client";
import DangerModal from "../components/Modals/dangerModal";
import AddStaffModal from "../components/Modals/AddStaffModal";
interface DepartmentListWrapperProps {
  departments: Department[];
  teachers:Teacher[]
}

const DepartmentListWrapper: React.FC<DepartmentListWrapperProps> = ({
  departments,
  teachers,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const router = useRouter();
  const onSelectChange = (newSelectedRowKeys: any) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const deleteDepartment = (department: string) => {
    axios
      .delete(`/api/department/deletedepartment/${department}`)
      .then(() => {
        toast.success("Teacher deleted successfully");
        router.refresh();
      })
      .catch(() => toast.error("Something went wrong"));
  };

  const column = [
    {
      title: "Name",
      dataIndex: "department_name",
      sorter: (a: any, b: any) => a.Name.length - b.Name.length,
    },
    {
      title: "HOD",
      dataIndex: "department_hod",
      sorter: (a: any, b: any) => a.HOD.length - b.HOD.length,
    },
    {
      title: "Started Year",
      dataIndex: "start_date",
      sorter: (a: any, b: any) => a.StartedYear.length - b.StartedYear.length,
    },

    {
      title: "Action",
      dataIndex: "Action",
      render: (text: string, record: any) => (
        <>
          <div className="actions">
            <Tooltip
              placement="top"
              title={`Add Staff to ${record.department_name}`}
            >
              <Link
                href="#"
                onClick={() => setSelectedDepartment(record)}
                data-bs-toggle="modal"
                data-bs-target="#con-close-modal"
                className="btn btn-sm bg-success-light me-2"
              >
                <i className="fas fa-plus" />
              </Link>
            </Tooltip>
            <Tooltip placement="top" title={`Edit ${record.department_name}`}>
              <Link
                href={`/department/editdepartment/${record.id}`}
                className="btn btn-sm bg-success-light me-2"
              >
                <i className="feather-eye">
                  <AiFillEdit />
                </i>
              </Link>
            </Tooltip>
            <Tooltip placement="top" title={`Delete ${record.department_name}`}>
              <Link
                href="#"
                onClick={() => setSelectedId(record.id)}
                data-bs-toggle="modal"
                data-bs-target="#danger-alert-modal"
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
                placeholder="Search by Year ..."
              />
            </div>
          </div>
          <div className="col-lg-2">
            <div className="search-student-btn">
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              {/* Page Header */}
              <div className="page-header">
                <div className="row align-items-center">
                  <div className="col">
                    <h3 className="page-title">Departments</h3>
                  </div>
                  <div className="col-auto text-end float-end ms-auto download-grp">
                    <Link
                      href="/department/adddepartment"
                      className="btn btn-primary"
                    >
                      <i className="fas fa-plus" />
                    </Link>
                  </div>
                </div>
              </div>
              {/* /Page Header */}
              <Table
                className="table table-stripped table-hover datatable"
                pagination={{
                  total: departments.length,
                  showTotal: (total, range) =>
                    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                  showSizeChanger: true,
                  onShowSizeChange: onShowSizeChange,
                  itemRender: itemRender,
                }}
                columns={column}
                dataSource={departments}
                rowSelection={rowSelection}
                rowKey={(record) => record.id}
              />
              <DangerModal
                title="Delete Department"
                info="Are sure you want to delete?"
                btn_text="Delete"
                onClick={() => deleteDepartment(selectedId)}
              />
              <AddStaffModal teacher={teachers!} department={selectedDepartment} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DepartmentListWrapper;
