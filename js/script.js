const imagesURL = [
    'https://www.itl.cat/pngfile/big/241-2413811_stock-photography.jpg',
    'https://wallpapers.com/images/hd/retrowave-car-4k-08j907mahnj4b6jt.jpg',
    'https://img.freepik.com/fotos-gratis/ilustracao-legal-com-formas-geometricas-e-luzes-de-laser-de-neon-perfeita-para-papeis-de-parede_181624-34458.jpg?w=2000',
    'https://img.freepik.com/free-photo/cosmic-background-with-colorful-red-blue-laser-lights-perfect-digital-wallpaper_181624-24678.jpg?w=2000',
    'https://wallpaperaccess.com/full/370024.jpg',
    'https://img.wallpapersafari.com/desktop/1366/768/10/30/hvIXMw.jpg'
]

function initializeImages() {
    if (imagesURL.length) {
        document.querySelector('.row').innerHTML = ''
        imagesURL.forEach((url, index) => {
            const divCol = document.createElement('div')
            divCol.classList.add('col-md-4')
            divCol.innerHTML = `
                <div class="card mb-4 shadow-sm">
                    <img class="card-img-top" src="${url}" alt="Card image cap">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button onClick="editarFoto(${index})" type="button" class="btn btn-sm btn-outline-primary mr-2 px-3">Editar</button>
                                <button onClick="excluirFoto(${index})" type="button" class="btn btn-sm btn-outline-danger mr-2 px-3">Excluir</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
            document.querySelector('.row').appendChild(divCol)
        })
    }
    else {
        document.querySelector('.row').innerHTML = '<h1 class="py-5">Nenhuma foto publicada para exibir</h1>'
    }
}

function verificaURL(url) {
    try {
        return Boolean(new URL(url))
    } catch (error) {
        return false
    }
}

function salvarFoto() {
    const urlInput = document.querySelector('#urlInput')
    if (document.querySelector('#cadastroFoto').getAttribute('editMode') && verificaURL(urlInput.value)) {
        imagesURL[document.querySelector('#cadastroFoto').getAttribute('indexEdit')] = urlInput.value
        initializeImages()
    }
    else {
        if (urlInput.value && verificaURL(urlInput.value)) {
            urlInput.classList.remove('is-invalid')
            imagesURL.push(urlInput.value)
            initializeImages()
            urlInput.value = ''
        }
        else {
            urlInput.classList.add('is-invalid')
        }
    }
}

function editarFoto(index) {
    $('#cadastroFoto').modal('show')
    document.querySelector('#cadastroFoto').setAttribute('editMode', true)
    document.querySelector('#cadastroFoto').setAttribute('indexEdit', index)
    const urlInput = document.querySelector('#urlInput').value = imagesURL[index]
}

function excluirFoto(index) {
    imagesURL.splice(index, 1)
    initializeImages()
}

function limpaURL() {
    const urlInput = document.querySelector('#urlInput')
    urlInput.value = ''
}

window.addEventListener('load', () => {
    initializeImages()
    $('#cadastroFoto').on('hidden.bs.modal', function (e) {
        const urlInput = document.querySelector('#urlInput')
        urlInput.value = ''
        urlInput.classList.remove('is-invalid')
        document.querySelector('#cadastroFoto').removeAttribute('editMode')
        document.querySelector('#cadastroFoto').removeAttribute('indexEdit')
    })
})