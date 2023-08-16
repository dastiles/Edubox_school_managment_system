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

type Variant = "SCHOOL" | "ADMIN";

const Register = () => {
  const [variant, setVariant] = useState<Variant>("SCHOOL");
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
      // school values
      school_name: "",
      school_email: "",
      school_phone: "",
      school_address: "",

      // admin value
      name: "",
      email: "",
      password: "",
      phone: "",
      confirm_password: "",
    },
  });

  const toggleVariant = useCallback(() => {
    if (variant === "SCHOOL") {
      setVariant("ADMIN");
    } else {
      setVariant("SCHOOL");
    }
  }, [variant]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data);
    axios
      .post("/api/register", data)
      .then(() =>
        signIn("credentials", data).then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }

          if (callback?.ok && !callback?.error) {
            toast.success("Successfully Logged in");
            router.push("/");
          }
        })
      )

      .catch((error) => toast.error(error.response.data))
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
                  {variant === "SCHOOL" ? (
                    <p className="account-subtitle">
                      Register your School to start schooling
                    </p>
                  ) : (
                    <p className="account-subtitle">
                      Register your Adminstrator to access your school
                    </p>
                  )}
                  {/* form */}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {variant === "SCHOOL" ? (
                      <>
                        <Input
                          id="school_name"
                          disabled={isLoading}
                          register={register}
                          errors={errors}
                          required
                          label="School Name"
                          icon_string="fas fa-chalkboard-teacher"
                        />

                        <Input
                          id="school_email"
                          disabled={isLoading}
                          register={register}
                          errors={errors}
                          required
                          label="School Email"
                          type="email"
                          icon_string="fa-envelope"
                        />
                        <Input
                          id="school_phone"
                          disabled={isLoading}
                          register={register}
                          errors={errors}
                          required
                          label="Phone"
                          type=""
                          icon_string="fa-envelope"
                        />
                        <Input
                          id="school_address"
                          disabled={isLoading}
                          register={register}
                          errors={errors}
                          required={false}
                          label="School Address"
                          icon_string="fas fa-school"
                        />
                      </>
                    ) : (
                      <>
                        <Input
                          id="name"
                          disabled={isLoading}
                          register={register}
                          errors={errors}
                          required
                          label="School Admin Name"
                          icon_string="fa-user-circle"
                        />

                        <Input
                          id="email"
                          disabled={isLoading}
                          register={register}
                          errors={errors}
                          required
                          label="Admin Email"
                          type="email"
                          icon_string="fa-envelope"
                        />
                        <Input
                          id="phone"
                          disabled={isLoading}
                          register={register}
                          errors={errors}
                          required
                          label="Admin Phone Number"
                          type="number"
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

                        <Input
                          id="confirm_password"
                          disabled={isLoading}
                          register={register}
                          errors={errors}
                          required
                          label="Confirm Password"
                          type="password"
                          icon_string="fa-lock"
                        />
                      </>
                    )}
                    <div className="form-group mb-0">
                      {variant === "SCHOOL" ? (
                        <button
                          className="btn btn-primary btn-block"
                          onClick={toggleVariant}
                        >
                          Next
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          Register
                        </button>
                      )}
                    </div>
                  </form>

                  <div className=" dont-have">
                    Already have an account?{" "}
                    <Link href="/auth/register" className="">
                      log In
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
