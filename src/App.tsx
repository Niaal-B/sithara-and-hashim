import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Invitation } from './components/Invitation';
import { Gate } from './components/Gate';
import { BackgroundMusic } from './components/BackgroundMusic';
import { useYouTubeAudio } from './hooks/useYouTubeAudio';

const SONG_VIDEO_ID = 'ivrumxRUz_Y';

export function App() {
  const [opened, setOpened] = useState(false);
  const music = useYouTubeAudio(SONG_VIDEO_ID);

  return (
    <main className="pattern-bg relative min-h-screen w-full overflow-x-hidden bg-[#efe7df]">
      {/* Soft glow from the top of the page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[900px] bg-[radial-gradient(ellipse_at_top,rgba(169,130,47,0.12),transparent_65%)]" />

      <BackgroundMusic
        containerRef={music.containerRef}
        playing={music.playing}
        error={music.error}
        showToggle={opened}
        onToggle={music.toggle} />

      <AnimatePresence>
        {!opened && <Gate onOpen={music.play} onOpened={() => setOpened(true)} />}
      </AnimatePresence>

      {opened &&
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="relative">
          <Invitation />
        </motion.div>
      }
    </main>);

}
