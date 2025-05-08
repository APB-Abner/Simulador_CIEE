import { Typography } from "@material-tailwind/react";

export default function Footer() {
    return (
        <footer className="flex w-full flex-row flex-wrap px-2 items-center justify-center gap-y-6 gap-x-12 bg_footer text-gray-400 py-6 text-center">
            <Typography color="blue-gray" className="font-normal">
                &copy; {new Date().getFullYear()} Aprendizes CIEE - Todos os direitos reservados
            </Typography>
        </footer>
    );
}