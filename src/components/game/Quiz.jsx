import { useState, useEffect, useCallback } from 'react';
import { somAcerto, somErro, somVitoria } from '../../sounds/sounds.js';

const perguntasBase = [
    {
        pergunta: "Qual é a possível causa da mensagem 'disco não encontrado' ao ligar o computador?",
        opcoes: [
            "Cabo de energia desconectado",
            "Falha no HD ou SSD",
            "Erro de driver de vídeo",
            "Problema na impressora"
        ],
        resposta: "Falha no HD ou SSD"
    },
    {
        pergunta: "Qual o primeiro passo ao identificar a mensagem 'disco não encontrado'?",
        opcoes: [
            "Formatar o computador",
            "Verificar conexões do HD dentro do gabinete",
            "Reinstalar o Office",
            "Trocar a memória RAM"
        ],
        resposta: "Verificar conexões do HD dentro do gabinete"
    },
    {
        pergunta: "Se as conexões estão corretas, qual é a próxima etapa recomendada?",
        opcoes: [
            "Resetar a BIOS",
            "Substituir o HD por um novo",
            "Desinstalar programas desnecessários",
            "Remover a placa de vídeo"
        ],
        resposta: "Substituir o HD por um novo"
    },
    {
        pergunta: "Após substituir o HD com falha, o que deve ser feito antes de instalar o sistema operacional?",
        opcoes: [
            "Rodar um antivírus",
            "Atualizar o firmware da placa-mãe",
            "Configurar o boot pelo novo disco na BIOS",
            "Conectar à internet"
        ],
        resposta: "Configurar o boot pelo novo disco na BIOS"
    },
    {
        pergunta: "Qual ferramenta pode ser usada para instalar o Windows no novo HD?",
        opcoes: [
            "Media Creation Tool em um pendrive",
            "Gerenciador de tarefas",
            "Painel de controle",
            "CMD no modo de segurança"
        ],
        resposta: "Media Creation Tool em um pendrive"
    },
    {
        pergunta: "O que pode ser feito para tentar recuperar os dados do HD antigo?",
        opcoes: [
            "Formatar o HD antigo",
            "Utilizar um adaptador externo para conectar o HD a outro computador",
            "Instalar antivírus no HD antigo",
            "Excluir arquivos temporários"
        ],
        resposta: "Utilizar um adaptador externo para conectar o HD a outro computador"
    },
    {
        pergunta: "Para evitar perda de dados no futuro, o que deve ser implementado no escritório Monteiro Silva?",
        opcoes: [
            "Limpeza semanal do gabinete",
            "Backups automáticos e em nuvem",
            "Antivírus gratuito",
            "Troca mensal de HDs"
        ],
        resposta: "Backups automáticos e em nuvem"
    },
    {
        pergunta: "Qual das opções abaixo é um sintoma comum de HD em falha, além da mensagem de erro?",
        opcoes: [
            "Desligamento forçado ao abrir sites",
            "Ruídos incomuns e lentidão para inicializar",
            "Erro no teclado",
            "Tela azul ao abrir planilhas"
        ],
        resposta: "Ruídos incomuns e lentidão para inicializar"
    },
    {
        pergunta: "Após a instalação do novo HD e sistema operacional, o que deve ser feito?",
        opcoes: [
            "Instalar drivers e softwares do escritório",
            "Atualizar a BIOS",
            "Desinstalar o antivírus padrão",
            "Aumentar o brilho da tela"
        ],
        resposta: "Instalar drivers e softwares do escritório"
    },
    {
        pergunta: "Qual medida preventiva garante mais segurança para os dados do escritório?",
        opcoes: [
            "Usar apenas HDs com mais de 2 TB",
            "Manter o computador sempre ligado",
            "Criar imagem do sistema regularmente",
            "Instalar dois antivírus diferentes"
        ],
        resposta: "Criar imagem do sistema regularmente"
    }
];


function embaralharArray(array) {
    return array
        .map((item) => ({ item, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ item }) => item);
}

