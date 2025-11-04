'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../libs/supabse/client';
import { BsGrid3X3Gap, BsArrowClockwise, BsEye, BsDownload, BsImage } from 'react-icons/bs';

interface SupabaseFile {
    name: string;
    id: string;
    created_at: string;
}

interface GalleryImage {
    name: string;
    url: string;
    created_at: string;
}

const PUBLIC_BUCKET_NAME = 'public-uploads';

export default function SupabaseImageGallery() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchImages = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const { data, error: listError } = await supabase.storage
                .from(PUBLIC_BUCKET_NAME)
                .list('', {
                    limit: 100,
                    offset: 0,
                });

            if (listError) throw listError;

            if (!data || data.length === 0) {
                setIsLoading(false);
                return;
            }

            const fileList: SupabaseFile[] = data.filter((item): item is SupabaseFile => 
                item.id !== null && 
                item.name !== null && 
                !item.name.endsWith('/')
            );

            if (fileList.length === 0) {
                setIsLoading(false);
                return;
            }

            const fetchedImages: GalleryImage[] = fileList.map(file => {
                const { data: publicData } = supabase.storage
                    .from(PUBLIC_BUCKET_NAME)
                    .getPublicUrl(file.name);

                return {
                    name: file.name,
                    url: publicData.publicUrl,
                    created_at: file.created_at,
                };
            });

            setImages(fetchedImages);

        } catch (err: any) {
            console.error('Error fetching images:', err);
            setError('Failed to load images. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    const handleDownload = async (image: GalleryImage) => {
        try {
            const response = await fetch(image.url);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = image.name;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err) {
            console.error('Download failed:', err);
        }
    };

    const formatFileName = (fileName: string) => {
        // Remove file extension and clean up the name
        const nameWithoutExt = fileName.replace(/\.[^/.]+$/, "");
        // Convert to title case and replace hyphens/underscores with spaces
        return nameWithoutExt
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <header className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm">
                        <BsGrid3X3Gap className="text-white text-xl" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Image Gallery
                        </h1>
                        <p className="text-gray-500 mt-1">
                            {images.length} image{images.length !== 1 ? 's' : ''} stored in Supabase
                        </p>
                    </div>
                </div>
                <button
                    onClick={fetchImages}
                    disabled={isLoading}
                    className="flex items-center space-x-2 px-4 py-3 text-sm bg-white text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md font-medium"
                >
                    <BsArrowClockwise className={isLoading ? 'animate-spin' : ''} />
                    <span>{isLoading ? 'Refreshing...' : 'Refresh'}</span>
                </button>
            </header>

            {error && (
                <div className="mb-6 p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg flex items-center">
                    <div className="flex-1">
                        <strong className="font-medium">Unable to load images</strong>
                        <p className="mt-1">{error}</p>
                    </div>
                    <button
                        onClick={() => setError(null)}
                        className="text-red-700 hover:text-red-800 ml-4 text-lg font-bold"
                    >
                        ×
                    </button>
                </div>
            )}

            {/* Loading State */}
            {isLoading && images.length === 0 && (
                <div className="text-center py-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading your images...</p>
                </div>
            )}
            
            {/* Empty State */}
            {!isLoading && images.length === 0 && !error && (
                <div className="text-center py-20 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50/50">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gray-200 flex items-center justify-center">
                        <BsImage className="text-gray-500 text-3xl" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-3">
                        No images found
                    </h3>
                    <p className="text-gray-500 max-w-sm mx-auto text-lg">
                        Upload images to your Supabase bucket to get started.
                    </p>
                </div>
            )}

            {/* Grid Display */}
            {images.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {images.map((image, index) => (
                        <div 
                            key={`${image.url}-${index}`} 
                            className="group relative bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
                        >
                            {/* Image Container */}
                            <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden relative">
                                <img
                                    src={image.url}
                                    alt={formatFileName(image.name)}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                                            <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
                                                <rect width="400" height="300" fill="#f8fafc"/>
                                                <circle cx="200" cy="120" r="40" fill="#e2e8f0"/>
                                                <path d="M200 180 L160 240 L240 240 Z" fill="#e2e8f0"/>
                                                <text x="200" y="280" text-anchor="middle" font-family="system-ui" fill="#94a3b8" font-size="14">
                                                    ${formatFileName(image.name)}
                                                </text>
                                            </svg>
                                        `)}`;
                                    }}
                                />
                                
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center space-x-4">
                                    <a
                                        href={image.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-white text-gray-800 rounded-xl hover:bg-gray-100 hover:scale-110 transition-all duration-200 shadow-lg flex items-center space-x-2 font-medium"
                                    >
                                        <BsEye className="text-lg" />
                                        <span>View</span>
                                    </a>
                                    <button
                                        onClick={() => handleDownload(image)}
                                        className="p-3 bg-white text-gray-800 rounded-xl hover:bg-gray-100 hover:scale-110 transition-all duration-200 shadow-lg flex items-center space-x-2 font-medium"
                                    >
                                        <BsDownload className="text-lg" />
                                        <span>Download</span>
                                    </button>
                                </div>
                            </div>

                            {/* Image Info */}
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 leading-tight">
                                    {formatFileName(image.name)}
                                </h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
                                        {new Date(image.created_at).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </span>
                                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                                        {image.name.split('.').pop()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}