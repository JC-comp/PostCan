import { useComingSoon } from "@/context/ModalContext";

interface VersionButtonProps {
    version_count: number;
}

// TODO: implement
export default function VersionButton({ version_count }: VersionButtonProps) {
    const { showModal } = useComingSoon();
    return <div>
        <button
            onClick={showModal}
            className="group flex items-center gap-1.5 px-2 py-1 -ml-2 rounded-md 
                 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 
                 hover:bg-gray-100 dark:hover:bg-gray-800/50 
                 text-sm font-medium transition-all cursor-pointer"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-3.5 h-3.5 opacity-70 group-hover:rotate-[-20deg] transition-transform"
            >
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>查看版本紀錄</span>
            <span className="text-[10px] bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded-full">
                {version_count}
            </span>
        </button>
    </div>
}