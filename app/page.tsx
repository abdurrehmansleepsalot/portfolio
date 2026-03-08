"use client";

import React from "react";
import Image from "next/image";
import { Github, Instagram, Mail, ArrowDown, Code2, Camera, Sparkles } from "lucide-react";
import { WebGLShader } from "@/components/ui/web-gl-shader";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* ===== HERO SECTION WITH WEBGL SHADER ===== */}
      <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
        <WebGLShader />

        <div className="relative z-10 border border-white/10 p-2 w-full mx-auto max-w-3xl backdrop-blur-sm">
          <main className="relative border border-white/10 py-10 overflow-hidden bg-black/20">
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none" />

            <div className="relative z-10">
              <p className="text-emerald-400/80 text-center text-sm font-mono tracking-widest uppercase mb-4">
                &lt;AR /&gt;
              </p>
              <h1 className="mb-3 text-white text-center text-7xl font-extrabold tracking-tighter md:text-[clamp(2rem,8vw,7rem)] bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent">
                Muhammad Abdur Rehman
              </h1>
              <p className="text-white/50 px-6 text-center text-xs md:text-sm lg:text-lg max-w-xl mx-auto">
                Data Science Student • Coder • Photographer — crafting at the intersection of technology and creativity.
              </p>

              <div className="flex items-center justify-center gap-6 mt-6 text-white/40 text-xs font-mono">
                <span className="flex items-center gap-1.5">
                  <Code2 className="size-3.5 text-cyan-400" />
                  Coder
                </span>
                <span className="flex items-center gap-1.5">
                  <Camera className="size-3.5 text-purple-400" />
                  Photographer
                </span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-amber-400" />
                  Creator
                </span>
              </div>

              <div className="my-6 flex items-center justify-center gap-1.5">
                <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                </span>
                <p className="text-xs text-emerald-500/80 font-medium">Available for New Projects</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <LiquidButton className="text-white border border-white/20 rounded-full" size={"xl"}>
                  View My Work
                </LiquidButton>
                <a
                  href="#projects"
                  className="text-white/50 hover:text-white text-sm transition-colors duration-300 flex items-center gap-1"
                >
                  Scroll to explore
                  <ArrowDown className="size-3.5 animate-bounce" />
                </a>
              </div>

              <div className="flex items-center justify-center gap-4 mt-8">
                <a
                  href="https://github.com/abdurrehmansleepsalot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/30 hover:text-white transition-colors duration-300"
                  aria-label="GitHub"
                >
                  <Github className="size-5" />
                </a>
                <a
                  href="https://www.instagram.com/pixsbymoon/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/30 hover:text-purple-400 transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="size-5" />
                </a>
                <a
                  href="mailto:abdur.rehman8june@gmail.com"
                  className="text-white/30 hover:text-emerald-400 transition-colors duration-300"
                  aria-label="Email"
                >
                  <Mail className="size-5" />
                </a>
              </div>
            </div>
          </main>
        </div>
      </section>

      {/* ===== PROJECTS SCROLL SECTION ===== */}
      <section id="projects" className="relative bg-gradient-to-b from-black via-zinc-950 to-black">
        <ContainerScroll
          titleComponent={
            <>
              <h2 className="text-4xl font-semibold text-white/80">
                Explore my <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                  Projects
                </span>
              </h2>
            </>
          }
        >
          <Image
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&h=720&fit=crop"
            alt="Code on screen — representing portfolio projects"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-center"
            draggable={false}
          />
        </ContainerScroll>
      </section>

      {/* ===== QUOTE FOOTER ===== */}
      <footer className="relative bg-black py-16 text-center border-t border-white/5">
        <p className="text-white/30 text-sm italic max-w-md mx-auto">
          &quot;In an attempt to reach perfection you become good at things!&quot;
        </p>
        <p className="text-white/20 text-xs mt-4">
          © 2026 Muhammad Abdur Rehman. Built with ☕ and code.
        </p>
      </footer>
    </div>
  );
}
