import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { motion, AnimatePresence } from "framer-motion";
import Masonry from "react-masonry-css";
import {
  SEARCH_CONTENT,
  ADD_CONTENT,
  GET_ALL_CONTENT,
  GET_CONTENT_BY_TAG,
  GET_ALL_TAGS,
} from "../lib/queries";

// Custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

interface Content {
  id: string;
  title: string;
  url: string;
  type: string;
  tags: string[];
}

function Resources() {
  const [searchInput, setSearchInput] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const debouncedSearchQuery = useDebounce(searchInput, 500);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContent, setNewContent] = useState({
    title: "",
    url: "",
    type: "",
    tags: [] as string[],
  });
  const [imageLoadError, setImageLoadError] = useState<Record<string, boolean>>(
    {}
  );
  const [customTag, setCustomTag] = useState("");

  // Query for all tags
  const { data: tagsData } = useQuery(GET_ALL_TAGS);

  // Query for content based on search or tag
  const { data, loading } = useQuery(
    selectedTag
      ? GET_CONTENT_BY_TAG
      : debouncedSearchQuery.trim()
      ? SEARCH_CONTENT
      : GET_ALL_CONTENT,
    {
      variables: selectedTag
        ? { tag: selectedTag }
        : debouncedSearchQuery.trim()
        ? {
            query: debouncedSearchQuery.trim(),
            contentType: "",
          }
        : undefined,
    }
  );

  const [addContent] = useMutation(ADD_CONTENT, {
    refetchQueries: [{ query: GET_ALL_CONTENT }],
  });

  const allResults = React.useMemo(() => {
    if (!data) return [];

    if (selectedTag) {
      return data.contentByTag || [];
    }

    const combined = [
      ...(data.allContent || []),
      ...(data.searchContent || []),
    ];
    const uniqueResults = Array.from(
      new Map(combined.map((item) => [item.id, item])).values()
    );
    return uniqueResults;
  }, [data, selectedTag]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addContent({
        variables: {
          content: {
            ...newContent,
            id: Math.random().toString(36).substr(2, 9),
          },
        },
      });
      setShowAddForm(false);
      setNewContent({ title: "", url: "", type: "", tags: [] });
    } catch (error) {
      console.error("Error adding content:", error);
    }
  };

  const handleTagSelect = (tag: string) => {
    if (!newContent.tags.includes(tag)) {
      setNewContent({ ...newContent, tags: [...newContent.tags, tag] });
    }
  };

  const handleCustomTagAdd = () => {
    if (customTag.trim() && !newContent.tags.includes(customTag.trim())) {
      setNewContent({
        ...newContent,
        tags: [...newContent.tags, customTag.trim()],
      });
      setCustomTag("");
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setNewContent({
      ...newContent,
      tags: newContent.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const breakpointColumns = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="min-h-screen pt-28 pb-16 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#000000] bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/95 to-gray-950/75" />
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-end mb-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddForm(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-primary-500/20 to-primary-400/20 border border-primary-500/30 rounded-lg font-medium text-primary-400 hover:from-primary-500/30 hover:to-primary-400/30 hover:border-primary-500/40 transition-all duration-200 flex items-center gap-2 hover:text-primary-300 shadow-lg shadow-primary-500/5"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Share Resource
          </motion.button>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-display font-bold text-center mb-4 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text"
          >
            Discover Community Resources
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-center mb-8"
          >
            Explore and share valuable resources with the community. Find
            tutorials, articles, and tools.
          </motion.p>
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative group"
            >
              <input
                type="text"
                placeholder="Search resources..."
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setSelectedTag(null);
                }}
                className="w-full px-5 py-4 rounded-xl bg-gray-900/50 border border-gray-800/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 pl-12 transition-all duration-200 backdrop-blur-sm group-hover:bg-gray-900/70"
              />
              <svg
                className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-primary-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </motion.div>

            {/* Tags Filter */}
            {loading && !tagsData?.allTags ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-2 justify-center"
              >
                {[...Array(15)].map((_, index) => {
                  const widths = ["w-16", "w-20", "w-24", "w-28", "w-32"];
                  const randomWidth =
                    widths[Math.floor(Math.random() * widths.length)];
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                      className={`${randomWidth} h-8 bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-800/50 rounded-lg animate-shimmer bg-[length:200%_100%]`}
                    />
                  );
                })}
              </motion.div>
            ) : (
              tagsData?.allTags && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-2 justify-center"
                >
                  {tagsData.allTags.map((tag: string, index: number) => (
                    <motion.button
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (selectedTag === tag) {
                          setSelectedTag(null);
                        } else {
                          setSelectedTag(tag);
                          setSearchInput("");
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedTag === tag
                          ? "bg-gradient-to-r from-primary-500 to-primary-400 text-white shadow-lg shadow-primary-500/20"
                          : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:shadow-lg hover:shadow-primary-500/5"
                      }`}
                    >
                      {selectedTag === tag && (
                        <span className="mr-2" aria-hidden="true">
                          ✓
                        </span>
                      )}
                      #{tag}
                    </motion.button>
                  ))}
                </motion.div>
              )
            )}

            {/* Dgraph Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-end"
            >
              <a
                href="https://dgraph.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-lg text-xs text-gray-400 hover:text-gray-300 transition-colors group hover:bg-gray-800/70"
              >
                <span>Search powered by</span>
                <img
                  src="https://cdn.prod.website-files.com/63fa3e9d303f20f698270a7a/6634fe57b4ce744214616951_DgraphByHypermode_light.svg"
                  alt="Dgraph"
                  className="h-3.5 invert opacity-75 group-hover:opacity-100 transition-opacity"
                />
              </a>
            </motion.div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="h-6 w-3/4 bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-800/50 rounded-md animate-shimmer bg-[length:200%_100%]"></div>
                  <div className="h-6 w-16 bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-800/50 rounded-md animate-shimmer bg-[length:200%_100%]"></div>
                </div>
                <div className="aspect-video w-full mb-4 bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-800/50 rounded-lg animate-shimmer bg-[length:200%_100%]"></div>
                <div className="h-4 w-full bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-800/50 rounded-md animate-shimmer bg-[length:200%_100%] mb-6"></div>
                <div className="flex flex-wrap gap-2">
                  {[...Array(5)].map((_, lineIndex) => (
                    <div
                      key={`line-${lineIndex}`}
                      className="flex flex-wrap gap-2 w-full"
                    >
                      {[...Array(3)].map((_, tagIndex) => {
                        const widths = ["w-16", "w-20", "w-24", "w-28", "w-32"];
                        const randomWidth =
                          widths[Math.floor(Math.random() * widths.length)];
                        return (
                          <div
                            key={`${lineIndex}-${tagIndex}`}
                            className={`h-6 ${randomWidth} bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-800/50 rounded-md animate-shimmer bg-[length:200%_100%]`}
                          ></div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <Masonry
            breakpointCols={breakpointColumns}
            className="flex -ml-4 w-auto"
            columnClassName="pl-4 bg-clip-padding"
          >
            {allResults.map((item: Content, index: number) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 mb-4 hover:shadow-lg transition-all duration-200 border border-gray-800/50 hover:border-gray-700/50 group hover:bg-gray-900/70"
              >
                <div className="flex items-start justify-between mb-3">
                  <h2 className="font-display text-xl font-semibold group-hover:text-primary-400 transition-colors line-clamp-2">
                    {item.title}
                  </h2>
                  <span className="px-2 py-1 bg-gray-800/50 rounded-md text-xs text-gray-400 font-medium group-hover:bg-primary-500/20 group-hover:text-primary-400 transition-colors">
                    {item.type}
                  </span>
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  {!imageLoadError[item.id] && (
                    <div className="relative aspect-video w-full mb-4 overflow-hidden rounded-lg bg-gray-800/50">
                      <img
                        src={`https://api.microlink.io/?url=${encodeURIComponent(
                          item.url
                        )}&screenshot=true&meta=false&embed=screenshot.url`}
                        alt={item.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        onError={() => {
                          setImageLoadError((prev) => ({
                            ...prev,
                            [item.id]: true,
                          }));
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )}
                  <span className="text-primary-400 hover:text-primary-300 transition-colors text-sm break-all line-clamp-1">
                    {item.url}
                  </span>
                </a>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          setSelectedTag(tag);
                          setSearchInput("");
                        }}
                        className={`px-2 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                          selectedTag === tag
                            ? "bg-primary-500/20 text-primary-400"
                            : "bg-gray-800/30 text-gray-400 hover:bg-primary-500/10 hover:text-primary-400"
                        }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </Masonry>
        )}
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-gray-900/90 backdrop-blur-sm rounded-2xl p-8 max-w-lg w-full border border-gray-800/50"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-2xl font-semibold bg-gradient-to-r from-primary-400 to-primary-600 text-transparent bg-clip-text">
                  Share a Resource
                </h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newContent.title}
                    onChange={(e) =>
                      setNewContent({ ...newContent, title: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    URL
                  </label>
                  <input
                    type="url"
                    value={newContent.url}
                    onChange={(e) =>
                      setNewContent({ ...newContent, url: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Type
                  </label>
                  <select
                    value={newContent.type}
                    onChange={(e) =>
                      setNewContent({ ...newContent, type: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all duration-200"
                    required
                  >
                    <option value="">Select a type</option>
                    <option value="Article">Article</option>
                    <option value="Video">Video</option>
                    <option value="Tutorial">Tutorial</option>
                    <option value="Tool">Tool</option>
                    <option value="Resource">Resource</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tags
                  </label>
                  <div className="space-y-3">
                    {/* Selected Tags */}
                    {newContent.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {newContent.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-primary-500/20 rounded-lg text-sm text-primary-400 flex items-center gap-1"
                          >
                            #{tag}
                            <button
                              type="button"
                              onClick={() => handleTagRemove(tag)}
                              className="hover:text-primary-300"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Existing Tags Dropdown */}
                    {tagsData?.allTags && (
                      <div className="relative">
                        <select
                          onChange={(e) => handleTagSelect(e.target.value)}
                          value=""
                          className="w-full px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all duration-200"
                        >
                          <option value="">Select from existing tags</option>
                          {tagsData.allTags
                            .filter(
                              (tag: string) => !newContent.tags.includes(tag)
                            )
                            .map((tag: string) => (
                              <option key={tag} value={tag}>
                                #{tag}
                              </option>
                            ))}
                        </select>
                      </div>
                    )}

                    {/* Custom Tag Input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={customTag}
                        onChange={(e) => setCustomTag(e.target.value)}
                        placeholder="Add a custom tag"
                        className="flex-1 px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={handleCustomTagAdd}
                        disabled={!customTag.trim()}
                        className="px-4 py-3 bg-primary-500/20 rounded-lg text-primary-400 hover:bg-primary-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-6 px-6 py-3 bg-primary-500 rounded-lg font-medium text-white hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Share Resource
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Resources;
