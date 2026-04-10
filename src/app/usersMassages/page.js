"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Page() {

    const [data, setData] = useState([]);
    const [editData, setEditData] = useState(null);

    const fetchData = async () => {
        const res = await fetch("/api/contact");
        const result = await res.json();

        if (result.success) {
            setData(result.data);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // DELETE
    const handleDelete = async (id) => {
        const confirmDelete = confirm("Are you sure you want to delete?");
        if (!confirmDelete) return;

        const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
        const result = await res.json();

        if (result.success) {
            alert("Deleted");
            fetchData();
        } else {
            alert("Error " + (result.message || result.error));
        }
    };

    // EDIT CLICK
    const handleEdit = (item) => {
        setEditData(item);
    };

    // UPDATE API
    const handleUpdate = async () => {
        try {
            const res = await fetch(`/api/contact/${editData._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: editData.name,
                    email: editData.email,
                    message: editData.message
                }),
            });

            const result = await res.json();

            if (result.success) {
                alert("Updated successfully");
                setEditData(null);
                fetchData();
            } else {
                alert(result.message || "Error updating");
            }

        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6 flex justify-center">

            <div className='w-full max-w-xl p-8 bg-white rounded-2xl shadow-xl'>

                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-bold text-gray-800">
                        Messages Dashboard
                    </h1>
                    <p className="text-gray-500 mt-2">
                        All user queries and contact messages in one place
                    </p>
                </div>

                {/* ✅ EDIT FORM */}
                {editData && (
                    <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                        <h2 className="text-lg font-semibold mb-2">Edit Message</h2>

                        <input
                            type="text"
                            value={editData.name}
                            onChange={(e) =>
                                setEditData({ ...editData, name: e.target.value })
                            }
                            className="w-full mb-2 p-2 border rounded"
                            placeholder="Name"
                        />

                        <input
                            type="email"
                            value={editData.email}
                            onChange={(e) =>
                                setEditData({ ...editData, email: e.target.value })
                            }
                            className="w-full mb-2 p-2 border rounded"
                            placeholder="Email"
                        />

                        <textarea
                            value={editData.message}
                            onChange={(e) =>
                                setEditData({ ...editData, message: e.target.value })
                            }
                            className="w-full mb-2 p-2 border rounded"
                            placeholder="Message"
                        />

                        <div className="flex gap-2">
                            <button
                                onClick={handleUpdate}
                                className="bg-green-500 text-white px-4 py-1 rounded"
                            >
                                Update
                            </button>

                            <button
                                onClick={() => setEditData(null)}
                                className="bg-gray-500 text-white px-4 py-1 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Cards */}
                <div className="grid gap-6">

                    {data.length === 0 ? (
                        <p className="text-center text-gray-500">
                            No messages found
                        </p>
                    ) : (
                        data.map((item) => (
                            <div
                                key={item._id}
                                className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition border"
                            >

                                <div>
                                    <div className="flex justify-between mb-2">
                                        <h2 className="text-lg font-semibold">
                                            {item.name}
                                        </h2>
                                        <span className="text-xs text-gray-400">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <p className="text-sm text-blue-500 mb-2">
                                        {item.email}
                                    </p>

                                    <p className="text-gray-600 text-sm">
                                        {item.message}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="mt-4 flex justify-end gap-2">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="bg-yellow-500 text-white text-xs px-4 py-1 rounded-lg hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="bg-red-500 text-white text-xs px-4 py-1 rounded-lg hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>

                            </div>
                        ))
                    )}

                    {/* Back Button */}
                    <Link
                        href="/"
                        className="mt-6 bg-slate-800 text-white px-6 py-3 rounded-full text-center hover:bg-slate-700"
                    >
                        Back
                    </Link>

                </div>
            </div>
        </div>
    );
}