let dropArea = document.getElementById('drop-area')

  ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
  })

  function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
  }

/*Agora vamos adicionar um indicador para permitir que o usuário saiba que ele realmente arrastou o item sobre a área correta usando CSS para alterar a cor da borda da área para soltar. Os estilos já devem estar lá sob o #drop-area.highlightseletor, então vamos usar JS para adicionar e remover essa highlightclasse quando necessário. */

  ;['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false)
  })  
  ;['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false)
  }) 
  function highlight(e) {
    dropArea.classList.add('highlight')
  }  
  function unhighlight(e) {
    dropArea.classList.remove('highlight')
  }
console.log("tesrte")
/**O que fazer qunado os arquivos forem descartados */
dropArea.addEventListener('drop', handleDrop, false)
function handleDrop(e) {
  let dt = e.dataTransfer
  let files = dt.files
  handleFiles(files)
}
function uploadFile(file, i) { // <- Add `i` parameter
    var url = 'upload.php'
    var xhr = new XMLHttpRequest()
    var formData = new FormData()
    xhr.open('POST', url, true)
    formData.append('arquivo', file)
    fetch(url, {
    method : "POST",
    body: formData,
      }).then(
          response => response.text()
      ).then(
          arquivo => images.push(arquivo)
      );
  }
/*previwe */
  function previewFile(file) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function() {
      let img = document.createElement('img')
      img.src = reader.result
      document.getElementById('gallery').appendChild(img)
    }
  }


  function handleFiles(files) {
    files = [...files]
    files.forEach(uploadFile)
    files.forEach(previewFile)
  }


  /*PROGRESSSSOOOSOO BARRRAAAA */
let filesDone = 0
let filesToDo = 0
let progressBar = document.getElementById('progress-bar')
