const images = document.querySelectorAll('.images-block > div')

console.dir(images)

const createModalWindow = (source) => {
    const modalContainer = document.createElement('div')
    modalContainer.classList.add('modal-container')
    modalContainer.innerHTML = `
        <div class="modal-block"> 
            <img src="${source}" />
        </div>
    `;//удаляем модальное окно
    const close = document.createElement('button')
    close.addEventListener('click', () => {})
    modalContainer.appendChild(close) //добавляем кнопку в дом узел (модальное окно)
    document.body.appendChild(modalContainer) //добавляем модальное окно в тело документа
}
images.forEach((item, index) => {//получаю урл картинки и передаю в createModalWindow
    item.addEventListener('click', () => {
        createModalWindow('./img/1.png')
    })
})

// images[0]