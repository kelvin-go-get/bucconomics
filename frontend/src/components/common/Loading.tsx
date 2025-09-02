"use client";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        <div className="absolute w-4 h-4 bg-blue-500 rounded-full top-0 left-1/2 -ml-2 animate-[spin_1.2s_linear_infinite] origin-[0px_32px]"></div>
      </div>
    </div>
  );
}
