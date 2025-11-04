import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100/50 px-4 sm:px-6 relative overflow-hidden py-8">
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-blue-100/40 rounded-full blur-2xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative text-center max-w-4xl space-y-8 z-10 my-auto">
        
        {/* Logo/Brand */}
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-blue-600 rounded-2xl shadow-lg">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* Hero Text */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Photo Gallery
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Store, organize, and share your favorite memories with our secure cloud platform. 
            Built for photographers and memory-keepers alike.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto py-6 px-4">
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Secure Storage</h3>
            <p className="text-sm text-gray-600">Your photos are encrypted and safe</p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5.002 5.002 0 0115.9 6h.1a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Easy Upload</h3>
            <p className="text-sm text-gray-600">Drag & drop or click to upload</p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Fast Search</h3>
            <p className="text-sm text-gray-600">Quickly find your favorite photos</p>
          </div>
        </div>

        {/* CTA Buttons - Made more prominent */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6 pb-8 px-4">
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[60px] min-w-[200px]"
          >
            Get Started Free
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

          <Link
            href="/login"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white border-2 border-blue-600 rounded-xl hover:bg-blue-50 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[60px] min-w-[200px]"
          >
            Sign In
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="pt-4 pb-12 px-4">
          <p className="text-sm text-gray-500 mb-4">Trusted by photographers worldwide</p>
          <div className="flex justify-center items-center gap-6 opacity-60 flex-wrap">
            <div className="text-xs font-semibold text-gray-700 bg-white px-3 py-1 rounded-lg border">SUPABASE</div>
            <div className="text-xs font-semibold text-gray-700 bg-white px-3 py-1 rounded-lg border">NEXT.JS</div>
            <div className="text-xs font-semibold text-gray-700 bg-white px-3 py-1 rounded-lg border">CLOUD STORAGE</div>
          </div>
        </div>
      </div>

      {/* Footer - Fixed positioning */}
      <footer className="w-full text-center py-6 mt-auto z-10">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Photo Gallery App. All rights reserved.
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Built with ❤️ for photo enthusiasts
        </p>
      </footer>
    </main>
  );
}