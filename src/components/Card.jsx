import React, {useState} from "react";
import './Card.css'


const Card = ({ data, handleNextCard }) => {


    function formatarNome(nomeCompleto) {
        // Regex para pegar o primeiro nome (sequência de letras até o primeiro espaço ou fim da string)
        const regex = /^[a-zA-Z]+/;
        
        // Aplica a regex para capturar o primeiro nome
        const primeiroNome = nomeCompleto.match(regex)[0];
        
        // Formata o nome com a primeira letra maiúscula e o restante minúsculo
        const nomeFormatado = primeiroNome.charAt(0).toUpperCase() + primeiroNome.slice(1).toLowerCase();
        console.log("depois" + nomeFormatado) 
        return nomeFormatado;
      }

    const sendMessage = () => {
        let message = `Boa Tarde ${formatarNome(data.cliente)}, não se esqueça do seu bonus de ${data.valor} ele vence dia ${extrairDiaMes(data.vencimento)}`
        let number = data.celular
        TransformUrl(message, number)
    }
    function TransformUrl(message, number){
        let whatsAppUrl = "http://wa.me/" + number.replace(/\D/g, '') + "?text=" + message.replace(/\s+/g, '%20')
        window.open(whatsAppUrl, "_blank")
        handleNextCard()
    }

    function extrairDiaMes(data) {
        const regex = /^(\d{2}\/\d{2})/;
        const resultado = data.match(regex);
        return resultado ? resultado[1] : null;
      }

    return(
        <>
    <div>
        <div className="container">
        <p>Nome: {data.cliente}</p>
        <p>Data de Vencimento: {extrairDiaMes(data.vencimento)}</p>
        <p>Celular: {data.celular}</p>
        <p>Valor do Bônus: {data.valor}</p>
    </div>
    <div>
        <input className="botao-enviar" type="button" value="Enviar Mensagem" 
        onClick={sendMessage}/>
    </div>
    <div>
        <input className="botao-enviar" type="button" value="Pular" onClick={handleNextCard}/>
    </div>
    </div>
    </>
    )
    
}

export default Card


/*    






    
    */