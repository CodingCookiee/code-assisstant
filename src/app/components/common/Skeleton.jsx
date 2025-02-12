"use client";

const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={`animate-pulse bg-gray-100 dark:bg-gray-800 rounded-md ${className}`}
      aria-busy="true"
      {...props}
    />
  );
};

export {Skeleton};
