"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, BookOpen, Layers, Calculator, HelpCircle, Menu, X, CheckCircle2 } from "lucide-react";
import { GlobalSearch } from "@/components/learning/GlobalSearch";
import { getStoredProgress } from "@/lib/storage";

export function Header() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const handleProgressUpdate = () => {
      const progress = getStoredProgress();
      setCompletedCount(progress.completedLessons.length);
    };

    handleProgressUpdate();
    window.addEventListener("storage", handleProgressUpdate);
    return () => window.removeEventListener("storage", handleProgressUpdate);
  }, [pathname]);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { href: "/lessons", label: "Lessons", icon: BookOpen },
    { href: "/compare", label: "Compare Shock", icon: Layers },
    { href: "/calculator", label: "Calculators", icon: Calculator },
    { href: "/quiz", label: "Knowledge Check", icon: HelpCircle },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-navy-900 border-b border-slate-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo & Subtitle */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 shadow-sm group-hover:scale-125 transition-transform" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-widest text-white uppercase font-sans">
                  SHOCK
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-navy-800 text-teal-400 border border-slate-700">
                  Medical Ed
                </span>
              </div>
              <span className="hidden md:block text-[11px] text-slate-400 tracking-tight">
                Clinical Learning & Emergency Management
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-colors ${
                    isActive
                      ? "bg-navy-800 text-teal-300 border border-slate-700/80"
                      : "text-slate-300 hover:text-white hover:bg-navy-850"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Search Trigger Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-navy-800 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 transition-colors text-xs"
              aria-label="Search lessons"
            >
              <Search className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-block px-1 py-0.5 rounded bg-navy-950 text-slate-400 text-[10px] font-mono border border-slate-800">
                ⌘K
              </kbd>
            </button>

            {/* Progress Pill */}
            <Link
              href="/lessons"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-navy-800 border border-slate-700 text-[11px] text-slate-300 hover:text-white transition-colors"
              title="Tracked learning progress"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
              <span>
                <strong className="text-teal-300 font-mono">{completedCount}</strong>/10 Done
              </span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-slate-300 hover:text-white hover:bg-navy-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-navy-850 border-t border-slate-800 px-4 pt-3 pb-5 space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-navy-800 text-teal-300 border border-slate-700"
                      : "text-slate-300 hover:bg-navy-800 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 text-teal-400" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 px-2">
              <span>Learning Progress:</span>
              <span className="font-mono text-teal-300 font-bold">{completedCount}/10 completed</span>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
