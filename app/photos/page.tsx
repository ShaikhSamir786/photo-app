import UploadPhoto from "../components/UploadPhoto";
import SignOutButton from "../components/SignOutButton";
import SupabaseImageGallery from "../components/SupabaseImageGallery";

export default function PhotosPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <header className="w-full max-w-7xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-12">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-3 rounded-2xl shadow-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              Photo Gallery
            </h1>
            <p className="text-gray-600 text-sm sm:text-base mt-1">
              Store and manage your photos in the cloud
            </p>
          </div>
        </div>
        <SignOutButton />
      </header>

      {/* Main Content Grid */}
      <div className="w-full max-w-7xl grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Column - Upload Section */}
        <div className="xl:col-span-1">
          <section className="bg-white rounded-2xl shadow-lg border border-gray-200/60 hover:shadow-xl transition-all duration-300 sticky top-6">
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Upload Photos
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Add new images to your collection
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <h4 className="font-medium text-blue-900 text-sm mb-2">Supported Formats</h4>
                  <div className="flex gap-2 text-xs">
                    <span className="bg-white px-2 py-1 rounded-md text-blue-700 border border-blue-200">JPG</span>
                    <span className="bg-white px-2 py-1 rounded-md text-blue-700 border border-blue-200">PNG</span>
                    <span className="bg-white px-2 py-1 rounded-md text-blue-700 border border-blue-200">GIF</span>
                    <span className="bg-white px-2 py-1 rounded-md text-blue-700 border border-blue-200">WEBP</span>
                  </div>
                </div>
                
                <UploadPhoto />
              </div>
            </div>
          </section>
        </div>

        {/* Right Column - Gallery Section */}
        <div className="xl:col-span-2">
          <section className="bg-white rounded-2xl shadow-lg border border-gray-200/60 overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Your Gallery
                    </h3>
                    <p className="text-gray-500 text-sm">
                      All your uploaded photos in one place
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <div className="bg-gray-100 px-3 py-1 rounded-full">
                    <span className="text-gray-700 font-medium">Cloud Storage</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 sm:p-6">
              <SupabaseImageGallery />
            </div>
          </section>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="w-full max-w-7xl mt-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/60">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">∞</div>
              <div className="text-gray-600 text-sm">Storage Space</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <div className="text-gray-600 text-sm">Uptime</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">Secure</div>
              <div className="text-gray-600 text-sm">Encrypted</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">Fast</div>
              <div className="text-gray-600 text-sm">Global CDN</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-7xl mt-12 pt-8 border-t border-gray-200/60">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-gray-600 text-sm">
            © {new Date().getFullYear()} <span className="font-semibold text-gray-800">Photo Gallery App</span> • Built with Supabase
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Secure Cloud Storage
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}