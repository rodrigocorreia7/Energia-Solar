import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white text-gray-900 animate-pulse">
      {/* Skeleton Top Bar */}
      <div className="h-10 bg-gray-100 border-b border-gray-200" />

      {/* Skeleton Header */}
      <header className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-gray-200" />
          <div className="space-y-1.5">
            <div className="w-32 h-4 rounded bg-gray-200" />
            <div className="w-20 h-2.5 rounded bg-gray-100" />
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <div className="w-16 h-3.5 rounded bg-gray-200" />
          <div className="w-20 h-3.5 rounded bg-gray-200" />
          <div className="w-16 h-3.5 rounded bg-gray-200" />
          <div className="w-28 h-9 rounded-xl bg-red-100" />
        </div>
      </header>

      {/* Skeleton Hero Section */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center flex flex-col items-center">
        {/* Badge */}
        <div className="w-48 h-6 rounded-full bg-amber-100/80 mb-6" />

        {/* Title Lines */}
        <div className="w-3/4 max-w-2xl h-10 rounded-xl bg-gray-200 mb-3" />
        <div className="w-1/2 max-w-lg h-8 rounded-xl bg-gray-200 mb-6" />

        {/* Subtitle */}
        <div className="w-full max-w-xl h-4 rounded bg-gray-100 mb-2" />
        <div className="w-2/3 max-w-md h-4 rounded bg-gray-100 mb-10" />

        {/* Visual Box */}
        <div className="w-full max-w-2xl h-64 rounded-3xl bg-gray-100 border border-gray-200 flex items-center justify-center">
          <div className="size-16 rounded-2xl bg-gray-200" />
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="w-48 h-12 rounded-xl bg-red-200" />
          <div className="w-48 h-12 rounded-xl bg-gray-200" />
        </div>
      </main>
    </div>
  );
}
