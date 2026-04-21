'use client';

import keycloak from '@/lib/keyclock';

export default function LoginPage() {
  const handleLogin = () => {
    keycloak.login();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600">

      {/* Card */}
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-md text-center text-white">

        {/* Logo / Title */}
        <h1 className="text-3xl font-bold mb-2 tracking-tight">
          Welcome Back 👋
        </h1>
        <p className="text-sm text-white/70 mb-8">
          Sign in to manage your tasks
        </p>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-white text-indigo-600 font-semibold py-3 rounded-xl hover:bg-gray-100 active:scale-95 transition duration-200 shadow-lg"
        >
          Sign in with Keycloak
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="text-xs text-white/50">secure login</span>
          <div className="flex-1 h-px bg-white/20"></div>
        </div>

        {/* Footer */}
        <p className="text-xs text-white/50">
          Powered by Keycloak Authentication
        </p>
      </div>

    </div>
  );
}