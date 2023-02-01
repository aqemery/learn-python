import { GridPattern } from '@/components/GridPattern'

export function HeroPattern() {
  return (
    <div className="absolute inset-0 -z-10 mx-0 max-w-none overflow-hidden">
      <div className="absolute left-1/2 top-0 ml-[-38rem] h-[25rem] w-[81.25rem] dark:[mask-image:linear-gradient(white,transparent)]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#a1ace3] to-[#dce0f5] opacity-40 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-[#368ab4]/30 dark:to-[#a1cde3]/30 dark:opacity-100">
          <GridPattern
            width={50}
            height={50}
            x="-12"
            y="4"
            squares={[
              [1, 0],
              [2, 1],
              [3, 2],
              [4, 3],
              [5, 4],
              [6, 5],
              [7, 6],
              [4, 0],
              [5, 1],
              [6, 2],
              [7, 3],
              [8, 4],
              [9, 5],
              [10, 6],
              [7, 0],
              [8, 1],
              [9, 2],
              [10, 3],
              [11, 4],
              [12, 5],
              [13, 6],
            ]}
            className="absolute inset-x-0 inset-y-[-50%] h-[200%] w-full skew-y-[0deg] fill-black/40 stroke-black/50 mix-blend-overlay dark:fill-white/2.5 dark:stroke-white/5"
          />
        </div>
        <svg
          viewBox="0 0 1113 440"
          aria-hidden="true"
          className="absolute top-0 left-1/2 ml-[-19rem] w-[69.5625rem] fill-white blur-[26px] dark:hidden"
        >
          <path d="M.016 439.5s-9.5-300 434-300S882.516 20 882.516 20V0h230.004v439.5H.016Z" />
        </svg>
      </div>
    </div>
  )
}
