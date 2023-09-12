class Pedido {
    constructor(cliente, mesa, descricao) {
        this.id= this.gerarId();
        this.cliente= cliente;
        this.mesa= mesa;
        this.descricao= descricao;
    }
    gerarId() {
        return Math.floor(Math.random() * 1000);
    }
}

class listaPedidos{
    constructor(){
        this.pedidos = [];
    }
    addPedidos(cliente, mesa, descricao) {
        if (checkInputs()) {
            sendMSG("Preencha todos os campos!", "error"); 
        }else{
            const pedido = new Pedido(cliente, mesa, descricao);
            this.pedidos.push(pedido);
            sendMSG("Jogo adicionado com sucesso!", "success");
            clearInputs();
        }
    }
    listarPedidos() {
        return this.pedidos;
    }
    atualizarPedido(id, cliente, mesa, descricao) {
        const pedido = this.listarPedidos(id);
    
        pedido.cliente = cliente;
        pedido.mesa = mesa;
        pedido.descricao = descricao;
    
        return pedido;
      }
    
      // D = Delete
      deletarPedido(parametro) {
        return (this.pedidos = this.pedidos.filter(
          (pedido) => pedido.id != parametro
        ));
      }
}

const listapedidos = new listaPedidos();

function sendMSG(msg,type){  
    const msgDiv = document.getElementById("msg");
    msgDiv.innerHTML = "";

    const msgP = `
        <p class="${type}">${msg}</p>
    `;

    msgDiv.innerHTML += msgP;

    setTimeout(function(){
        msgDiv.innerHTML = "";
    }, 3000);
}

function criarPedido() {
    const cliente = document.getElementById("cliente").value;
    const mesa = Number(document.getElementById("mesa").value);
    const descricao = document.getElementById("descricao").value;

    listapedidos.addPedidos(cliente, mesa, descricao);

    listarPedidos();
    clearInputs();
}

function listarPedidos() {
    const pedidos = listapedidos.listarPedidos();

    const elementoListaPedidos = document.getElementById("listaPedidos");
    elementoListaPedidos.innerHTML = "";

    let content = ""

    pedidos.forEach((pedido) => {
        content += `
        <div id="container_pedidos2">
            <p>ID: ${pedido.id}</p>
            <p>Cliente: ${pedido.cliente}</p>
            <p>Mesa: ${pedido.mesa}</p>
            <p>Descrição: ${pedido.descricao}</p>
            <button onclick="deletarPedido(${pedido.id})"><i class="fa-solid fa-trash"></i></button>
            <button onclick="atualizarPedido(${pedido.id})"><i class="fa-solid fa-pencil"></i></button>
        </div>
        `;
    });

    elementoListaPedidos.innerHTML = content;
    console.log(pedidos);

    clearInputs();
}

let aux = null;

function atualizarPedido(id) {
    const pedido = listapedidos.listarPedidos(id);
  
    document.getElementById("cliente").value = pedido.cliente;
    document.getElementById("mesa").value = pedido.mesa;
    document.getElementById("descricao").value = pedido.descricao;
  
    document.getElementById("cadastro").classList.add("hidden");
    document.getElementById("editar").classList.remove("hidden");
  
    aux = id;
}

function editarPedido() {
    const cliente = document.getElementById("cliente").value;
    const mesa = Number(document.getElementById("mesa").value);
    const descricao = document.getElementById("descricao").value;
  
    listapedidos.atualizarPedido(aux, cliente, mesa, descricao);
  
    listarPedidos();
  
    document.getElementById("cadastro").classList.remove("hidden");
    document.getElementById("editar").classList.add("hidden");
  
    clearInputs();
  
    aux = null;
}

function deletarPedido(id) {
    listapedidos.deletarPedido(id);
  
    listarPedidos();
  
    document.getElementById("listaPedidos").classList.add("hidden");
}

function checkInputs(){
    const cliente = document.getElementById("cliente").value;
    const mesa = document.getElementById("mesa").value;
    const descricao = document.getElementById("descricao").value;

    if(cliente == "" || mesa == "" || descricao == ""){
        return true;
    } else {
        return false;
    }
}

function clearInputs(){
    document.getElementById("cliente").value= "";
    document.getElementById("mesa").value= "";
    document.getElementById("descricao").value= "";
}

