export default function Resultado({ reiniciar, acertosQuiz }) {
    const total = acertosQuiz;

    function avaliarPontuacao(total) {
        if (total >= 8) {
            return { titulo: "Excelente!", mensagem: "Você foi incrível!", cor: "text-green-500" };
        } else if (total >= 5) {
            return { titulo: "Bom trabalho!", mensagem: "Você mandou bem!", cor: "text-yellow-500" };
        } else {
            return { titulo: "Continue tentando!", mensagem: "Você pode melhorar!", cor: "text-red-500" };
        }
    }

    const resultado = avaliarPontuacao(total);

    return (
        <div className="text-center p-6 max-w-xl mx-auto bg-white dark:bg-zinc-900 rounded-lg shadow animate-fade-in">
            <h2 className={`text-3xl font-bold mb-4 ${resultado.cor}`}>
                {resultado.titulo}
            </h2>

            <p className="mb-2 text-gray-700 dark:text-gray-300">{resultado.mensagem}</p>

            <div className="mt-4 space-y-1 text-gray-800 dark:text-gray-200">
                <p>Quiz: <strong>{acertosQuiz}</strong> / 10</p>
            </div>

            <p className="mt-6 text-xl font-semibold text-blue-600 dark:text-blue-400">
                Pontuação Total: <strong>{total}</strong> / 21
            </p>

            <button
                onClick={reiniciar}
                className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all"
            >
                Tentar novamente
            </button>
        </div>
    );
}
