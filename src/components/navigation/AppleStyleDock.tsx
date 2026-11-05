"use client";

import React from "react";
import Image from "next/image";
import {
  HomeIcon,
  Package,
  User,
  Mail,
  SunMoon,
} from "lucide-react";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/core/dock";
import { openAgentXWithQuestion } from "@/components/agent-x/AgentXDrawer";
import { useTheme } from "@/components/theme/ThemeProvider";

export function AppleStyleDock() {
  const { toggleTheme, resolvedTheme } = useTheme();

  return (
    <div className="dock-fixed-container" aria-label="Quick navigation dock">
      <Dock className="dock-glass-bar">
        {/* Home */}
        <DockItem href="/" title="Home" className="dock-circle-btn">
          <DockLabel>Home</DockLabel>
          <DockIcon>
            <HomeIcon className="dock-svg-icon" />
          </DockIcon>
        </DockItem>

        {/* Tools */}
        <DockItem href="/products" title="Tools" className="dock-circle-btn">
          <DockLabel>Tools</DockLabel>
          <DockIcon>
            <Package className="dock-svg-icon" />
          </DockIcon>
        </DockItem>

        {/* Ask Agent X */}
        <DockItem
          onClick={() => openAgentXWithQuestion()}
          title="Ask Agent X"
          className="dock-circle-btn"
        >
          <DockLabel>Ask Agent X</DockLabel>
          <DockIcon>
            <Image
              src="/brand/agent-x-avatar.png"
              alt="Agent X"
              width={26}
              height={26}
              style={{ width: 26, height: 26, objectFit: "contain", borderRadius: "50%" }}
            />
          </DockIcon>
        </DockItem>

        {/* About */}
        <DockItem href="/about" title="About Ameer" className="dock-circle-btn">
          <DockLabel>About</DockLabel>
          <DockIcon>
            <User className="dock-svg-icon" />
          </DockIcon>
        </DockItem>

        {/* Contact */}
        <DockItem href="/contact" title="Contact" className="dock-circle-btn">
          <DockLabel>Contact</DockLabel>
          <DockIcon>
            <Mail className="dock-svg-icon" />
          </DockIcon>
        </DockItem>

        {/* Theme Toggle */}
        <DockItem
          onClick={toggleTheme}
          title={`Switch to ${resolvedTheme === "dark" ? "Light" : "Dark"} mode`}
          className="dock-circle-btn"
        >
          <DockLabel>{resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}</DockLabel>
          <DockIcon>
            <SunMoon className="dock-svg-icon" />
          </DockIcon>
        </DockItem>
      </Dock>
    </div>
  );
}
