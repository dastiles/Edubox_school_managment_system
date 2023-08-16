"use client";

import Inputs from "@/app/components/Inputs";
import Link from "next/link";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  Controller,
} from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";

const StudentAddWrapper = () => {
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
      first_name: "",
      last_name: "",
      address: "",
      phone_number: "",
      email: "",
      date_of_birth: startDate,
      blood_type: "",
      // parents details
      parent_first_name: "",
      parent_last_name: "",
      parent_email: "",
      parent_address: "",
      parent_phone_number: "",
      parent_date_of_birth: startDate,
      parent_occupation: "",
      parent_employer: "",
      parent_company_phone: "",
    },
  });

  const gender_options = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];
  const blood_options = [
    { value: "B+", label: "B+" },
    { value: "A+", label: "A+" },
    { value: "O+", label: "O+" },
  ];

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    setIsLoading(true);
    axios
      .post("/api/students/studentsadd", data)
      .then(() => {
        toast.success("Successfully added student");
        router.refresh();
        router.push("/students/studentlist");
      })
      .catch((error) => toast.error(error.response.data))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col-sm-12">
              <div className="page-sub-header">
                <h3 className="page-title">Add Students</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/students">Student</Link>
                  </li>
                  <li className="breadcrumb-item active">Add Students</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-sm-12">
            <div className="card comman-shadow">
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-12">
                      <h5 className="form-title student-info">
                        Student Information{" "}
                      </h5>
                    </div>

                    <Inputs
                      id="first_name"
                      register={register}
                      errors={errors}
                      label="First Name"
                      required={isLoading}
                    />
                    <Inputs
                      id="last_name"
                      register={register}
                      errors={errors}
                      label="Last Name"
                      required={isLoading}
                    />
                    <Inputs
                      id="email"
                      register={register}
                      errors={errors}
                      label="Email"
                      required={isLoading}
                    />
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms ">
                        <label>
                          Date Of Birth <span className="login-danger">*</span>
                        </label>
                        <Controller
                          control={control}
                          name="date_of_birth"
                          render={({ field }) => (
                            <DatePicker
                              disabled={isLoading}
                              className="form-control"
                              selected={field.value}
                              onChange={(date) => field.onChange(date!)}
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms ">
                        <label>
                          Gender <span className="login-danger">*</span>
                        </label>
                        <Controller
                          control={control}
                          name="gender"
                          render={({ field }) => (
                            <Select
                              isDisabled={isLoading}
                              options={gender_options}
                              onChange={(gender) =>
                                field.onChange(gender?.value!)
                              }
                            />
                          )}
                        />
                      </div>
                    </div>
                    <Inputs
                      id="phone_number"
                      register={register}
                      errors={errors}
                      label="Phone Number"
                      required={isLoading}
                    />
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms ">
                        <label>
                          Gender <span className="login-danger">*</span>
                        </label>
                        <Controller
                          control={control}
                          name="blood_type"
                          render={({ field }) => (
                            <Select
                              isDisabled={isLoading}
                              options={blood_options}
                              onChange={(blood) =>
                                field.onChange(blood?.value!)
                              }
                            />
                          )}
                        />
                      </div>
                    </div>
                    <Inputs
                      id="address"
                      register={register}
                      errors={errors}
                      label="Home Address"
                      required={isLoading}
                    />

                    <div className="col-12">
                      <h5 className="form-title">
                        <span>Parent Details</span>
                      </h5>
                    </div>
                    <Inputs
                      id="parent_first_name"
                      register={register}
                      errors={errors}
                      label="First Name"
                      required={isLoading}
                    />
                    <Inputs
                      id="parent_last_name"
                      register={register}
                      errors={errors}
                      label="Last Name"
                      required={isLoading}
                    />
                    <Inputs
                      id="parent_email"
                      register={register}
                      errors={errors}
                      label="Email"
                      required={isLoading}
                    />
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms ">
                        <label>
                          Date Of Birth <span className="login-danger">*</span>
                        </label>
                        <Controller
                          control={control}
                          name="parent_date_of_birth"
                          render={({ field }) => (
                            <DatePicker
                              disabled={isLoading}
                              className="form-control"
                              selected={field.value}
                              onChange={(date) => field.onChange(date!)}
                            />
                          )}
                        />
                      </div>
                    </div>
                    <Inputs
                      id="parent_phone_number"
                      register={register}
                      errors={errors}
                      label="Phone Number"
                      required={isLoading}
                    />
                    <Inputs
                      id="parent_address"
                      register={register}
                      errors={errors}
                      label="Home Address"
                      required={isLoading}
                    />
                    <Inputs
                      id="parent_occupation"
                      register={register}
                      errors={errors}
                      label="Occupation"
                      required={isLoading}
                    />
                    <Inputs
                      id="parent_company_phone"
                      register={register}
                      errors={errors}
                      label="Company Phone"
                      required={isLoading}
                    />
                    <Inputs
                      id="parent_employer"
                      register={register}
                      errors={errors}
                      label="Employer"
                      required={isLoading}
                    />
                    <div className="col-12">
                      <div className="student-submit">
                        {!isLoading ? (
                          <button type="submit" className="btn btn-primary">
                            Add Student
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary"
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
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAddWrapper;
