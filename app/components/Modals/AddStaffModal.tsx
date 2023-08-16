"use client";
import { Teacher } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "react-hot-toast";
import Select from "react-select";

interface AddStaffModalProps {
  department: any;
  teacher: Teacher[];
}
const AddStaffModal: React.FC<AddStaffModalProps> = ({
  department,
  teacher,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const options = teacher.map((teacher) => {
    return { value: teacher, label: teacher.name };
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      staff: "",
      start_date: startDate,
      departmentId: department.id,
    },
  });

  console.log(department);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    setIsLoading(true);
    axios
      .post("/api/department/addstaff", {
        ...data,
        departmentId: department.id,
      })
      .then(() => {
        toast.success("Staff Successfully Added ");
        router.refresh();
      })
      .catch((error) => toast.error(error.response.data))
      .finally(() => setIsLoading(false));
  };
  return (
    <div
      id="con-close-modal"
      className="modal fade"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      style={{ display: "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">
              Add Staff to {department.department_name} Department
            </h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-body p-4">
              <div className="row">
                <div className="col-12">
                  <div className="mb-3 ">
                    <label>
                      Add Staff Members <span className="login-danger">*</span>
                    </label>
                    <Controller
                      control={control}
                      name="staff"
                      render={({ field }) => (
                        <Select
                          isDisabled={isLoading}
                          isMulti
                          options={options}
                          onChange={(staff) => field.onChange(staff)}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3  ">
                    <label className="col-12">
                      Staff Start Date <span className="login-danger">*</span>
                    </label>
                    <Controller
                      control={control}
                      name="start_date"
                      render={({ field }) => (
                        <ReactDatePicker
                          disabled={isLoading}
                          className="form-control"
                          selected={field.value}
                          onChange={(date) => field.onChange(date!)}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary waves-effect"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                {!isLoading ? (
                  <button
                    type="submit"
                    className="btn btn-primary waves-effect waves-light"
                  >
                    Add Staff
                  </button>
                ) : (
                  <button
                    className="btn btn-primary mb-1 me-1"
                    type="button"
                    disabled={true}
                  >
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Loading...
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStaffModal;
