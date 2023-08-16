"use client";

import Inputs from "@/app/components/Inputs";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import { Teacher } from "@prisma/client";
import Select from "react-select";

interface DepartmentAddWrapperProps {
  teachers: Teacher[];
}
const DepartmentAddWrapper: React.FC<DepartmentAddWrapperProps> = ({
  teachers,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      department_head: "",
      start_date: startDate,
    },
  });

  const options = teachers.map((teacher) => {
    return { value: teacher.id, label: teacher.name };
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    setIsLoading(true);
    axios
      .post("/api/department/adddepartment", data)
      .then(() => {
        toast.success("Department Successfully Added ");
        router.refresh();
        router.push("/department");
      })
      .catch((error) => toast.error(error.response.data))
      .finally(() => setIsLoading(false));
  };
  return (
    <div className="row">
      <div className="col-sm-12">
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <Inputs
                  id="name"
                  register={register}
                  errors={errors}
                  label="Department Name"
                  required={true}
                />

                <div className="col-12 col-sm-4">
                  <div className="form-group local-forms ">
                    <label>
                      HOD <span className="login-danger">*</span>
                    </label>
                    <Controller
                      control={control}
                      name="department_head"
                      render={({ field }) => (
                        <Select
                          options={options}
                          onChange={(gender) => field.onChange(gender?.value!)}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-4">
                  <div className="form-group local-forms ">
                    <label>
                      Department Start Date{" "}
                      <span className="login-danger">*</span>
                    </label>
                    <Controller
                      control={control}
                      name="start_date"
                      render={({ field }) => (
                        <ReactDatePicker
                          className="form-control"
                          selected={field.value}
                          onChange={(date) => field.onChange(date!)}
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="col-12">
                  <div className="student-submit">
                    <button type="submit" className="btn btn-primary">
                      Add Department
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentAddWrapper;
