import { useState } from 'react';
import Quiz from '../components/game/Quiz';
import Memoria from '../components/game/Memoria';
import Resultado from '../components/game/Resultado';
import Continuar from '../components/game/Continuar';

export default function Game() {
    const [acertos, setAcertosQuiz] = useState(0);
    const [fase, setFase] = useState('quiz');

    // const irParaMemoria = () => setFase('memoria');
    // const irParaResultado = (pontuacaoMemoria) => { setFase('resultado'); setAcertosMemoria(pontuacaoMemoria); };
    const reiniciarJogo = () => { setAcertosQuiz(0); setFase('quiz'); };
    const irParaResultado = (pontuacao) => { setFase('continuar'); setAcertosQuiz(pontuacao); };

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
