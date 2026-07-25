import { Html, useProgress } from '@react-three/drei';
import { motion } from 'framer-motion';

export function ModelLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 rounded-3xl bg-white/70 px-6 py-5 backdrop-blur-md">
        <div className="relative h-12 w-12">
          <motion.span
            className="absolute inset-0 rounded-full border-4 border-blush-200"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            style={{ borderTopColor: '#ff85a3' }}
          />
        </div>
        <p className="text-sm font-semibold text-ink-700">
          Waking baby… {Math.round(progress)}%
        </p>
      </div>
    </Html>
  );
}
