import { Typography } from "@material-tailwind/react";

export function Footer() {
    return (
        <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between">
            <Typography color="white" className="font-normal">
                &copy; 2023 Robert-Bogdan Fesko
            </Typography>
            <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
                <li>
                    <Typography
                        as="a"
                        href="#"
                        color="white"
                        className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                    >
                        License
                    </Typography>
                </li>
                <li>
                    <Typography
                        as="a"
                        href="https://github.com/robertfeo/hse-distsys-ws23"
                        color="white"
                        className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                    >
                        Github
                    </Typography>
                </li>
            </ul>
        </footer>
    );
}