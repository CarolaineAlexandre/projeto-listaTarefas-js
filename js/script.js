let listaTarefas = [
    { id: 1, tarefa: 'Criar HTML', tempo: 5 ,feita: false },
    { id: 2, tarefa: 'Ajustar o JS', tempo: 30, feita: false },
    { id: 3, tarefa: 'Entregar a tarefa', tempo:  10, feita: false }
];

const btnAdicionar = document.getElementById('btnAdicionar');
btnAdicionar.addEventListener('click', function () {
    const tarefa = document.getElementById('tarefa').value;
    const tempo = document.getElementById('tempo').value;
    if(tarefa =="" || tempo ==""){
        alert("Não se esqueça de completar todos os campos ao adicionar sua tarefa")
    }
    else{
        addTarefa(
        {
            id: listaTarefas.length + 1,
            tarefa: tarefa,
            tempo: tempo,
            feita: false
        });
    }
    
});

function removerTarefa(id) {
    listaTarefas = listaTarefas.filter(tarefa => tarefa.id !== id);
    renderizarTarefas();
}


function addTarefa(tarefa) {
    listaTarefas.push(tarefa);
    renderizarTarefas();
}

function fazerTarefa(id, botao){
    listaTarefas = listaTarefas.map(tarefa => {
        if(tarefa.id === id){
            tarefa.feita = !tarefa.feita;
        }
        return tarefa;
    });
    
    if(botao.innerText === 'Fazer'){
        botao.innerText = 'Feito';
        botao.classList.remove('btn-warning');
        botao.classList.add('btn-success');
    } else {
        botao.innerText = 'Fazer';
        botao.classList.remove('btn-success');
        botao.classList.add('btn-warning');                
    }
}

const somaId = listaTarefas.reduce((soma, item) => {
    return soma + item.id;
}, 0);

function renderizarTarefas() {
    let somatempo = listaTarefas.reduce((acumulador, item) => {
    return acumulador + parseInt(item.tempo);}, 
    0);
    document.getElementById('tempoTotal').innerHTML = somatempo
    let listaUl = document.getElementById('listaUl');
    listaUl.innerHTML = '';
    listaTarefas.map(tarefa => {
        let li = document.createElement('li');
        li.classList.add('my-3');
        li.innerHTML = tarefa.tarefa + " -> " + tarefa.tempo + " min";
        if(tarefa.feita == true){
            li.innerHTML += ` <button type="button" 
                        class="btn btn-sm btn-success" 
                        onclick="fazerTarefa(${tarefa.id},this)">
                        Feito
                        </button>`
        } else{
            li.innerHTML += ` <button type="button" 
                        class="btn btn-sm btn-warning" 
                        onclick="fazerTarefa(${tarefa.id},this)">
                        Fazer
                        </button>`;
        }
        li.innerHTML += ` <button type="button" 
                        class="btn btn-sm btn-danger" 
                        onclick="removerTarefa(${tarefa.id})">
                        Remover
                        </button>`;
        listaUl.appendChild(li);
    });
}

renderizarTarefas();

