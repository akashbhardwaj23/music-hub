import { TrackType } from "@/config/config";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Dispatch, SetStateAction } from "react";
import { CircleDashedIcon } from "lucide-react";
import { IconCircleDashedPlus } from "@tabler/icons-react";

export default function ListView({
  tracks,
  setCurrenTrack,
}: {
  tracks: TrackType[];
  setCurrenTrack: Dispatch<SetStateAction<TrackType | undefined>>;
}) {
  return (
    <div className="h-full relative border border-border bg-card shadow-sm rounded-md">
      <div className="p-10 grid grid-cols-3 gap-4">
        <AnimatePresence>
          {tracks &&
            tracks.map((track, index) => (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.2,
                }}
                whileTap={{
                  scale: 1.2,
                }}
                className="flex justify-center relative z-10 items-center border border-border shadow-md rounded-[12px] cursor-pointer"
                onClick={() => setCurrenTrack(track)}
              >
                <div className="flex items-center gap-2 px-4 py-2 text-sm max-w-xl">
                  <Image
                    src={track.songImg}
                    width={600}
                    height={600}
                    alt={track.songName}
                    className="w-8 h-8 rounded-[12px] object-cover"
                  />{" "}
                  <span> {track.songName}</span>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
      <button className="p-10 w-full absolute flex justify-end left-0 bottom-2 cursor-pointer">
        <IconCircleDashedPlus className="w-10 h-10 text-forground backdrop-blur-md" />
      </button>
    </div>
  );
}
