"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { RiCloseLine, RiPaypalLine, RiErrorWarningLine } from "react-icons/ri";

const DonationModal = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const presetAmounts = ["5", "10", "25", "50", "100"];

  const handleDonate = async () => {
    if (!amount || isNaN(amount)) {
      setError("Please enter a valid amount");
      return;
    }

    const numAmount = parseFloat(amount);
    if (numAmount <= 0) {
      setError("Amount must be greater than 0");
      return;
    }

    setError("");
    setIsProcessing(true);
    
    try {
      const response = await fetch("/api/create-paypal-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: numAmount,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to create payment");
      }

      // Find the approval URL from PayPal response
      const approvalUrl = data.links?.find(link => link.rel === "approve")?.href;
      if (!approvalUrl) {
        throw new Error("PayPal approval URL not found");
      }

      // Redirect to PayPal
      window.location.href = approvalUrl;
    } catch (error) {
      console.error("Payment Error:", error);
      setError(error.message || "Failed to process payment. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-lg mx-4 bg-black/95 border border-white/10 rounded-2xl p-8
                      shadow-2xl shadow-black/50"
          >
            {/* Close button */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center
                        rounded-full bg-black border border-white/10 
                        hover:border-white/20 transition-colors group"
            >
              <RiCloseLine className="text-lg text-white/70 group-hover:text-white/90" />
            </motion.button>

            <h2 className="text-3xl font-bold text-white mb-2">Make a Donation</h2>
            <p className="text-gray-400 mb-8">
              Your support helps bring creative projects to life.
            </p>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400"
                >
                  <RiErrorWarningLine className="text-lg flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Amount input */}
            <div className="mb-8">
              <label className="block text-sm text-gray-400 mb-2">
                Enter Amount (USD)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => {
                    setError("");
                    setAmount(e.target.value.replace(/[^0-9.]/g, ""));
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-8 py-4 text-white
                           focus:outline-none focus:border-white/20 transition-colors"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Preset amounts */}
            <div className="grid grid-cols-5 gap-2 mb-8">
              {presetAmounts.map((preset) => (
                <button
                  key={preset}
                  onClick={() => {
                    setError("");
                    setAmount(preset);
                  }}
                  className={`py-2 rounded-lg border transition-colors ${
                    amount === preset
                      ? "border-white text-white bg-white/10"
                      : "border-white/10 text-gray-400 hover:border-white/20 hover:bg-white/5"
                  }`}
                >
                  ${preset}
                </button>
              ))}
            </div>

            {/* Donate button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleDonate}
              disabled={!amount || isProcessing}
              className={`w-full py-4 rounded-xl flex items-center justify-center gap-2
                       text-lg font-medium transition-colors
                       ${
                         !amount || isProcessing
                           ? "bg-white/10 text-white/50 cursor-not-allowed"
                           : "bg-[#0070ba] text-white hover:bg-[#005ea6]"
                       }`}
            >
              <RiPaypalLine className="text-xl" />
              {isProcessing ? "Processing..." : "Donate with PayPal"}
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DonationModal; 