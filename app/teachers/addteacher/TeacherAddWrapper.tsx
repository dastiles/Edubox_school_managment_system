'use client'

import Inputs from '@/app/components/Inputs'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from 'react-datepicker'

const TeacherAddWrapper = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [startDate, setStartDate] = useState(new Date());
    const router = useRouter()
    const { register, handleSubmit, formState: { errors }, } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            address: '',
            phone_number: '',
            email: '',
            date_of_birth: startDate,
            subject_taught: ''


        }
    })

    const onSubmit: SubmitHandler<FieldValues> = data => {
        console.log(data)
        setIsLoading(true)
        axios.post('/api/teachers/addteachers', data)
            .then(() => {
                toast.success('Teacher Successfully Added ')
                router.refresh()
                router.push('/teachers')
            })
            .catch((error) => toast.error(error.response.data))
            .finally(() => setIsLoading(false))
    }
    return (

        <div className="row">
            <div className="col-sm-12">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">

                                <Inputs id='name' register={register} errors={errors} label='Fullname' required={true} />
                                <Inputs id='email' register={register} errors={errors} label='Email' required={true} />
                                <Inputs id='phone_number' register={register} errors={errors} label='Phone Number' required={true} />
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
                                <Inputs id='subject_taught' register={register} errors={errors} label='Department' required={true} />
                                <Inputs id='address' register={register} errors={errors} label='Home Address' required={true} />

                                <div className="col-12">
                                    <div className="form-group local-forms">
                                        <label>
                                            Bio
                                        </label>
                                        <textarea
                                            className="form-control"
                                            placeholder="Enter Bio"
                                        ></textarea>
                                    </div>
                                </div>


                                <div className="col-12">
                                    <div className="student-submit">
                                        <button type="submit" className="btn btn-primary">
                                            Add Teacher
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

export default TeacherAddWrapper