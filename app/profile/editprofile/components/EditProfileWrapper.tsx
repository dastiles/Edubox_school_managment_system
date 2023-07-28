'use client'
import { Admin } from '@prisma/client'
import Link from 'next/link'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Inputs from '../../../components/Inputs'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface EditProfileWrapperProps {
    user: Admin
}

const EditProfileWrapper: React.FC<EditProfileWrapperProps> = ({
    user
}) => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { register, handleSubmit, formState: { errors }, } = useForm<FieldValues>({
        defaultValues: {
            username: user.username,
            location: user.location,
            phone: user.phone,
            about: user.about,


        }
    })

    const onSubmit: SubmitHandler<FieldValues> = data => {
        console.log(data)
        setIsLoading(true)
        axios.post('/api/profile/editprofile', data)
            .then(() => {
                toast.success('Profile successfully updated')
                router.refresh()
                router.push('/profile')
            })
            .catch((error) => toast.error(error.response.data))
            .finally(() => setIsLoading(false))
    }
    return (
        <div className="page-wrapper">
            <div className="content container-fluid">
                {/* Page Header */}
                <div className="page-header">
                    <div className="row align-items-center">
                        <div className="col-sm-12">
                            <div className="page-sub-header">
                                <h3 className="page-title">Edit My Profile</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link href="/profile">My Profile</Link>
                                    </li>
                                    <li className="breadcrumb-item active">Edit My Profile</li>
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
                                                Profile Information{" "}

                                            </h5>
                                        </div>

                                        <Inputs id='username' label='Full Name' errors={errors} register={register} />
                                        <Inputs id='phone' label='Phone Number' errors={errors} register={register} />
                                        <Inputs id='location' label='Address' errors={errors} register={register} />

                                        <div className="col-12">
                                            <div className="form-group local-forms">
                                                <label>
                                                    Bio
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    placeholder="Enter Bio"
                                                    {...register('about', { required: false })}
                                                    id='about'
                                                ></textarea>
                                            </div>
                                        </div>

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
        </div>
    )
}

export default EditProfileWrapper