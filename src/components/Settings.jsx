import React, { useState, useRef } from 'react';
import './Settings.css';

const Settings = () => {
    const [mensagem, setMensagem] = useState('');
    const [placeholdersUsados, setPlaceholdersUsados] = useState(new Set());
    const mensagemRef = useRef(null);

    // Função para inserir o placeholder na mensagem
    const inserirPlaceholder = (variavel) => {
        if (placeholdersUsados.has(variavel)) {
            alert(`O placeholder "${variavel}" já foi inserido!`);
            return; // Não insere se já foi usado
        }

        const placeholderHtml = `<span class="placeholder-botao" contenteditable="false">{{${variavel}}}</span>`;
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);

        // Remove a seleção atual (se houver)
        range.deleteContents();

        // Cria um novo elemento para o placeholder
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = placeholderHtml;
        const frag = document.createDocumentFragment();
        let node;

        while ((node = tempDiv.firstChild)) {
            frag.appendChild(node);
        }

        range.insertNode(frag); // Insere o botão no local correto

        // Atualiza o estado da mensagem
        const novaMensagem = mensagemRef.current.innerHTML;
        setMensagem(novaMensagem);

        // Adiciona o placeholder usado ao conjunto
        setPlaceholdersUsados(new Set(placeholdersUsados).add(variavel));

        // Coloca o cursor no final do texto inserido
        range.setStartAfter(frag);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);

        // Foca na div novamente
        mensagemRef.current.focus();
    };

    const handleInput = (e) => {
        const inputTexto = e.target.innerHTML;
        setMensagem(inputTexto);
    };

    const handleKeyDown = (e) => {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const currentNode = range.startContainer;

        if (e.key === 'Backspace') {
            // Se o cursor está em um placeholder
            if (currentNode.nodeType === Node.TEXT_NODE && currentNode.textContent === '') {
                const prevNode = currentNode.previousSibling;

                if (prevNode && prevNode.classList.contains('placeholder-botao')) {
                    // Remove o placeholder do DOM
                    prevNode.remove();

                    // Atualiza a mensagem
                    const novaMensagem = mensagemRef.current.innerHTML;
                    setMensagem(novaMensagem);

                    // Remove o placeholder do conjunto
                    const novosPlaceholders = new Set(placeholdersUsados);
                    novosPlaceholders.delete(prevNode.textContent.replace(/{{|}}/g, ''));
                    setPlaceholdersUsados(novosPlaceholders);

                    // Impede a ação padrão do Backspace
                    e.preventDefault();

                    // Move o cursor para o lugar correto após a remoção do placeholder
                    const textNode = document.createTextNode(''); // Cria um novo nó de texto
                    range.insertNode(textNode); // Insere o nó de texto
                    range.setStartAfter(textNode);
                    range.collapse(true);
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            }
        }
    };

    return (
        <div>
            <h3>Personalize sua mensagem:</h3>
            
            <div
                ref={mensagemRef}
                id="mensagem"
                className='textarea-estilizada'
                contentEditable
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                style={{ 
                    minHeight: '100px', 
                    border: '1px solid #ccc', 
                    padding: '10px', 
                    borderRadius: '5px', 
                    overflowWrap: 'break-word', 
                    wordBreak: 'break-word', 
                    maxWidth: '400px' 
                }}
                dangerouslySetInnerHTML={{ __html: mensagem }}
            />

            <div style={{ marginTop: '20px' }}>
                {/* Botões estilizados */}
                <button 
                    onClick={() => inserirPlaceholder('nome do cliente')} 
                    className="botao-estilizado"
                >
                    Nome do Cliente
                </button>
                <button 
                    onClick={() => inserirPlaceholder('valor do bônus')} 
                    className="botao-estilizado"
                >
                    Valor do Bônus
                </button>
                <button 
                    onClick={() => inserirPlaceholder('data')} 
                    className="botao-estilizado"
                >
                    Data
                </button>
            </div>
        </div>
    );
};

export default Settings;
