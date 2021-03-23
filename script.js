class TreloData {
    constructor(board) {
        this.board = board;
        this.tasks = []
        this.cards = localStorage.getItem('cards') ? localStorage.getItem('cards').split(',') : []
    }
    set card(card) {
        this.cards.push(card)
    }
    get card() {
        return this.cards
    }

    set task(task) {
        this.tasks.push(task)
    }
    get task() {
        return this.tasks
    }
}

class TreloUI extends TreloData {
    constructor() {
        super()
    }
    drawCards() {
        const container = document.getElementById('cards')
        container.innerHTML = ''
        this.cards.map(item => {
            const card = document.createElement('div')
            card.title = item
            const addTaskBtn = document.createElement('button')
            addTaskBtn.innerHTML = '+ add Task'
            const input = document.createElement('input')
            addTaskBtn.addEventListener('click', (event) => {
                console.dir(event.currentTarget.parentNode.title)
                this.task = {
                    name: input.value,
                    cardName: item,
                    status: 'gray',
                    description: ''
                }
                
                input.value = ''
                console.log(this.task.filter(item => item.cardName === event.currentTarget.parentNode.title))
            })
            
            card.innerHTML = item
            card.appendChild(input)
            card.appendChild(addTaskBtn)
            container.appendChild(card)
            localStorage.setItem('cards', this.cards)
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