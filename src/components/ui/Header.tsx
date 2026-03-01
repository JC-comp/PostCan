export default function Header() {
    return (
        <header className="w-full">
            <div className="bg-amber-100 px-4 py-2 sm:px-6 shadow-md border-b-2 border-amber-300/50">
                <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3">
                    
                    <div className="flex flex-1 items-center gap-x-3">
                        <span className="flex items-center gap-1 rounded bg-amber-600 px-2 py-0.5 text-[11px] font-black uppercase tracking-widest text-white shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                            Warning
                        </span>
                        
                        {/* Dark Text on Light Background for perfect legibility */}
                        <p className="text-sm font-bold text-amber-950">
                            This is a <b>static demo environment</b> intended for UI/UX exploration.
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
}