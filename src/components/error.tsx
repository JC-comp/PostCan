import { StopIcon } from "./icons";

interface ErrorResultProps {
    title: string;
    error: string;
    refresh: () => void;
}
function ErrorResult({title, error, refresh }: ErrorResultProps) {
    return (
        <div className="p-8 border border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-800 rounded-lg">
            <div className="flex flex-col items-center gap-3 text-red-600 dark:text-red-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div className="flex flex-col items-center">
                    <p className="font-semibold text-sm">{title}</p>
                    <p className="text-xs opacity-80">
                        {error}
                    </p>
                </div>
                <button
                    onClick={refresh}
                    className="text-xs font-medium bg-red-100 dark:bg-red-900/30 px-3 py-1.5 rounded hover:bg-red-200 transition-colors"
                >
                    重試
                </button>
            </div>
        </div>
    );
}

const UnAuthorizedResult = ({message} : {message: string}) => {
    return <div className="flex flex-col items-center justify-center p-10 bg-slate-50 dark:bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800">
        <StopIcon />
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            內容被禁止
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-[250px] mt-2">
            {message}
        </p>
    </div>
}
export { UnAuthorizedResult, ErrorResult }