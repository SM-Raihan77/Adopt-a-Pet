import React from 'react';

interface AdoptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  petName: string;
  onConfirm: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
}

const AdoptionModal: React.FC<AdoptionModalProps> = ({ 
  isOpen, 
  onClose, 
  petName, 
  onConfirm, 
  isSubmitting 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Adopt {petName} 🐾</h2>
        <p className="text-gray-500 text-sm mb-4">Please provide your details to process the adoption request.</p>
        
        <form onSubmit={onConfirm} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Your Name</label>
            <input type="text" name="userName" required placeholder="John Doe" className="w-full border border-gray-200 p-2.5 rounded-xl text-sm focus:outline-none focus:border-cyan-500 bg-gray-50" />
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Phone Number</label>
            <input type="tel" name="phone" required placeholder="017XXXXXXXX" className="w-full border border-gray-200 p-2.5 rounded-xl text-sm focus:outline-none focus:border-cyan-500 bg-gray-50" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Adoption Date</label>
            <input type="date" name="date" required defaultValue={new Date().toISOString().split('T')[0]} className="w-full border border-gray-200 p-2.5 rounded-xl text-sm focus:outline-none focus:border-cyan-500 bg-gray-50" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Your Address</label>
            <textarea name="address" required rows={2} placeholder="Enter your full house address" className="w-full border border-gray-200 p-2.5 rounded-xl text-sm focus:outline-none focus:border-cyan-500 bg-gray-50 resize-none"></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button 
              type="button" 
              onClick={onClose}
              className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 rounded-xl text-sm transition"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-1/2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2.5 rounded-xl text-sm transition flex items-center justify-center disabled:bg-cyan-400"
            >
              {isSubmitting ? 'Processing...' : 'Confirm Adopt'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdoptionModal;