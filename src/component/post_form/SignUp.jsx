import React, { useState } from 'react'
import authService from "../../appwrite/auth"
import Button from "./Button"
import Logo from "../Logo"
import InputBox from "./InputBox"
import { useForm } from "react-hook-form"
import { login } from "../../redux/reducer/authSlice"
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'



function SignUp() {
    const [error, setError] = useState("")
    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const createUser = async (data) => {
        setError("")
        try {
            const newUser = await authService.createAccount(data)
            if (newUser) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(login(userData))
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(createUser)}>
                    <div className='space-y-5'>
                        <InputBox
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        {errors.name && <p>Please enter the Name</p>}
                        <InputBox
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                            })}
                        />
                        {errors.email && <p>Please check the email</p>}
                        <InputBox
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                            })}
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default SignUp