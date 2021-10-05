let number_size = 0;
var size_arraay = [];
var sizes;
var size_arraay_edit = [];
var size_edit_number = 0;

function size() {
    number_size = number_size + 1;
    document.querySelector(`#tamanhos${number_size}`).innerHTML += `
    <div id="tamanhos${number_size + 1}">
    <div class="form-group">
        <label for="">Tamanho ${number_size}</label>
        <input type="number" class="form-control" id='produto_${number_size}' aria-describedby="produtos"  placeholder="Digite o Tamanho">
    </div>
    </div>
` 
}