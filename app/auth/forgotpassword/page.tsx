'use client'

import Input from '@/app/components/register/Input'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

const ForgotPassword = () => {
    const router = useRouter()

    const { register, handleSubmit, formState: { errors }, } = useForm<FieldValues>({
        defaultValues: {
            email: '',
        }
    })
    return (
        <>
            {/* Main Wrapper */}
            <div className="main-wrapper login-body">
                <div className="login-wrapper">
                    <div className="container">
                        <div className="loginbox">
                            <div className="login-left">
                                <Image
                                    fill={true}
                                    alt='logo'
                                    src='/img/login.png'
                                    className="img-fluid"
                                />
                            </div>
                            <div className="login-right">
                                <div className="login-right-wrap">
                                    <h1>Reset Password</h1>
                                    <p className="account-subtitle">Let Us Help You</p>
                                    {/* Form */}
                                    <form>

                                        <Input label="Enter your registered email address"
                                            id='email'
                                            type="email"
                                            icon_string="fa-envelope"
                                            errors={errors}
                                            register={register}
                                        />
                                        <div className="form-group">
                                            <button className="btn btn-primary btn-block" type="submit">
                                                Reset My Password
                                            </button>
                                        </div>
                                        <div className="form-group mb-0">
                                            <button
                                                className="btn btn-primary primary-reset btn-block"
                                                type="submit"
                                                onClick={() => router.push('/auth/register')}
                                            >
                                                Login
                                            </button>
                                        </div>
                                    </form>
                                    {/* /Form */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default ForgotPassword
