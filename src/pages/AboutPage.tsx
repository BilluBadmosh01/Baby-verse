import { motion } from 'framer-motion';
import {
  FiArrowLeft,
  FiHeart,
  FiCloud,
  FiSmile,
  FiCpu,
} from 'react-icons/fi';
import { Button } from '../components/UI/Button';
import { Card } from '../components/UI/Card';
import { AnimatedBackground } from '../components/Effects/AnimatedBackground';
import { useGameStore } from '../store/useGameStore';

const features = [
  {
    icon: <FiSmile />,
    title: 'Care for your baby',
    body: 'Feed, dress, bathe and soothe your little one. Watch mood and needs change in real time.',
    color: 'from-blush-300 to-blush-400',
  },
  {
    icon: <FiCloud />,
    title: 'A cozy 3D world',
    body: 'A warm, soft-lit nursery rendered in real-time 3D. Rotate, zoom and admire your baby.',
    color: 'from-sky-300 to-sky-400',
  },
  {
    icon: <FiHeart />,
    title: 'Express your style',
    body: 'Dress your baby in cute outfits, hand them toys and capture precious camera moments.',
    color: 'from-sun-300 to-sun-400',
  },
  {
    icon: <FiCpu />,
    title: 'Plays anywhere',
    body: 'BabyVerse runs fully offline and saves your progress locally on your device.',
    color: 'from-mint-300 to-mint-400',
  },
];

export function AboutPage() {
  const setScene = useGameStore((s) => s.setScene);

  return (
    <div className="relative min-h-screen px-6 py-12">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-ink-900"
            >
              About BabyVerse
            </motion.h1>
            <p className="mt-1 text-ink-500">Your pocket-sized parenting playground.</p>
          </div>
          <Button variant="glass" size="md" icon={<FiArrowLeft />} onClick={() => setScene('landing')}>
            Back
          </Button>
        </div>

        <Card className="mb-6">
          <p className="text-lg leading-relaxed text-ink-700">
            BabyVerse is a warm, playful virtual baby simulator inspired by classics like
            Pou and My Talking Tom. Nurture your very own little one in a cozy 3D nursery —
            feed when hungry, tuck in when sleepy, dress up in adorable outfits, and play
            together with toys. Every moment is designed to feel calm, cute and premium.
          </p>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, type: 'spring', stiffness: 200, damping: 24 }}
            >
              <Card hover className="h-full">
                <span
                  className={`mb-3 inline-grid h-12 w-12 place-items-center rounded-3xl bg-gradient-to-br ${f.color} text-white shadow-soft`}
                >
                  {f.icon}
                </span>
                <h3 className="text-lg font-semibold text-ink-900">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-600">{f.body}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-sm text-ink-400"
        >
          Phase 1 — World &amp; layout. Interactions arrive soon.
        </motion.p>
      </div>
    </div>
  );
}
