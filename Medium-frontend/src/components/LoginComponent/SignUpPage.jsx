import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {registerUserService} from "../../services/AuthServices.jsx";
import {toast} from "react-toastify";

export default function SignUpPage() {
    // Frontend state for capturing input fields
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    // Local state for UI feedback and validation rules
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();

    // Updates form field state on user keystroke
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Proactively clear error message once user types
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    // Validates field limits matching your backend JPA Entity configurations
    const validateForm = () => {
        const newErrors = {};

        // Username length checks (Entity limit: length = 50)
        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        } else if (formData.username.length > 50) {
            newErrors.username = 'Username cannot exceed 50 characters';
        }

        // Email length & structural checks (Entity limit: nullable = false, length = 100)
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (formData.email.length > 100) {
            newErrors.email = 'Email cannot exceed 100 characters';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please provide a valid email format';
        }

        // Password length validation (Entity limit: length = 8)
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8 && formData.password.length < 200 ) {
            newErrors.password = 'Password must be exactly 8 characters long';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Process standard form action intercept
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(e.target.value);
        if (validateForm()) {
            console.log('Valid registration object ready for transmission:', formData);
            try {
                const response = await registerUserService(formData);
                console.log(response.data);
                toast.success("Registration Successful!");
                setIsSubmitted(true);
                navigate("/loginPage", { replace: true });
            } catch (error) {
                toast.error("User Already Exists ! Please Login"+error.response?.data);
            }
        } else {
            setIsSubmitted(false);
            toast.error("Invalid Credentials !");
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-gray-100 font-sans antialiased overflow-hidden">

            {/* Dynamic Background Image layer */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{
                    backgroundImage: `url('https://unsplash.com')`
                }}
            />

            {/* Glassmorphic Container Core (macOS Blur Effect) */}
            <div className="relative z-10 flex w-full max-w-[960px] h-[660px] mx-4 rounded-3xl border border-white/40 bg-white/60 shadow-2xl overflow-hidden backdrop-blur-2xl">

                {/* Left Side: Creative Image panel */}
                <div className="hidden md:block w-1/2 relative h-full">
                    <img
                        src="https://images.unsplash.com/photo-1624269305548-1527ef905ff6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXJ0aWNsZXN8ZW58MHx8MHx8fDA%3D"
                        alt="Abstract design layout"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
                </div>

                {/* Right Side: Registration User Form Area */}
                <div className="w-full md:w-1/2 flex flex-col justify-center px-8 sm:px-12 bg-white/40 backdrop-blur-md">

                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                            Join ArtiPod Platform
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Create your reader and author account today
                        </p>
                    </div>

                    {/* Success Notification Alert */}
                    {isSubmitted && (
                        <div className="mt-4 rounded-lg bg-green-50 p-3 text-xs font-medium text-green-700 border border-green-200 animate-fade-in">
                            Form filled successfully according to validation parameters!
                        </div>
                    )}

                    <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>

                        {/* Username Entry Input Box */}
                        <div>
                            <label className="text-xs font-semibold text-gray-700">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Choose a public display name"
                                className={`mt-1.5 w-full rounded-xl border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:bg-white ${
                                    errors.username
                                        ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                                        : 'border-gray-200 bg-white/70 focus:border-gray-400'
                                }`}
                            />
                            {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username}</p>}
                        </div>

                        {/* Email Entry Input Box */}
                        <div>
                            <label className="text-xs font-semibold text-gray-700">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@example.com"
                                className={`mt-1.5 w-full rounded-xl border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:bg-white ${
                                    errors.email
                                        ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                                        : 'border-gray-200 bg-white/70 focus:border-gray-400'
                                }`}
                            />
                            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                        </div>

                        {/* Password Entry Input Box */}
                        <div>
                            <label className="text-xs font-semibold text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Must be exactly 8 characters"
                                className={`mt-1.5 w-full rounded-xl border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:bg-white ${
                                    errors.password
                                        ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                                        : 'border-gray-200 bg-white/70 focus:border-gray-400'
                                }`}
                            />
                            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                        </div>

                        {/* Form Submission Action Target */}
                        <button
                            type="submit"
                            className="cursor-pointer mt-2 flex w-full items-center justify-center gap-1 rounded-xl bg-gray-900 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-gray-800 active:scale-[0.99]"
                        >
                            Create Account
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </form>

                    {/* Account Shift Alternate Link */}
                    <p className="mt-6 text-center md:text-left text-xs text-gray-500">
                        Already have an account?{' '}
                        <Link to={"/loginPage"} className="font-semibold text-gray-900 hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
