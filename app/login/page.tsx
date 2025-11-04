import Authform from "../components/Authform";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50/30 px-4 sm:px-6 transition-colors duration-500">
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl"></div>
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="relative bg-white rounded-2xl shadow-lg p-8 sm:p-10 border border-blue-100 backdrop-blur-sm">
          
          {/* Header Section */}
          <div className="text-center space-y-6 mb-8">
            {/* Logo/Brand */}
            <div className="flex justify-center">
              <div className="p-4 bg-blue-600 rounded-2xl shadow-lg text-white">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome Back
              </h1>
              <p className="text-gray-600 text-base">
                Sign in to your Photo Gallery account
              </p>
            </div>

            {/* Tech Stack Badges */}
            <div className="flex justify-center items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium border border-blue-200">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Next.js
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium border border-blue-200">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Supabase
              </span>
            </div>
          </div>

          {/* Auth Form */}
          <div className="space-y-6">
            <Authform />
          </div>

          {/* Features List */}
          <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-blue-800">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Secure Storage
              </div>
              <div className="flex items-center gap-2 text-blue-800">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Fast Uploads
              </div>
              <div className="flex items-center gap-2 text-blue-800">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Cloud Backup
              </div>
              <div className="flex items-center gap-2 text-blue-800">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                High Quality
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                © {new Date().getFullYear()}{" "}
                <span className="font-semibold text-gray-800">
                  Photo Gallery
                </span>
                . All rights reserved.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Store and manage your photos securely
              </p>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}