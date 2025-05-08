import { useState } from 'react';
import Quiz from '../components/game/Quiz';
import Resultado from '../components/game/Resultado';

export default function Game() {
    const [acertos, setAcertosQuiz] = useState(0);
    const [fase, setFase] = useState('quiz');

    const reiniciarJogo = () => { setAcertosQuiz(0); setFase('quiz'); };
    const irParaResultado = (pontuacao) => { setFase('resultado'); setAcertosQuiz(pontuacao); };

    return (
        <div className="p-6 max-w-xl mx-auto bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-200 transition-colors duration-300">
            <h2 className="text-2xl font-bold mb-6 text-center">🎮 Simulador: Case Substituição de HD com Falha</h2>

            {fase === 'quiz' && <Quiz onComplete={irParaResultado} />}
            {fase === 'resultado' && (
                <Resultado
                    reiniciar={reiniciarJogo}
                    acertosQuiz={acertos}
                />
            )}
        </div>
    );
}
