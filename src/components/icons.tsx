const AppIcon = () => (
    <div className="flex items-center gap-2 shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 dark:bg-blue-500 text-white shadow-lg shadow-blue-500/20">
            {/* SVG App Icon */}
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" rx="20" fill="#007AFF" />
                <g transform="translate(2, 0) scale(4)">
                    <path d="M7 9L8.125 18.375C8.22855 19.2385 8.95583 19.9 9.82071 19.9H14.1793C15.0442 19.9 15.7714 19.2385 15.875 18.375L17 9" stroke="black" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M6 9H18" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M10 9L10.25 7.5C10.375 6.75 11 6.2 11.75 6.2H12.25C13 6.2 13.625 6.75 13.75 7.5L14 9" stroke="black" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M12 12V16" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                </g>
            </svg>
        </div>
        <span className="hidden md:block text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Post<span className="text-blue-600 dark:text-blue-400">Can</span>
        </span>
    </div>
);

const SearchIcon = ({ className }: { className?: string }) => (
    <div className={`text-gray-400 dark:text-gray-500${className ? ` ${className}` : ''}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    </div>
)

const StopIcon = () => (
    <div className="mb-4 flex items-center justify-center w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8 text-red-600 dark:text-red-500"
        >
            <circle cx="12" cy="12" r="10" />
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
        </svg>
    </div>
)

export { AppIcon, SearchIcon, StopIcon };