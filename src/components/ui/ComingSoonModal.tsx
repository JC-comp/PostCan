import { githubRepo } from "@/utils/constants";

export default function ComingSoonModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-sm p-8 mx-4 text-center bg-white shadow-2xl rounded-2xl dark:bg-slate-900 dark:border dark:border-slate-800"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-4 text-4xl">🚧</div>

                <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                    這個功能還沒人處理
                </h2>

                <p className="mb-6 text-gray-600 dark:text-gray-400">
                    想幫助加快開發速度嗎？
                </p>

                <div className="flex flex-col gap-3">
                    <a
                        href={githubRepo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                        前往 GitHub
                    </a>

                    <button
                        onClick={onClose}
                        className="w-full py-2 text-sm font-medium text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
                    >
                        下次再說
                    </button>
                </div>
            </div>
        </div>
    );
}