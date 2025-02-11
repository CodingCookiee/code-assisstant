import React from 'react';
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

const Spinner = () => {
    return (
        <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
        className="spinner flex justify-center items-center h-screen"
        >
        <Loader2 className='h-8 w-8 text-indigo-600 lg:w-12 lg:h-12' />     
        </motion.div>
    );
}

export default Spinner;
