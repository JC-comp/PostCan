import { useRef, useState } from "react";
import { SearchIcon } from "@/components/icons";

interface ClearButtonProps {
    className?: string;
    query: string;
    setQuery: (query: string) => void;
    inputRef: React.RefObject<HTMLInputElement | null>;
}

const ClearButton = ({ className, query, setQuery, inputRef }: ClearButtonProps) => {
    const clearInput = () => {
        setQuery("");
        inputRef.current?.focus();
    }
    return <div className={className}>
        <button
            onClick={clearInput}
            className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={query.length === 0}
            aria-label="Clear search"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </button>
    </div>
}

interface ReloadButtonProps {
    className?: string;
    performSearch: () => void;
    isSearching: boolean;
}

const ReloadButton = ({ className, performSearch, isSearching }: ReloadButtonProps) => {
    return <div className={className}>
        <button
            onClick={() => isSearching ? null : performSearch()}
            className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Reload"
        >
            {
                isSearching ?
                    <div className="animate-spin p-1.5 rounded-full border-2 border-blue-500 border-t-transparent" />
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
            }
        </button>
    </div>
}

const ConfigButton = ({ active, onClick }: {
    active: boolean;
    onClick: () => void
}) => (
    <button
        onClick={onClick}
        type="button"
        className={`p-1.5 rounded-full transition-colors ${active
            ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40'
            : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400'
            }`}
    >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0m-9.75 0h9.75" />
        </svg>
    </button>
);

const ConfigRow = ({
    label,
    checked,
    onChange
}: {
    label: string;
    checked: boolean;
    onChange: () => void
}) => (
    <label className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
        <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
        <input
            name={label}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
        />
    </label>
);

interface ConfigModalProps {
    isOpen: boolean;
    options: SearchOptions;
    toggleOption: (option: keyof SearchOptions) => void;
    filters: SearchFilters;
    toggleFilter: (filter: keyof SearchFilters) => void
}

const ConfigModal = ({
    isOpen,
    options,
    toggleOption,
    filters,
    toggleFilter
}: ConfigModalProps) => {
    return <div className={`${isOpen
        ? 'opacity-100 translate-y-0 pointer-events-auto'
        : 'opacity-0 -translate-y-4 pointer-events-none'} absolute z-20 right-0 mr-0 top-full mt-7 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl p-4 animate-in fade-in zoom-in duration-150`}>
        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-3 px-1">搜尋設定</h3>

        <div className="space-y-1">
            <ConfigRow
                label="搜尋標題"
                checked={options.searchTitle}
                onChange={() => toggleOption('searchTitle')}
            />
            <ConfigRow
                label="搜尋內文"
                checked={options.searchContent}
                onChange={() => toggleOption('searchContent')}
            />

            <div className="h-px bg-gray-100 dark:bg-gray-800 my-2 mx-1" />

            <ConfigRow
                label="包含 18+ 內容"
                checked={filters.nsfw}
                onChange={() => toggleFilter('nsfw')}
            />
        </div>
    </div>
}

interface SearchBoxProps {
    query: string;
    setQuery: (query: string) => void;
    performSearch: () => void;
    isSearching: boolean;
    options: SearchOptions;
    toggleOption: (option: keyof SearchOptions) => void;
    filters: SearchFilters
    toggleFilter: (filter: keyof SearchFilters) => void
}

export default function SearchBox({
    query,
    setQuery,
    performSearch,
    isSearching,
    options,
    toggleOption,
    filters,
    toggleFilter
}: SearchBoxProps
) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [showConfig, setShowConfig] = useState(false);
    return <div className="relative flex-1">
        <div>
            <input
                name="query"
                type="text"
                value={query}
                ref={inputRef}
                onChange={e => setQuery(e.target.value)}
                placeholder="輸入關鍵字開始查詢..."
                className="w-full pl-12 pr-[110px] py-3 bg-gray-100 dark:bg-gray-800 border-none rounded-full focus:ring-2 focus:ring-blue-500 transition-all outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            />
            {/* Search Icon */}
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2" />
            {/* Right Action Group */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
                <ClearButton query={query} setQuery={setQuery} inputRef={inputRef} />
                <ReloadButton performSearch={performSearch} isSearching={isSearching} />
                <ConfigButton active={showConfig} onClick={() => setShowConfig(!showConfig)} />
            </div>
        </div>

        {/* Backdrop */}
        {showConfig && <div className="fixed inset-0 z-10" onClick={() => setShowConfig(false)} />}
        {/* POPUP MODAL */}
        <ConfigModal
            isOpen={showConfig}
            options={options} toggleOption={toggleOption} filters={filters} toggleFilter={toggleFilter} />
    </div>
}