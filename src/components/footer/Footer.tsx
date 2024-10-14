"use client"

import { disableHeaderFooter } from "@/utils/disableHeaderFooter";
import { usePathname } from "next/navigation";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const path = usePathname();

    return (
        <>
            {!disableHeaderFooter.includes(path) && (
                <footer className="mt-auto py-4 bg-gray-100/70">
                    <div className="container mx-auto text-center">
                        <p>&copy;{currentYear} Tech Pulse. All rights reserved.</p>
                    </div>
                </footer>
            )}
        </>
    );
};

export default Footer;