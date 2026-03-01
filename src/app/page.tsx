"use client";

import { Suspense, useCallback, useRef, useState } from "react";
import { AppIcon } from "@/components/icons";
import { useSearchPost } from "@/hooks/requests/useSearchPost";
import SearchBox from "@/components/search/SearchBox";
import SearchResult from "@/components/search/SearchResult";
import PostViewer from "@/components/post/PostViewer";
import useModalNavigation from "@/hooks/useModalNavigation";
import { ModalProvider } from "@/context/ModalContext";
import { TrashCanLoader } from "@/components/ui/TrashCanLoader";


function SearchPage() {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { query, setQuery, options, toggleOption, filters, toggleFilter, results, isSearching, error, performSearch } = useSearchPost(scrollAreaRef);
  const [selectedPost, _setSelectedPost] = useState<PostResponse | null>(null);

  const isModalOpen = selectedPost !== null;
  const closeModalCallback = useCallback(() => _setSelectedPost(null), [_setSelectedPost]);
  const { pushModal, popModal } = useModalNavigation("post", isModalOpen, closeModalCallback);

  const setSelectedPost = (post: PostResponse | null) => {
    if (post) {
      pushModal(post.id);
    } else {
      popModal();
    }
    _setSelectedPost(post);
  }

  return (
    <div ref={scrollAreaRef} className="bg-gray-50 dark:bg-gray-950 transition-colors flex flex-col flex-1 overflow-y-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-track-[#1e1e1e] scrollbar-thumb-[#3e4042] hover:scrollbar-thumb-[#4e5052]">
      {/* FIXED HEADER */}
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          {/* APP ICON / LOGO */}
          <AppIcon />
          <SearchBox
            query={query} setQuery={setQuery} performSearch={performSearch} isSearching={isSearching}
            options={options} toggleOption={toggleOption} filters={filters} toggleFilter={toggleFilter} />
        </div>
      </header>
      {/* RESULTS */}
      <main className="max-w-4xl w-full mx-auto p-6 flex flex-col flex-1">
        <SearchResult isSearching={isSearching} error={error} results={results} openPost={setSelectedPost} performSearch={performSearch} />
        {
          selectedPost && <PostViewer post={selectedPost} onClose={() => setSelectedPost(null)} />
        }
      </main>
    </div>
  )
}


const SuspenseFallback = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 transition-colors flex flex-col flex-1">
      <div className="m-auto">
      <TrashCanLoader/>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <ModalProvider>
        <SearchPage />
      </ModalProvider>
    </Suspense>
  )
}
