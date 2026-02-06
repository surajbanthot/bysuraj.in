"use client";

import { usePathname } from "next/navigation";
import PixelatedVideoBackground from "./PixelatedVideoBackground";

export default function DynamicBackground() {
    const pathname = usePathname();
    const isHome = pathname === "/";

    // Video Source
    const videoSrc = isHome
        ? "/Pixel_Art_City_and_Mountain_Video.mp4"
        : "/Video_Edit_Add_Characters_and_Slow_Down.mp4";

    return <PixelatedVideoBackground src={videoSrc} />;
}
