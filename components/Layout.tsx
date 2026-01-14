
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Overview', icon: 'fa-th-large' },
    { id: 'daily', label: 'Daily', icon: 'fa-calendar-check' },
    { id: 'weekly', label: 'Outcomes', icon: 'fa-bullseye' },
    { id: 'scorecard', label: 'Scorecard', icon: 'fa-medal' },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-0 md:pl-64 flex flex-col">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-slate-900 text-white flex-col p-6 z-40">
        <div className="mb-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
            <i className="fas fa-leaf text-white text-xl"></i>
          </div>
          <h1 className="text-xl font-bold tracking-tight">ZenHabit</h1>
        </div>
        
        <nav className="flex-1 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === tab.id 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <i className={`fas ${tab.icon} w-5`}></i>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <img src="https://picsum.photos/seed/user/100" className="w-10 h-10 rounded-full bg-slate-700" alt="Profile" />
            <div>
              <p className="text-sm font-semibold">Alex Pro</p>
              <p className="text-xs text-slate-500 italic">Elite Performer</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-white border-b sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <i className="fas fa-leaf text-indigo-600 text-lg"></i>
          <span className="font-bold">ZenHabit</span>
        </div>
        <img src="https://picsum.photos/seed/user/100" className="w-8 h-8 rounded-full" alt="Profile" />
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10 max-w-6xl mx-auto w-full">
        {children}
      </main>

      {/* Bottom Nav - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-3 z-40">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 ${
              activeTab === tab.id ? 'text-indigo-600' : 'text-slate-400'
            }`}
          >
            <i className={`fas ${tab.icon}`}></i>
            <span className="text-[10px] uppercase tracking-wider font-bold">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};
