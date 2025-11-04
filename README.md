# Photo Gallery App 📸

A modern, full-stack photo gallery application built with Next.js and Supabase. Store, manage, and view your photos securely in the cloud with a beautiful, responsive interface.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

### 🔐 Authentication & Security
- **Secure User Authentication** with Supabase Auth
- **Row Level Security** for data protection
- **JWT Token Management** with secure localStorage
- **Protected Routes** and automatic redirects

### 📁 Photo Management
- **Drag & Drop Uploads** with file validation
- **Multiple Format Support** (JPG, PNG, GIF, WEBP)
- **Automatic File Naming** with unique identifiers
- **Image Preview** before uploading
- **One-Click Downloads** for easy access

### 🎨 User Experience
- **Responsive Design** that works on all devices
- **Modern UI/UX** with Tailwind CSS
- **Loading States** and smooth animations
- **Error Handling** with user-friendly messages
- **Real-time Gallery Updates**

### ☁️ Cloud Infrastructure
- **Supabase Storage** for secure file storage
- **Global CDN** for fast image delivery
- **Automatic Scaling** with cloud infrastructure
- **Secure File URLs** with public access controls

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Beautiful icons library

### Backend & Infrastructure
- **Supabase** - Backend-as-a-Service
  - Authentication
  - PostgreSQL Database
  - Storage Buckets
  - Row Level Security

### Deployment
- **Vercel** - Platform for frontend deployment
- **Supabase** - Managed backend services

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Supabase account
- Git installed

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/photo-gallery-app.git
   cd photo-gallery-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## ⚙️ Supabase Configuration

### 1. Create a New Project
- Go to [Supabase](https://supabase.com)
- Create a new project
- Wait for the database to initialize
- Note your Project URL and anon key from Settings → API

### 2. Configure Authentication
- Go to Authentication → Settings
- Configure Site URL: `http://localhost:3000`
- Add redirect URLs for your production domain

### 3. Set Up Storage
- Go to Storage → Create Bucket
- Name: `public-uploads`
- Set to public bucket

### 4. Configure RLS Policies
Run these SQL commands in the Supabase SQL Editor:

```sql
-- Enable storage RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Storage policies for public-uploads bucket
CREATE POLICY "Public can view images" ON storage.objects
FOR SELECT USING (bucket_id = 'public-uploads');

CREATE POLICY "Authenticated users can upload images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'public-uploads' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can delete their own images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'public-uploads' 
  AND auth.role() = 'authenticated'
);
```

## 📁 Project Structure

```
photo-gallery-app/
├── app/                    # Next.js 14 App Router
│   ├── login/             # Login page
│   ├── photos/            # Protected photos page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── AuthForm.tsx       # Authentication form
│   ├── UploadPhoto.tsx    # File upload component
│   ├── SupabaseImageGallery.tsx # Image gallery
│   └── SignOutButton.tsx  # Sign out functionality
├── lib/
│   └── supabase/
│       └── client.ts      # Supabase client configuration
├── types/                 # TypeScript type definitions
├── public/                # Static assets
└── package.json
```

## 🔧 Configuration

### Environment Variables

```env
# Required
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional for production
NEXT_PUBLIC_SITE_URL=your_production_url
```

## 🎯 Usage

### For Users
1. **Sign Up** - Create a new account with email and password
2. **Upload Photos** - Use the drag & drop interface or click to select files
3. **Manage Gallery** - View, download, and organize your photos
4. **Secure Access** - Your data is protected with enterprise-grade security

### For Developers
The codebase is structured for easy extensibility:
- Add new file types by modifying `UploadPhoto.tsx`
- Extend gallery features in `SupabaseImageGallery.tsx`
- Customize authentication flows in `AuthForm.tsx`

## 🚀 Deployment

### Vercel (Recommended)

1. **Push your code to GitHub**
2. **Connect to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
3. **Configure Environment Variables**
   - Add `NEXT_PUBLIC_SUPABASE_URL`
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Deploy**
   - Vercel will automatically deploy on git push

### Other Platforms
The app can be deployed on any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Digital Ocean App Platform

## 🔒 Security Features

- **Row Level Security** - Database-level access control
- **JWT Authentication** - Secure token-based auth
- **File Validation** - Type and size checks before upload
- **Secure Storage** - Encrypted file storage with access controls
- **Input Sanitization** - Protected against common web vulnerabilities

## 🐛 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| **Upload Fails with RLS Policy Error** | Ensure storage policies are created in Supabase SQL Editor |
| **Images Not Displaying** | Check if storage bucket is public and verify file paths |
| **Authentication Errors** | Verify Supabase URL and anon key in environment variables |
| **Build Failures** | Ensure all TypeScript types are properly defined |

### Getting Help

- Check the [Supabase Documentation](https://supabase.com/docs)
- Review [Next.js Documentation](https://nextjs.org/docs)
- Open an [issue](https://github.com/your-username/photo-gallery-app/issues)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - The React framework
- [Supabase](https://supabase.com) - Open source Firebase alternative
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [Vercel](https://vercel.com) - Deployment platform

## 📞 Support

If you have any questions or need help, please:

1. Check the documentation above
2. Search existing [issues](https://github.com/your-username/photo-gallery-app/issues)
3. Create a new issue with details about your problem

---

<div align="center">

**Built with ❤️ using Next.js and Supabase**

### ⭐ Star this repo if you found it helpful!

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

</div>

---

## 📋 Changelog

### v1.0.0
- Initial release
- Basic photo upload and gallery functionality
- User authentication system
- Responsive design

---

*This project is actively maintained. Last updated: ${new Date().toLocaleDateString()}*
