"use client";

import React from "react";
import Image from "next/image";
import { useAnimate } from "framer-motion";

import AppStoreButton from "./AppStoreButton";
import PlayStoreButton from "./PlayStoreButton";

import { heroDetails } from "@/data/hero";
import {
  HighlighterItem,
  HighlightGroup,
  Particles,
} from "@/components/ui/highlighter";

const Hero: React.FC = () => {
  const [scope, animate] = useAnimate();

  React.useEffect(() => {
    // Only run animation if elements exist
    const runAnimation = async () => {
      await animate(
        [
          ["#pointer", { left: 200, top: 60 }, { duration: 0 }],
          ["#javascript", { opacity: 1 }, { duration: 0.3 }],
          [
            "#pointer",
            { left: 50, top: 102 },
            { at: "+0.5", duration: 0.5, ease: "easeInOut" },
          ],
          ["#javascript", { opacity: 0.4 }, { at: "-0.3", duration: 0.1 }],
          ["#react-js", { opacity: 1 }, { duration: 0.3 }],
          [
            "#pointer",
            { left: 224, top: 170 },
            { at: "+0.5", duration: 0.5, ease: "easeInOut" },
          ],
          ["#react-js", { opacity: 0.4 }, { at: "-0.3", duration: 0.1 }],
          ["#typescript", { opacity: 1 }, { duration: 0.3 }],
          [
            "#pointer",
            { left: 88, top: 198 },
            { at: "+0.5", duration: 0.5, ease: "easeInOut" },
          ],
          ["#typescript", { opacity: 0.4 }, { at: "-0.3", duration: 0.1 }],
          ["#next-js", { opacity: 1 }, { duration: 0.3 }],
          [
            "#pointer",
            { left: 200, top: 60 },
            { at: "+0.5", duration: 0.5, ease: "easeInOut" },
          ],
          ["#next-js", { opacity: 0.5 }, { at: "-0.3", duration: 0.1 }],
        ],
        {
          repeat: Number.POSITIVE_INFINITY,
        }
      );
    };

    runAnimation();
  }, [animate]);

  return (
    <section className="relative mx-auto">
      <HighlightGroup className="group h-full">
        <div
          className="group/item h-full md:col-span-6 lg:col-span-12"
          data-aos="fade-down"
        >
          <HighlighterItem className="rounded-3xl p-6">
            <div className="relative z-20 h-full overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-black">
              <Particles
                className="absolute inset-0 -z-10 opacity-10 transition-opacity duration-1000 ease-in-out group-hover/item:opacity-100"
                quantity={200}
                color={"#555555"}
                vy={-0.2}
              />
              
              {/* Animation Container - Hidden but functional */}
              <div
                className="absolute h-[270px] w-[300px] opacity-0"
                ref={scope}
              >
                <div
                  id="next-js"
                  className="absolute bottom-12 left-14 rounded-3xl border border-slate-400 bg-slate-200 px-2 py-1.5 text-xs opacity-50 dark:border-slate-600 dark:bg-slate-800"
                >
                  UI-UX
                </div>
                <div
                  id="react-js"
                  className="absolute left-2 top-20 rounded-3xl border border-slate-400 bg-slate-200 px-2 py-1.5 text-xs opacity-50 dark:border-slate-600 dark:bg-slate-800"
                >
                  Graphic Design
                </div>
                <div
                  id="typescript"
                  className="absolute bottom-20 right-1 rounded-3xl border border-slate-400 bg-slate-200 px-2 py-1.5 text-xs opacity-50 dark:border-slate-600 dark:bg-slate-800"
                >
                  Web Application
                </div>
                <div
                  id="javascript"
                  className="absolute right-12 top-10 rounded-3xl border border-slate-400 bg-slate-200 px-2 py-1.5 text-xs opacity-50 dark:border-slate-600 dark:bg-slate-800"
                >
                  Branding
                </div>

                <div id="pointer" className="absolute">
                  <svg
                    width="16.8"
                    height="18.2"
                    viewBox="0 0 12 13"
                    className="fill-red-500"
                    stroke="white"
                    strokeWidth="1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 5.50676L0 0L2.83818 13L6.30623 7.86537L12 5.50676V5.50676Z"
                    />
                  </svg>
                  <span className="bg-ali relative -top-1 left-3 rounded-3xl px-2 py-1 text-xs text-white">
                    Ali
                  </span>
                </div>
              </div>

              {/* Your Original Hero Content */}
              <section
                id="hero"
                className="relative flex items-center justify-center pb-0 pt-32 md:pt-40 px-5"
              >
                {/* Background grid pattern */}
                <div className="absolute left-0 top-0 bottom-0 -z-10 w-full">
                  <div className="absolute inset-0 h-full w-full bg-hero-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
                </div>

                <div className="absolute left-0 right-0 bottom-0 backdrop-blur-[2px] h-40 bg-gradient-to-b from-transparent via-[rgba(233,238,255,0.5)] to-[rgba(202,208,230,0.5)]"></div>

                <div className="text-center relative z-10">
                  <h1 className="text-4xl md:text-6xl md:leading-tight font-bold text-foreground max-w-lg md:max-w-2xl mx-auto">
                    {heroDetails.heading}
                  </h1>
                  <p className="mt-4 text-foreground max-w-lg mx-auto">
                    {heroDetails.subheading}
                  </p>

                  <div className="mt-6 flex flex-col sm:flex-row items-center sm:gap-4 w-fit mx-auto">
                    <AppStoreButton dark />
                    <PlayStoreButton dark />
                  </div>

                  <Image
                    src={heroDetails.centerImageSrc}
                    width={384}
                    height={340}
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 384px"
                    priority
                    unoptimized
                    alt="App mockup"
                    className="relative mt-12 md:mt-16 mx-auto z-10"
                  />
                </div>
              </section>
            </div>
          </HighlighterItem>
        </div>
      </HighlightGroup>
    </section>
  );
};

export default Hero;