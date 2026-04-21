'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import keycloak from '../lib/keyclock';

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    if (!keycloak.authenticated) {
      window.location.href = '/login';
    } else {
      fetchTodos();
    }

  }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch('/api/todos');
      const json = await res.json();

      if (json.success && Array.isArray(json.data)) {
        setTodos(json.data.filter(Boolean));
      } else {
        setTodos([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ADD
  const addTodo = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        task: input.trim(),
        completed: false,
      }),
    });

    const json = await res.json();

    if (json.success && json.data) {
      setTodos((prev) => [json.data, ...prev]);
      setInput('');
    }
  };

  // DELETE
  const deleteTodo = async (id) => {
    const res = await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    });

    const json = await res.json();

    if (json.success) {
      setTodos((prev) => prev.filter((t) => t.id !== id));
    }
  };

  // TOGGLE
  const toggleTodo = async (id, completed) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }),
      });

      const json = await res.json(); // ❌ text parsing hata diya

      if (json?.success && json?.data) {
        setTodos((prev) =>
          prev.map((t) => (t.id === id ? json.data : t))
        );
      } else {
        console.error("Invalid response:", json);
      }

    } catch (error) {
      console.error("Toggle error:", error);
    }
  };
  // EDIT START
  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.task);
  };

  // SAVE EDIT
  const updateTodo = async (id) => {
    if (!editText.trim()) return;

    const res = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: editText.trim() }),
    });

    const json = await res.json();

    if (json.success && json.data) {
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? json.data : t))
      );

      setEditId(null);
      setEditText('');
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center py-12 px-4">
      <div className="absolute top-4 right-4 ">
        <button
          onClick={() => {
            keycloak.logout({ redirectUri: 'http://localhost:3000/login' });
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
      {/* CARD */}
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-2xl overflow-hidden mt-3">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white text-center">
          <h1 className="text-3xl font-bold tracking-tight">Todo Tasks</h1>
          <p className="text-sm text-blue-100 mt-2">
            Simple • Fast • Beautiful
          </p>
        </div>

        {/* BODY */}
        <div className="p-6">

          {/* ADD FORM */}
          <form onSubmit={addTodo} className="flex gap-3 mb-6">
            <input
              className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Add new task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition text-white px-6 py-3 rounded-xl font-semibold">
              Add
            </button>
          </form>

          {/* LIST */}
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : todos.length === 0 ? (
            <p className="text-center text-gray-400 italic">
              No tasks yet 🚀
            </p>
          ) : (
            <div className="space-y-3">

              {todos.map((todo) => {
                if (!todo) return null;

                return (
                  <div
                    key={todo.id}
                    className="flex items-center justify-between p-4 rounded-xl border hover:shadow-md transition bg-gray-50"
                  >

                    {/* LEFT */}
                    <div className="flex items-center gap-3 flex-1">

                      <input
                        type="checkbox"
                        checked={todo.completed ?? false}
                        onChange={() =>
                          toggleTodo(todo.id, todo.completed ?? false)
                        }
                        className="w-5 h-5 cursor-pointer"
                      />

                      {editId === todo.id ? (
                        <input
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="border px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-300"
                        />
                      ) : (
                        <span
                          className={`flex-1 ${todo.completed
                              ? 'line-through text-gray-400'
                              : 'text-gray-700 font-medium'
                            }`}
                        >
                          {todo.task}
                        </span>
                      )}

                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-2 ml-3">

                      {editId === todo.id ? (
                        <button
                          onClick={() => updateTodo(todo.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => startEdit(todo)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
                        >
                          Edit
                        </button>
                      )}

                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </div>
      </div>

      {/* FOOTER LINKS */}
      <div className="mt-8 flex gap-6 text-sm text-gray-500">
        <Link href="/abouts" className="hover:text-blue-600">About</Link>
        <Link href="/contact" className="hover:text-blue-600">Contact</Link>
      </div>

    </div>
  );
}