export default function Page404() {
    return (
        <>
            <main className="grid min-h-full place-items-center bg-white dark:bg-zinc-800 px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text_truepurple-200">404</p>
                    <h1 className="mt-4 text-5xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-7xl">
                        Página não encontrada
                    </h1>
                    <p className="mt-6 text-lg font-medium text-gray-500 dark:text-gray-400 sm:text-xl/8">
                        Desculpe, não conseguimos encontrar a página que você está procurando.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            href="/"
                            className="rounded-md bg_truepurple-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Voltar para o início
                        </a>
                    </div>
                </div>
            </main>
        </>
    );

}
