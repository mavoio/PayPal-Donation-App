"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { RiCloseLine } from 'react-icons/ri';

export default function CancelPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <RiCloseLine className="text-3xl text-red-500" />
        </motion.div>
        <h1 className="text-4xl font-bold text-white mb-4">Payment Cancelled</h1>
        <p className="text-gray-400 mb-8">
          Your donation has been cancelled. You can try again anytime.
        </p>
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: 5, ease: "linear" }}
          className="h-1 bg-white/20 mx-auto max-w-md"
        />
      </motion.div>
    </div>
  );
} 