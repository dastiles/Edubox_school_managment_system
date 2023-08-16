"use client";

import Inputs from "@/app/components/Inputs";
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
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import Select from "react-select";

const EventAddWrapper = () => {
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
      start_date: startDate,
      end_date: startDate,
      event_type: "",
    },
  });
  const options = [
    { value: "bg-purple", label: "Purple" },
    { value: "bg-primary", label: "Blue" },
    { value: "bg-success", label: "Success" },
  ];

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    setIsLoading(true);
    axios
      .post("/api/event/addevent", data)
      .then(() => {
        toast.success("Event Successfully Added ");
        router.refresh();
        router.push("/event");
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
                  label="Event Name"
                  required={isLoading}
                />

                <div className="col-12 col-sm-4">
                  <div className="form-group local-forms ">
                    <label>
                      Event Type <span className="login-danger">*</span>
                    </label>
                    <Controller
                      control={control}
                      name="event_type"
                      render={({ field }) => (
                        <Select
                          isDisabled={isLoading}
                          options={options}
                          onChange={(type) => field.onChange(type?.value!)}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-4">
                  <div className="form-group local-forms ">
                    <label>
                      Start Event <span className="login-danger">*</span>
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
                <div className="col-12 col-sm-4">
                  <div className="form-group local-forms ">
                    <label>
                      End Event <span className="login-danger">*</span>
                    </label>
                    <Controller
                      control={control}
                      name="end_date"
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

                <div className="col-12">
                  <div className="student-submit">
                    {!isLoading ? (
                      <button type="submit" className="btn btn-primary">
                        Add Event
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
  );
};

export default EventAddWrapper;
