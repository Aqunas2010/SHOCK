"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, BookOpen, ArrowRight, CornerDownLeft } from "lucide-react";
import { searchLessons, SearchResult } from "@/lib/searchIndex";

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }
    const res = searchLessons(query);
    setResults(res);
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = useCallback(
    (item: SearchResult) => {
      const targetUrl = item.sectionId
        ? `/lessons/${item.lessonSlug}#${item.sectionId}`
        : `/lessons/${item.lessonSlug}`;
      onClose();
      router.push(targetUrl);
    },
    [onClose, router]
  );

  // Keyboard navigation inside search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
      } else if (e.key === "Enter" && results.length > 0) {
        e.preventDefault();
        const selected = results[selectedIndex];
        if (selected) {
          handleSelect(selected);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose, handleSelect]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-navy-950/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Global Search"
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-clinical-border overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-clinical-border bg-slate-50/70">
          <Search className="w-5 h-5 text-clinical-muted mr-3 shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, mechanisms, hemodynamics, or investigations..."
            className="w-full bg-transparent text-clinical-text placeholder-clinical-muted text-base outline-none"
            aria-label="Search query"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-clinical-muted hover:text-clinical-text rounded-md"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-xs text-clinical-muted bg-slate-200 border border-slate-300 rounded font-mono">
              ESC
            </kbd>
          )}
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query.trim() === "" ? (
            <div className="p-8 text-center text-clinical-muted">
              <p className="text-sm font-medium mb-1">Search the complete SHOCK medical curriculum</p>
              <p className="text-xs text-slate-400">
                Type keywords like &quot;tamponade&quot;, &quot;epinephrine&quot;, &quot;lactate&quot;, &quot;preload&quot;, or &quot;ABCDE&quot;.
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-clinical-muted">
              <p className="text-sm font-medium text-slate-700">No medical topics found</p>
              <p className="text-xs text-slate-400 mt-1">
                No matching results for &quot;{query}&quot;. Try searching for physiological terms or shock types.
              </p>
            </div>
          ) : (
            <ul className="space-y-1" role="listbox">
              {results.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <li
                    key={`${item.lessonSlug}-${item.matchedField}-${idx}`}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-start justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-teal-50 border border-teal-500/40 text-navy-950"
                        : "hover:bg-slate-50 text-clinical-text"
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0 pr-2">
                      <div className="p-1.5 rounded bg-navy-900 text-teal-400 shrink-0 mt-0.5">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-semibold text-teal-700">
                            Lesson {String(item.lessonNumber).padStart(2, "0")}
                          </span>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs text-clinical-muted uppercase font-medium">
                            {item.category}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-clinical-text truncate">
                          {item.lessonTitle}
                        </div>
                        <p className="text-xs text-clinical-muted line-clamp-1 mt-0.5">
                          {item.matchedText}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center self-center text-xs text-clinical-muted">
                      {isSelected ? (
                        <span className="inline-flex items-center gap-1 text-teal-700 font-medium">
                          Select <CornerDownLeft className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        <ArrowRight className="w-4 h-4 text-slate-300" />
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-t border-clinical-border text-xs text-clinical-muted">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1 py-0.5 rounded bg-slate-200 text-slate-700 font-mono text-[10px]">↑</kbd>{" "}
              <kbd className="px-1 py-0.5 rounded bg-slate-200 text-slate-700 font-mono text-[10px]">↓</kbd> to navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-mono text-[10px]">Enter</kbd> to select
            </span>
          </div>
          <div>
            <span>{results.length} results</span>
          </div>
        </div>
      </div>
    </div>
  );
}
