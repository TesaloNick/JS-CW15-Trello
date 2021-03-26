import {setCookie} from 'cookie.js'

class TreloData {
    constructor(board) {
        this.board = board;
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || []
        this.cards = JSON.parse(localStorage.getItem('cards')) || []
    }
    removeTask(id){
        delete this.tasks[id]
        localStorage.setItem('tasks', JSON.stringify(this.tasks))  
    }
    set card(card) {
        //записываем новый объект(данные Колонки) в массив
        this.cards.push({name: card, id: this.cards.length})
        //обновляем массив в localStorage
        localStorage.setItem('cards', JSON.stringify(this.cards))
    }
    get card() {
        return this.cards
    }
    set task(task) {
        this.tasks.push({...task, id: this.tasks.length})
        localStorage.setItem('tasks', JSON.stringify(this.tasks))    
    }
    get task() {
        return this.tasks
    }
}

class TreloUI extends TreloData {
    constructor() {
        super()
    }
    modalWindow(taskId) {
        const closeMethod = () => {
            modalContainer.classList.remove('show')
            setTimeout(() => {
                modalContainer.remove() //удаляем модульное окно через половину секунды
            }, 500)
        }
        const modalContainer = document.createElement('div')
        modalContainer.classList.add('modal-container')
        modalContainer.innerHTML = `
            <div class="modal-block"> 
                ${this.tasks[taskId].name}
            </div>
        `      //удаляем модальное окно
        const btnDelete = document.createElement('button')
        btnDelete.innerText = 'delete'
        btnDelete.classList.add('delete-btn')
        btnDelete.addEventListener('click', () => {
            this.removeTask(taskId)
            closeMethod()
            this.drawCards()
        })
        const close = document.createElement('button')
        close.innerHTML = 'Close'
        close.addEventListener('click', closeMethod)
        modalContainer.appendChild(close) //добавляем кнопку в дом узел (модальное окно)
        document.body.appendChild(modalContainer) //добавляем модальное окно в тело документа
         //находим в ДОМ появившийся блок и добавляем в него кнопку btnDelete
        document.querySelector('.modal-block').appendChild(btnDelete)
        setTimeout(()=> {
            modalContainer.classList.add('show')
        }, 100)
    }

    drawCards() {
        const container = document.getElementById('cards')
        container.innerHTML = ''
        this.cards.map(item => {
            const card = document.createElement('div')
            const addTaskBtn = document.createElement('button')
            addTaskBtn.innerHTML = '+ add Task'
            const input = document.createElement('input')
            input.setAttribute('placeholder', 'Вводить тут')
            addTaskBtn.addEventListener('click', () => {
                // console.dir(event.currentTarget.parentNode.title)
                this.task = {
                    name: input.value,
                    cardId: item.id,
                    status: 'gray',
                    description: ''
                }
                this.drawCards()
            })
            
            card.innerHTML = item.name
            //фильтруем и отрисовываем массив с тасками
            const filterArray = this.task.filter(task => task && task.cardId === item.id)
            filterArray.map(task => {
                const taskUI = document.createElement('div')
                taskUI.classList.add('task')
                taskUI.innerHTML = task.name
                // создаем модальное окно на клик по таске
                taskUI.addEventListener('click', () => this.modalWindow(task.id))
                card.appendChild(taskUI)
            })
            card.appendChild(input)
            card.appendChild(addTaskBtn)
            container.appendChild(card)
        })
    }
    createCard(event) {
        event.preventDefault()
        const newCard = event.currentTarget[0].value
        this.card = newCard
        event.currentTarget.remove()
        this.drawCards()
    }
    createAddingCardForm() {
        document.body.insertAdjacentHTML('beforeend', `
            <form id='createForm'>
                <input type='text' placeholder='Ввести заголовок карточки'>
                <button>Добавить карточку</button>
            </form>
        `)
        document.getElementById('createForm').addEventListener('submit', (event) => this.createCard(event))
    }
    init() {
        document.body.insertAdjacentHTML('beforeend', `
            <button id='addCard'> + Добавить колонку </button>
        `)
        document.getElementById('addCard').addEventListener('click', () => this.createAddingCardForm())
        this.drawCards()
    }
}

const trelo = new TreloUI('new board')
console.log(trelo.card)
trelo.init()