export default function Quiz({ onComplete }) {
    const [perguntas, setPerguntas] = useState([]);
    const [indice, setIndice] = useState(0);
    const [acertos, setAcertos] = useState(0);
    const [tecladoAtivo, setTecladoAtivo] = useState(false);
    const [respostaSelecionada, setRespostaSelecionada] = useState(null);
    const [opcaoSelecionadaIndex, setOpcaoSelecionadaIndex] = useState(0);

    // ✅ useEffect deve vir antes de qualquer return
    useEffect(() => {
        setPerguntas(
            perguntasBase.map((p) => ({
                ...p,
                opcoes: [...p.opcoes],
            }))
        );
    }, []);

    // ⚠️ useCallback também antes do return
    const selecionarResposta = useCallback((opcao) => {
        if (respostaSelecionada !== null) return;

        setRespostaSelecionada(opcao);
        const acertou = opcao === perguntas[indice].resposta;

        if (acertou) {
            setAcertos((prev) => prev + 1);
            somAcerto.play();
        } else {
            somErro.play();
        }

        setTimeout(() => {
            setRespostaSelecionada(null);
            setOpcaoSelecionadaIndex(0);

            if (indice + 1 < perguntas.length) {
                setIndice(indice + 1);
            } else {
                const novoTotal = acertou ? acertos + 1 : acertos;
                onComplete(novoTotal);
                somVitoria.play();
            }
        }, 800);

    }, [respostaSelecionada, perguntas, indice, acertos, onComplete]);

    // ✅ teclado também aqui antes do return
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (respostaSelecionada !== null || !perguntas.length) return;

            const perguntaAtual = perguntas[indice];

            // Ativa controle de teclado só na primeira tecla de navegação
            if (!tecladoAtivo && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
                setTecladoAtivo(true);
                return; // não move ainda, só ativa o controle
            }

            if (!tecladoAtivo) return;

            if (e.key === 'ArrowUp') {
                setOpcaoSelecionadaIndex((prev) =>
                    prev > 0 ? prev - 1 : perguntaAtual.opcoes.length - 1
                );
            }

            if (e.key === 'ArrowDown') {
                setOpcaoSelecionadaIndex((prev) =>
                    prev < perguntaAtual.opcoes.length - 1 ? prev + 1 : 0
                );
            }

            if (e.key === 'Enter') {
                selecionarResposta(perguntaAtual.opcoes[opcaoSelecionadaIndex]);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [respostaSelecionada, perguntas, indice, opcaoSelecionadaIndex, tecladoAtivo, selecionarResposta]);


    // ✅ Agora o return condicional está DEPOIS dos hooks
    if (!perguntas.length) {
        return (
            <div className="max-w-xl mx-auto text-center">
                <p className="text-gray-600">Carregando perguntas...</p>
            </div>
        );
    }

    const perguntaAtual = perguntas[indice];
    const progresso = ((indice + 1) / perguntas.length) * 100;

    return (
        <div className="max-w-xl mx-auto text-center text-gray-900 dark:text-white">
            {/* Barra de progresso */}
            <div className="w-full bg-gray-200 dark:bg-zinc-700 h-3 rounded mb-4 overflow-hidden">
                <div
                    className="bg-blue-500 h-full transition-all duration-300"
                    style={{ width: `${progresso}%` }}
                />
            </div>

            {/* Pergunta */}
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                {perguntaAtual.pergunta}
            </h3>

            {/* Opções */}
            <div className="grid gap-3">
                {perguntaAtual.opcoes.map((opcao, idx) => {
                    const isSelecionada = respostaSelecionada !== null;
                    const isCorreta = opcao === perguntaAtual.resposta;
                    const isErrada = opcao === respostaSelecionada && !isCorreta;
                    const isFocus = tecladoAtivo && idx === opcaoSelecionadaIndex && !isSelecionada;

                    let bgClass = 'bg-white dark:bg-zinc-800 hover:bg-blue-100 dark:hover:bg-blue-900 border';
                    if (isCorreta && isSelecionada) bgClass = 'bg-green-200 border-green-400 dark:bg-green-600';
                    else if (isErrada && isSelecionada) bgClass = 'bg-red-200 border-red-400 dark:bg-red-600';
                    else if (isFocus) bgClass = 'bg-blue-100 border-blue-300 dark:bg-blue-800';

                    return (
                        <button
                            key={idx}
                            onClick={() => selecionarResposta(opcao)}
                            disabled={isSelecionada}
                            className={`px-4 py-2 rounded text-sm transition-all duration-300 ${bgClass}`}
                        >
                            {opcao}
                        </button>
                    );
                })}
            </div>

            {/* Rodapé da pergunta */}
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-300 flex justify-between">
                <span>Pergunta {indice + 1} de {perguntas.length}</span>
                <span>Acertos: {acertos}</span>
            </div>
        </div>
    );
}
