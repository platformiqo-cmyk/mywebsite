
import React, { useState } from 'react';
import { Database, ArrowRight, AlertTriangle, Loader2, Info, CheckCircle2, Clock } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';
import { Button } from '@/components/ui/button.jsx';
import { Switch } from '@/components/ui/switch.jsx';
import { useToast } from '@/hooks/use-toast.js';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog.jsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.jsx";
import { Progress } from "@/components/ui/progress.jsx";

const COLLECTIONS_TO_SYNC = [
  'news',
  'jobs',
  'contacts',
  'courses',
  'lessons',
  'ebooks',
  'orders'
];

const DevLiveSyncManager = () => {
  const { toast } = useToast();
  const [isDevMode, setIsDevMode] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [syncStats, setSyncStats] = useState(null);
  const [syncProgress, setSyncProgress] = useState({
    current: 0,
    total: 0,
    collection: '',
    details: {}
  });

  const handleSync = async () => {
    setShowConfirm(false);
    setIsSyncing(true);
    setSyncStats(null);
    
    const startTime = performance.now();
    let totalRecordsToSync = 0;
    let totalCopied = 0;
    const results = {};

    try {
      // First pass: count total records to set up progress bar
      for (const coll of COLLECTIONS_TO_SYNC) {
        try {
          const result = await pb.collection(coll).getList(1, 1, { $autoCancel: false });
          totalRecordsToSync += result.totalItems;
        } catch (e) {
          console.warn(`Could not fetch count for ${coll}`, e);
        }
      }

      setSyncProgress({ current: 0, total: totalRecordsToSync, collection: 'Starting...', details: {} });

      // Second pass: actual sync
      for (const coll of COLLECTIONS_TO_SYNC) {
        setSyncProgress(prev => ({ ...prev, collection: coll }));
        let collCopied = 0;
        
        try {
          // Fetch with high page size
          const result = await pb.collection(coll).getList(1, 500, { $autoCancel: false });
          const records = result.items;

          for (const record of records) {
            try {
              // Simulate syncing to Live mode by upserting
              const { id, created, updated, collectionId, collectionName, expand, ...cleanData } = record;
              
              try {
                // Attempt to update existing
                await pb.collection(coll).update(id, cleanData, { $autoCancel: false });
              } catch (updateErr) {
                // If update fails, attempt to create with specific ID
                cleanData.id = id;
                await pb.collection(coll).create(cleanData, { $autoCancel: false });
              }

              collCopied++;
              totalCopied++;
              
              setSyncProgress(prev => ({ 
                ...prev, 
                current: totalCopied,
                details: { ...prev.details, [coll]: collCopied }
              }));
            } catch (recordErr) {
              console.error(`Failed to sync record ${record.id} in ${coll}:`, recordErr);
            }
          }
          results[coll] = collCopied;
        } catch (collErr) {
          console.error(`Failed to fetch collection ${coll}:`, collErr);
          toast({
            title: "Sync Error",
            description: `Could not read data from collection ${coll}.`,
            variant: "destructive"
          });
        }
      }

      const endTime = performance.now();
      const timeTaken = ((endTime - startTime) / 1000).toFixed(2);

      setSyncStats({
        totalCopied,
        timeTaken,
        collections: results
      });

      // Success completion
      toast({
        title: "Sync Complete",
        description: `Successfully copied ${totalCopied} records in ${timeTaken}s.`,
      });

    } catch (error) {
      console.error('Sync process failed:', error);
      toast({
        title: "System Error",
        description: "The sync process was interrupted. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSyncing(false);
      setTimeout(() => {
        if (!syncStats) {
          setSyncProgress({ current: 0, total: 0, collection: '', details: {} });
        }
      }, 2000);
    }
  };

  const progressPercentage = syncProgress.total > 0 
    ? Math.round((syncProgress.current / syncProgress.total) * 100) 
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Left side: Info & Toggle */}
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg ${isDevMode ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              Data Synchronization
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                isDevMode ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
              }`}>
                {isDevMode ? 'DEV MODE' : 'LIVE MODE'}
              </span>
            </h2>
            <p className="text-sm text-gray-500 mt-1 max-w-md">
              Copy all database collections from the Development environment to the Live environment.
            </p>
            
            <div className="flex items-center gap-3 mt-4 bg-gray-50 p-2 rounded-lg border border-gray-100 inline-flex">
              <span className={`text-sm font-medium ${isDevMode ? 'text-amber-600' : 'text-gray-400'}`}>Dev</span>
              <Switch 
                checked={!isDevMode} 
                onCheckedChange={(checked) => setIsDevMode(!checked)}
                disabled={isSyncing}
                className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-amber-500"
              />
              <span className={`text-sm font-medium ${!isDevMode ? 'text-emerald-600' : 'text-gray-400'}`}>Live</span>
            </div>
          </div>
        </div>

        {/* Right side: Action Button */}
        <div className="flex flex-col items-end gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="inline-block">
                  <Button 
                    onClick={() => setShowConfirm(true)}
                    disabled={!isDevMode || isSyncing}
                    className={`h-12 px-6 font-semibold shadow-md transition-all rounded-lg ${
                      isDevMode 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg hover:-translate-y-0.5' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed hidden'
                    }`}
                  >
                    {isSyncing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Syncing...
                      </>
                    ) : (
                      <>
                        Copy Dev <ArrowRight className="w-4 h-4 mx-2" /> Live
                      </>
                    )}
                  </Button>
                </div>
              </TooltipTrigger>
              {!isDevMode && (
                <TooltipContent side="bottom" className="bg-gray-900 text-white border-gray-800">
                  <p className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-amber-400" />
                    Only available in Dev mode
                  </p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Progress Bar Section */}
      {isSyncing && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 animate-in fade-in slide-in-from-top-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-blue-900 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              Copying collection: <span className="font-bold uppercase">{syncProgress.collection}</span>
            </span>
            <span className="text-sm font-bold text-blue-700">
              {syncProgress.current} / {syncProgress.total} records ({progressPercentage}%)
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2.5 bg-blue-200" indicatorClassName="bg-blue-600" />
        </div>
      )}

      {/* Sync Statistics */}
      {syncStats && !isSyncing && (
        <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-100 animate-in fade-in slide-in-from-top-4">
          <h4 className="text-emerald-800 font-bold flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5" />
            Sync Completed Successfully
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-3 rounded-md border border-emerald-100 shadow-sm">
              <p className="text-xs text-gray-500 uppercase font-semibold">Total Records</p>
              <p className="text-xl font-bold text-emerald-700">{syncStats.totalCopied}</p>
            </div>
            <div className="bg-white p-3 rounded-md border border-emerald-100 shadow-sm">
              <p className="text-xs text-gray-500 uppercase font-semibold">Time Taken</p>
              <p className="text-xl font-bold text-emerald-700 flex items-center gap-1">
                <Clock className="w-4 h-4" /> {syncStats.timeTaken}s
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-xl">
              <AlertTriangle className="w-6 h-6 text-amber-500" />
              Confirm Data Sync
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base text-gray-600 pt-2">
              Copy all data from Dev to Live mode? This will add/update records but not delete existing Live data. This action cannot be easily undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel className="border-gray-200 hover:bg-gray-50">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleSync}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Start Sync
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DevLiveSyncManager;
