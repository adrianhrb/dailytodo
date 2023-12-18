document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const dateNumber = document.querySelector('#dateNumber')
    const dateText = document.querySelector('#dateText')
    const dateMonth = document.querySelector('#dateMonth')
    const dateYear = document.querySelector('#dateYear')
    const main = document.querySelector('#taskContainer')

    // setting date
    const setDate = () => {
        const days =['sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thurstday',
        'friday',
        'saturday']
        const date = new Date()
        dateNumber.textContent = date.getDate()
        dateText.textContent = days[date.getDay()]
        dateMonth.textContent = date.toLocaleString('en', {month:'short'})
        dateYear.textContent = date.getFullYear()
    }

    function changeTaskStatus(e){
        e.target.classList.toggle('done');
        e.target.id = 'done'
    }

    const order = () => {
        const done = [];
        const toDo = [];
        main.childNodes.forEach(task => {
            task.classList.contains('done')?done.push(task):toDo.push(task)
        })
        return [...toDo,...done];
    }

    const renderOrderedTasks = () => {
        order().forEach(task => main.appendChild(task))
    }


    document.querySelector('.orderButton').addEventListener('click', renderOrderedTasks)
    document.querySelector('.taskForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const value = document.querySelector('#taskText').value;
        if (!value) return;
        const newTask = document.createElement('div')
        newTask.class = 'roundBorder todo'
        newTask.id = 'todo'
        newTask.addEventListener('click', changeTaskStatus)
        newTask.textContent = value
        main.prepend(newTask)
        e.target.reset()
    })

    setDate();
})