import React from 'react'
import Link from 'next/link';

export default function PolicyPage() {
    return (
        <div className='min-h-screen flex justify-center items-center bg-gray-100 p-4'>

            <div className='w-full max-w-2xl p-8 bg-white rounded-2xl shadow-xl'>

                <h1 className='text-3xl font-semibold text-center mb-3'>
                    Company Policy
                </h1>

                <p className='text-sm text-gray-500 text-center mb-6'>
                    Please read our company policies carefully before using our services.
                </p>

                <div className='space-y-5 text-gray-700 text-sm'>

                    {/* Section 1 */}
                    <div>
                        <h2 className='font-semibold text-lg mb-1'>
                            1. Introduction
                        </h2>
                        <p>
                            This policy outlines the rules and guidelines for using our services.
                        </p>
                    </div>

                    {/* Section 2 */}
                    <div>
                        <h2 className='font-semibold text-lg mb-1'>
                            2. User Responsibilities
                        </h2>
                        <ul className='list-disc pl-5 space-y-1'>
                            <li>Provide accurate information</li>
                            <li>Do not misuse the platform</li>
                            <li>Respect other users</li>
                        </ul>
                    </div>

                    {/* Section 3 */}
                    <div>
                        <h2 className='font-semibold text-lg mb-1'>
                            3. Privacy Policy
                        </h2>
                        <p>
                            We ensure your personal data is secure and not shared without consent.
                        </p>
                    </div>

                    {/* Section 4 */}
                    <div>
                        <h2 className='font-semibold text-lg mb-1'>
                            4. Terms of Service
                        </h2>
                        <p>
                            By using our platform, you agree to follow all company rules and regulations.
                        </p>
                    </div>

                    {/* Section 5 */}
                    <div>
                        <h2 className='font-semibold text-lg mb-1'>
                            5. Termination
                        </h2>
                        <p>
                            Violation of policies may result in account suspension or termination.
                        </p>
                    </div>

                </div>

                {/* Button (Optional) */}
                <button className='mt-6 w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-200'>
                    I Agree
                </button>

                <Link href="/" className="mt-10 bg-slate-800 text-white  py-3 rounded-full hover:bg-slate-700 transition font-semibold flex items-center justify-center">
                    Back 
                </Link>

            </div>

        </div>
    )
}