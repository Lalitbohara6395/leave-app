"use client";
import keycloak from "@/lib/keycloak";

export default function LoginPage() {
  const handleLogin = () => {
    keycloak.login();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600">

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-md text-center text-white">

        <h1 className="text-3xl font-bold mb-2">
          Welcome Back 👋
        </h1>

        <p className="text-sm text-white/70 mb-8">
          Sign in to continue to HR Dashboard
        </p>

        <button
          onClick={handleLogin}
          className="w-full bg-white text-indigo-600 font-semibold py-3 rounded-xl hover:bg-gray-100 active:scale-95 transition"
        >
          Sign in
        </button>

        <p className="text-xs text-white/50 mt-6">
          Secure authentication powered by Keycloak
        </p>

      </div>

    </div>
  );
}