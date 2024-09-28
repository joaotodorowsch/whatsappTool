import React, { useState } from 'react';
import Papa from 'papaparse';
import Card from './Card';
import './CsvUploader.css'
import './Card.css'

const CsvUploader = () => {
    const [data, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0); // Estado para controlar o índice do cartão
    const [clientsCounter, setClientsCounter] = useState(Number)

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const container = document.getElementById("container_CSV")
        container.style.display = "none"

        if (file) {
            Papa.parse(file, {
                header: true,
                dynamicTyping: true,
                complete: (results) => {
                    setData(results.data); // Armazena os dados no estado
                    setCurrentIndex(0); // Reinicia o índice para 0 ao carregar novos dados
                    setClientsCounter(results.data.length)
                },
                error: (error) => {
                    console.error('Erro:', error);
                },
            });
        }
    };
      

    const handleNextCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length); // Avança para o próximo cartão, reiniciando ao chegar ao final
        setClientsCounter(clientsCounter - 1)
    };

    return (
        <div >
            <div id='container_CSV'>
                <h1 className='text-csv'>Envie sua planilha abaixo</h1>
                <label for="file-upload" class="custom-file-upload">
                Enviar Dados
                <input id="file-upload" type="file" accept='.csv' onChange={handleFileChange}/>
                </label>
            </div>
            {data.length > 0 && (
                <div>
                    <h2>Numero de Clientes: {clientsCounter}</h2>
                    <Card handleNextCard={handleNextCard} data={data[currentIndex]} /> {/* Exibe o cartão com os dados atuais */}
                </div>
            )}
        </div>
    );
};

export default CsvUploader;

