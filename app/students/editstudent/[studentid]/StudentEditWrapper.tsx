'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Inputs from '@/app/components/Inputs'
import ReactDatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { Student } from '@prisma/client'

interface StudentEditWrapperProps {
    student: Student
}

const StudentEditWrapper: React.FC<StudentEditWrapperProps> = ({
    student,
}) => {

    const [isLoading, setIsLoading] = useState(false)
    const [startDate, setStartDate] = useState(student.date_of_birth || new Date());
    const router = useRouter()
    const { register, handleSubmit, formState: { errors }, } = useForm<FieldValues>({
        defaultValues: {
            first_name: student.first_name,
            last_name: student.last_name,
            blood_type: student.blood_type,
            address: student.address,
            phone_number: student.phone_number,
            date_of_birth: startDate,

        }
    })

    const onSubmit: SubmitHandler<FieldValues> = data => {
        console.log(data)
        setIsLoading(true)
        axios.post(`/api/students/editstudent/${student.id}`, data)
            .then(() => {
                toast.success('Successfully edited student')
                router.push('/')
            })
            .catch((error) => toast.error(error.response.data))
            .finally(() => setIsLoading(false))
    }
    return (
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

                                <Inputs id='first_name' register={register} errors={errors} label='First Name' required={true} />
                                        <Inputs id='last_name' register={register} errors={errors} label='Last Name' required={true} />
                                <div className="col-12 col-sm-4">
                                    <div className="form-group local-forms ">
                                        <label>
                                            Date Of Birth <span className="login-danger">*</span>
                                        </label>

                                        <ReactDatePicker className="form-control"
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date!)}

                                        />
                                    </div>
                                </div>
                                <Inputs id='phone_number' register={register} errors={errors} label='Phone Number' required={true} />
                                <Inputs id='blood_type' register={register} errors={errors} label='Blood Type' required={true} />
                                <Inputs id='address' register={register} errors={errors} label='Home Address' required={true} />
                                <div className="col-12">
                                    <div className="student-submit">
                                        <button type="submit" className="btn btn-primary">
                                            Edit Student Info
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentEditWrapper