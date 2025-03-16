'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import TaskCoinBadge from '../shared/TaskCoinBadge';
import toast from 'react-hot-toast';

interface BidModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  minBid: number;
  maxBid: number;
  availableBids: number;
  onSubmitBid: (amount: number, proposal: string) => Promise<void>;
}

export default function BidModal({
  isOpen,
  onClose,
  projectTitle,
  minBid,
  maxBid,
  availableBids,
  onSubmitBid,
}: BidModalProps) {
  const [bidAmount, setBidAmount] = useState(minBid);
  const [proposal, setProposal] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bidAmount > availableBids) {
      toast.error('Insufficient TaskCoins');
      return;
    }
    
    setLoading(true);
    try {
      await onSubmitBid(bidAmount, proposal);
      toast.success('Bid submitted successfully!');
      onClose();
    } catch {
      toast.error('Failed to submit bid. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative z-50"
          open={isOpen}
          onClose={onClose}
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel
              as={motion.div}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="mx-auto max-w-xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
                  Place a Bid
                </Dialog.Title>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Project
                  </h3>
                  <p className="text-gray-900 dark:text-white font-medium">{projectTitle}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Available TaskCoins
                  </label>
                  <TaskCoinBadge amount={availableBids} showPrefix={false} />
                </div>

                <div>
                  <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Bid Amount
                  </label>
                  <input
                    type="number"
                    id="bidAmount"
                    min={minBid}
                    max={Math.min(maxBid, availableBids)}
                    value={bidAmount}
                    onChange={(e) => setBidAmount(Number(e.target.value))}
                    className="form-input"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Min: {minBid} - Max: {maxBid} TaskCoins
                  </p>
                </div>

                <div>
                  <label htmlFor="proposal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Proposal
                  </label>
                  <textarea
                    id="proposal"
                    rows={4}
                    value={proposal}
                    onChange={(e) => setProposal(e.target.value)}
                    className="form-input"
                    placeholder="Describe why you're the best fit for this project..."
                    required
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || bidAmount > availableBids}
                    className={`btn-primary ${loading || bidAmount > availableBids ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {loading ? 'Submitting...' : 'Place Bid'}
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}