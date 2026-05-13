
import React from 'react';
import { Helmet } from 'react-helmet';
import { Database, ShieldAlert, LayoutDashboard, HardDrive } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import DevLiveSyncManager from '@/components/DevLiveSyncManager.jsx';

const AdminDataPage = () => {
  return (
    <>
      <Helmet>
        <title>Admin Data Management - XTC Platform</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Header />

        <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shadow-sm">
                <HardDrive className="w-6 h-6" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Data Management</h1>
            </div>
            <p className="text-gray-500 text-lg ml-11">
              Centralized control panel for database synchronization and environment management.
            </p>
          </div>

          {/* Warning Banner */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-xl mb-8 flex items-start gap-4 shadow-sm">
            <ShieldAlert className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-amber-800 font-bold text-sm uppercase tracking-wider mb-1">Restricted Area</h3>
              <p className="text-amber-700 text-sm leading-relaxed">
                Tools in this section directly affect system-wide data. The synchronization process will overwrite existing records in the Live environment with matching IDs from the Dev environment. Please ensure you have verified the data before initiating a sync.
              </p>
            </div>
          </div>

          {/* Sync Manager Component */}
          <DevLiveSyncManager />

          {/* Placeholder for other admin tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 opacity-60 hover:opacity-100 transition-opacity cursor-not-allowed">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-5 h-5 text-gray-400" />
                <h3 className="font-bold text-gray-700">Database Backup</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">Create a full snapshot of the current database state. Feature currently under development.</p>
              <button disabled className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg text-sm font-medium w-full">Coming Soon</button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 opacity-60 hover:opacity-100 transition-opacity cursor-not-allowed">
              <div className="flex items-center gap-3 mb-4">
                <ShieldAlert className="w-5 h-5 text-gray-400" />
                <h3 className="font-bold text-gray-700">System Cleanup</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">Remove temporary files and orphaned records to optimize performance. Feature currently under development.</p>
              <button disabled className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg text-sm font-medium w-full">Coming Soon</button>
            </div>
          </div>

        </main>

        <Footer />
      </div>
    </>
  );
};

export default AdminDataPage;
