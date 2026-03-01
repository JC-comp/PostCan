interface PostResponse extends Post {
    _formatted?: PostFormatted;
}

interface SearchOptions {
    searchTitle: boolean;
    searchContent: boolean;
}

interface SearchFilters {
    nsfw: boolean;
}
