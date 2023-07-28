'use client'

import Inputs from '@/app/components/Inputs'
import Link from 'next/link'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const StudentAddWrapper = () => {

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { register, handleSubmit, formState: { errors }, } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            address: '',
            phone_number: '',
            email: '',

        }
    })

    const onSubmit: SubmitHandler<FieldValues> = data => {
        console.log(data)
        setIsLoading(true)
        axios.post('/api/students/studentsadd', data)
            .then(() => {
                toast.success('Successfully added student')
                router.refresh()
                router.push('/')
            })
            .catch((error) => toast.error(error.response.data))
            .finally(() => setIsLoading(false))
    }

    return (
        <div className="page-wrapper" >
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

                                        <Inputs id='name' register={register} errors={errors} label='Fullname' required={true} />
                                        <Inputs id='email' register={register} errors={errors} label='Email' required={true} />
                                        <Inputs id='phone_number' register={register} errors={errors} label='Phone Number' required={true} />
                                        <Inputs id='address' register={register} errors={errors} label='Home Address' required={true} />
                                        <div className="col-12">
                                            <div className="student-submit">
                                                <button type="submit" className="btn btn-primary">
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default StudentAddWrapper