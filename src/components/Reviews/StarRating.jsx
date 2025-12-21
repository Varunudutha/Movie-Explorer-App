import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const StarRating = ({ rating, setRating, readOnly = false, size = 20 }) => {
    const [hover, setHover] = useState(null);

    return (
        <div className="d-flex align-items-center gap-1">
            {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                const isFilled = starValue <= (hover || rating);

                return (
                    <motion.div
                        key={index}
                        whileHover={!readOnly ? { scale: 1.2 } : {}}
                        whileTap={!readOnly ? { scale: 0.9 } : {}}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                        <FaStar
                            size={size}
                            color={isFilled ? "#e50914" : (readOnly ? "rgba(128,128,128,0.3)" : "rgba(128,128,128,0.5)")}
                            onMouseEnter={() => !readOnly && setHover(starValue)}
                            onMouseLeave={() => !readOnly && setHover(null)}
                            onClick={() => !readOnly && setRating && setRating(starValue)}
                            style={{
                                cursor: readOnly ? 'default' : 'pointer',
                                filter: isFilled ? 'drop-shadow(0 0 4px rgba(229, 9, 20, 0.4))' : 'none',
                                transition: 'color 0.2s'
                            }}
                        />
                    </motion.div>
                );
            })}
        </div>
    );
};

export default StarRating;
