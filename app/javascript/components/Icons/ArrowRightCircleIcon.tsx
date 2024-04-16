import { SVGAttributes } from "react";

export function ArrowRightCircleIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      fill="none"
      strokeWidth={1.5}
      className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
      stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}
