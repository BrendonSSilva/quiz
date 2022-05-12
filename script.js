//1 - saber quantas questoes eu tenho (questions.js)
//2 - mostrar de uma em uma (for(){})
//3 - pegar a primeira questao e exibir 
//4 - quando clicar uma das opcoes, salvar a informacao se acertou ou nao e ir para a proxima questao

//questão atual
let currentQuestion = 0;
let correctAnswers = 0;

//botão fazer novamente
document.querySelector('.scoreArea button').addEventListener('click', resetEvent)

showQuestion();
//functions
//exibir a questao

function showQuestion(){
    if(questions[currentQuestion]){
        //pegar a questão, indo nas questions e selecionando a questao 0
        let q = questions[currentQuestion];

        //porcentagem
        let pct = Math.floor((currentQuestion / questions.length) * 100)
        document.querySelector('.progress--bar').style.width = `${pct}%`

        //ocultar area da pontuação final e exibir area das questões
        document.querySelector('.scoreArea').style.display = 'none'
        document.querySelector('.questionArea').style.display = 'block'

        //exibir a pergunta
        document.querySelector('.question').innerHTML = q.question
        document.querySelector('.options').innerHTML = '';
            
        //exibir alternativas
        let optionsHtml = '';
        for(let i in q.options) {
            //ir na questions.js, buscar os valores das options e exibir.
            optionsHtml += `<div data-op='${i}' class='option'><span>${parseInt(i)+1}</span>${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHtml;

        //evento de click para avancar de questao
        document.querySelectorAll('.options .option').forEach(item=>{
            item.addEventListener('click', optionClickEvent)
        })
    
    }else{
        //fim do quiz
        finishQuiz()
    }
}

function optionClickEvent(e){
    //armazena qual opção foi clicada, e pega o atributo para verificar se está certa a resposta
    let clickedOption = parseInt(e.target.getAttribute('data-op')); 

    //se o valor da opção clicada (clicketOption) for igual o valor do atributo('data-op'), armazenar +1 acerto (correctAnswers)
    if(questions[currentQuestion].answer === clickedOption){
        correctAnswers++
    }
    ////independente da resposta, após ter clicado em uma das alternativas, avançar para a próxima questão (currentQuestion++)
    currentQuestion++
    showQuestion()
}

function finishQuiz(){
    //soma total dos pontos
    let points = Math.floor((correctAnswers / questions.length)*100)

    //exibir a porcentagem de acertos
    document.querySelector('.scorePct').innerHTML = `Você acertou ${points}%`
    //exibir quantas questão foram respondidas e quantas respostas foram corretas
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}`

    //definir as frases e estilos de acordo com a pontuação
    if(points <= 30){
        document.querySelector('.scorePct').style.color = '#ff0000'
        document.querySelector('.scoreText1').innerHTML = 'Tá ruim hein?'
    }else if(points >=40 && points < 70){
        document.querySelector('.scorePct').style.color = '#e2cb00'
        document.querySelector('.scoreText1').innerHTML = 'Ok, foi bom'
    }else if(points >=70){
        document.querySelector('.scorePct').style.color = '#009000'
        document.querySelector('.scoreText1').innerHTML = 'Parabéns!'
    }

    document.querySelector('.progress--bar').style.width = '100%'
    document.querySelector('.scoreArea').style.display = 'block'
    document.querySelector('.questionArea').style.display = 'none'
}

//botão para reiniciar o quiz
function resetEvent(){
    correctAnswers = 0;
    currentQuestion = 0;

    showQuestion()
}