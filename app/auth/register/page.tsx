"use client";

import Input from "@/app/components/register/Input";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

const Register = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
    }
  }, [session?.status, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials");
        }

        if (callback?.ok && !callback?.error) {
          toast.success("Successfully Logged in");
          router.push("/");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="loginbox">
              <div className="login-left">
                <Image
                  fill={true}
                  alt="logo"
                  src="/img/login.png"
                  className="img-fluid"
                />
              </div>
              <div className="login-right">
                <div className="login-right-wrap">
                  <h1>Welcome to Edubox</h1>

                  <p className="account-subtitle">Login to start schooling</p>

                  {/* form */}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                      id="email"
                      disabled={isLoading}
                      register={register}
                      errors={errors}
                      required
                      label="Email"
                      type="email"
                      icon_string="fa-envelope"
                    />
                    <Input
                      id="password"
                      disabled={isLoading}
                      register={register}
                      errors={errors}
                      required
                      label="Password"
                      type="password"
                      icon_string="fa-lock"
                    />

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

                    <div className="form-group mb-0">
                      <button
                        className="btn btn-primary btn-block"
                        type="submit"
                      >
                        {variant === "REGISTER" ? "Register" : "Login"}
                      </button>
                    </div>
                  </form>

                  <div className="dont-have">
                    Need an account?{" "}
                    <Link href="/auth/schoolregister" className="">
                      Sign up
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
