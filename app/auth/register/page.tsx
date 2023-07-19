'use client'

import Input from "@/app/components/register/Input"
import Image from "next/image"
import Link from "next/link"
import { useState, useCallback } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

type Variant = "LOGIN" | "REGISTER"


const Register = () => {
    const [variant, setVariant] = useState<Variant>('LOGIN')
    const [isLoading, setIsLoading] = useState(false)

    const { register, handleSubmit, formState: { errors }, } = useForm<FieldValues>({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirm_password: ''
        }
    })

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER')
        } else {
            setVariant('LOGIN')
        }
    }, [variant])


    const onSubmit: SubmitHandler<FieldValues> = data => {
        setIsLoading(true)
        console.log(data)
        setIsLoading(false)
    }

    return (
        <>
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
                                    <h1>{variant === "REGISTER" ? 'Sign in' : 'Welcome to Edubox'}</h1>

                                    <p className="account-subtitle">{variant === "REGISTER" ? 'Enter details to create your account' : 'Login to start schooling'}</p>

                                    {/* form */}
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        {variant === "REGISTER" && (
                                            <Input
                                                id='username'
                                                disabled={isLoading}
                                                register={register}
                                                errors={errors}
                                                required
                                                label="Username"
                                                icon_string="fa-user-circle" />
                                        )}

                                        <Input
                                            id='email'
                                            disabled={isLoading}
                                            register={register}
                                            errors={errors}
                                            required
                                            label="Email"
                                            type="email"
                                            icon_string="fa-envelope" />
                                        <Input
                                            id='password'
                                            disabled={isLoading}
                                            register={register}
                                            errors={errors}
                                            required
                                            label="Password"
                                            type="password"
                                            icon_string="fa-lock" />
                                        {variant === "REGISTER" && (
                                            <Input
                                                id='confirm_password'
                                                disabled={isLoading}
                                                register={register}
                                                errors={errors}
                                                required
                                                label="Confirm Password"
                                                type="password" icon_string="fa-lock" />
                                        )}

                                        {
                                            variant === 'REGISTER' ? (
                                                <div className=" dont-have">
                                                    Already Registered? <a onClick={toggleVariant} className="">Login</a>
                                                </div>
                                            )
                                                :
                                                (
                                                    <div className="forgotpass">
                                                        <div className="remember-me">
                                                            <label className="custom_check mr-2 mb-0 d-inline-flex remember-me">
                                                                {" "}
                                                                Remember me
                                                                <input type="checkbox" name="radio" />
                                                                <span className="checkmark" />
                                                            </label>
                                                        </div>
                                                        <Link href="/auth/forgotpassword">Forgot Password?</Link>
                                                    </div>
                                                )
                                        }

                                        <div className="form-group mb-0">
                                            <button className="btn btn-primary btn-block" type="submit">
                                                {variant === 'REGISTER' ? 'Register' : 'Login'}
                                            </button>
                                        </div>
                                    </form>
                                    {
                                        variant === 'LOGIN' &&
                                        (
                                            <div className=" dont-have">
                                                Need an account? <a onClick={toggleVariant} className="">Sign up</a>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register