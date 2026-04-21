"use client";

import { useState } from "react";
import Link from "next/link";

export default function Page() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!form.name || !form.email || !form.message) {
            alert("Please fill all fields");
            return;
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(form.email)) {
            alert("Invalid email");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (data.success) {
                alert("Message Saved ✅");
                setForm({ name: "", email: "", message: "" });
            } else {
                alert("Error ❌");
            }
        } catch (error) {
            console.log(error);
            alert("Network Error ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex justify-center items-center bg-gray-100'>
            <div className='w-full max-w-md p-8 bg-white rounded-2xl shadow-xl'>

                <h1 className='text-3xl font-semibold text-center mb-3'>
                    Contact Us
                </h1>

                <p className='text-sm text-gray-500 text-center mb-6'>
                    Have questions or need help? Fill out the form below and our team will get back to you shortly.
                </p>

                <form className='space-y-4' onSubmit={handleOnSubmit}>

                    <div>
                        <label className='block text-sm font-medium mb-1 text-gray-700'>
                            Name
                        </label>
                        <input
                            type="text"
                            name='name'
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className='w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium mb-1 text-gray-700'>
                            Email
                        </label>
                        <input
                            type="email"
                            name='email'
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className='w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium mb-1 text-gray-700'>
                            Message
                        </label>
                        <textarea
                            rows="4"
                            name='message'
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Write your message..."
                            className='w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className='w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50'
                    >
                        {loading ? "Sending..." : "Submit"}
                    </button>

                </form>

                <Link
                    href="/"
                    className="mt-10 bg-slate-800 text-white px-6 py-3 rounded-full hover:bg-slate-700 transition font-semibold flex items-center justify-center"
                >
                    Back
                </Link>
            </div>
        </div>
    );
}