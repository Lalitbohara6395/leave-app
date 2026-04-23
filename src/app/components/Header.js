"use client";

import { useState, useRef, useEffect } from "react";
import { PanelLeftCloseIcon, Moon, Bell } from "lucide-react";
import keycloak from "@/lib/keycloak";

export default function Header() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Click outside + auth check (separated properly)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auth check (safe async init)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!keycloak?.authenticated) {
          await keycloak.init({ onLoad: "check-sso" });
        }

        if (!keycloak.authenticated) {
          window.location.href = "/login";
        }
      } catch (err) {
        console.error("Keycloak init failed:", err);
        window.location.href = "/login";
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="flex justify-between bg-gray-50 border border-gray-200 px-5 h-16 items-center">

      {/* LEFT */}
      <div>
        <h2 className="text-lg text-gray-900">Leave Details</h2>
        <p className="text-xs text-gray-400 hidden sm:block">
          Dashboard
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">

        {/* ICONS */}
        <div className="flex items-center gap-3">

          <Icon>
            <PanelLeftCloseIcon size={16} />
          </Icon>

          <Icon>
            <Moon size={16} />
          </Icon>

          <div className="relative">
            <Icon>
              <Bell size={16} />
            </Icon>

            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1 rounded-full">
              43
            </span>
          </div>

        </div>

        {/* USER */}
        <div className="relative" ref={dropdownRef}>

          <div
            onClick={() => setOpen(!open)}
            className="flex items-center cursor-pointer"
          >
            <div className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
              TB
            </div>

            <div className="pl-1 hidden sm:block">
              <h3 className="text-sm">Dinesh</h3>
              <p className="text-xs text-gray-400">User</p>
            </div>
          </div>

          {/* DROPDOWN */}
          {open && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 shadow-md rounded-md z-50">
              <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100">
                Profile
              </button>

              <button
                onClick={() => {
                  keycloak.logout({
                    redirectUri: `${window.location.origin}/login`,
                  });
                }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 text-red-500"
              >
                Logout
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

const Icon = ({ children }) => (
  <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
    {children}
  </div>
);