import { TrashCanLoader } from "@/components/ui/TrashCanLoader";
import SearchPostCard from "./SearchPostCard";

interface ResultBodyProps {
    error: string | null;
    results: PostResponse[]
    openPost: (post: PostResponse) => void
}

function ErrorResult({ error, performSearch }: { error: string, performSearch: () => void }) {
    return (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex flex-col gap-3 text-red-700 dark:text-red-400">
            <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-medium">{error}</p>
            </div>
            <button
                onClick={() => performSearch()}
                className="flex items-center self-start gap-2 ml-6 px-3 py-1.5 bg-red-100 dark:bg-red-800/40 hover:bg-red-200 dark:hover:bg-red-800/60 text-red-700 dark:text-red-300 rounded-lg text-xs font-bold transition-colors"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={"h-3.5 w-3.5"}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                重試
            </button>
        </div>
    );
}

function ResultBody({ error, results, openPost }: ResultBodyProps) {
    if (results.length === 0) {
        if (error)
            return null;
        return (
            <div className="text-center py-20">
                <p className="text-gray-400 dark:text-gray-500 text-lg">
                    沒有找到相關結果
                </p>
            </div>
        );
    }
    return <div className="flex flex-col gap-6">
        {results.map((post) => (
            <SearchPostCard key={post.id} post={post} onOpen={openPost} />
        ))}
    </div>
}

interface SearchResultProps {
    isSearching: boolean,
    error: string | null,
    results: PostResponse[]
    openPost: (post: PostResponse) => void
    performSearch: () => void
}

export default function SearchResult({ isSearching, error, results, openPost, performSearch }: SearchResultProps) {
    if (isSearching && results.length === 0) {
        return (
            <div className="m-auto flex flex-col justify-center items-center py-20">
                <TrashCanLoader />
                <p className="mt-4 text-gray-400 text-sm">正在搜尋中...</p>
            </div>
        );
    }
    return (
        <div className="w-full">
            {/* Error UI Display */}
            {error && <ErrorResult error={error} performSearch={performSearch} />}
            {/* Results */}
            <ResultBody error={error} results={results} openPost={openPost} />
        </div>
    );
}   