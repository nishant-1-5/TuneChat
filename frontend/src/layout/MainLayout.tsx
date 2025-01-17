// Three col basically, 2nd col is the main content and 1st and 3rd col are sidebars
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Outlet } from "react-router-dom"
import LeftSideBar from "./components/LeftSideBar";
import RightSideBar from "./components/RightSideBar";
import AudioPlayer from "./components/AudioPlayer";
import PlaybackControls from "./components/PlaybackControls";
import { useEffect, useState } from "react";

const MainLayout = () => {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

    return (
    <div className="h-screen bg-black text-white flex flex-col ">
        <AudioPlayer />
        <ResizablePanelGroup direction="horizontal" className="flex-1 flex overflow-hidden height-full p-2">
            {/* Left Sidebar */}
            <ResizablePanel defaultSize={20} minSize={isMobile ? 0: 10} maxSize={30}>
            <LeftSideBar />
            </ResizablePanel>
            <ResizableHandle className="w-2 bg-black rounded-lg transition-colors"/>
            {/* Main Content */}
            <ResizablePanel defaultSize={isMobile? 80: 60}>
            <Outlet />
            </ResizablePanel>
            <ResizableHandle className="w-2 bg-black rounded-lg transition-colors"/>
            {/* Right Sidebar */}
            <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
                <RightSideBar />
            </ResizablePanel>
        </ResizablePanelGroup>
        <PlaybackControls />
    </div>
  )
}

export default MainLayout