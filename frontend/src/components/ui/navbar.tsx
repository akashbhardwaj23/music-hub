import { motion } from "framer-motion";
import { ModeToggle } from "./themetoggle";

export function Navbar() {
  return (
      <header className="m-auto max-w-7xl p-4 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="size-10 bg-[var(--primary)] flex items-center justify-center"
            >
              <span className="text-xl font-bold text-[var(--primary-foreground)]">
                M
              </span>
            </motion.div>
            <h1 className="text-2xl font-bold tracking-tight">MOTION</h1>
          </div>

          <ModeToggle />
        </div>
      </header>
  );
}
