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
        if (e.target.id == 'done'){
            e.target.id = 'todo'
        } else {
            e.target.id = 'done'
        }
    }

    const order = () => {
        const done = [];
        const toDo = [];
        main.childNodes.forEach((task) => {
            const taskContent = task.querySelector('.task');
            taskContent.id == 'done' ? done.push(task) : toDo.push(task);
        });
        return [...toDo, ...done];
    };

    const renderOrderedTasks = () => {
        order().forEach(task => main.appendChild(task))
    }


    document.querySelector('.orderButton').addEventListener('click', renderOrderedTasks)
    document.querySelector('.taskForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const value = document.querySelector('#taskText').value;
        if (!value) return;
        const holeDiv = document.createElement('div')
        holeDiv.classList = 'hole'
        const time = document.querySelector('#time').value
        const newTask = document.createElement('div')
        const editTask = document.createElement('button')
        editTask.type = 'button'
        editTask.textContent = 'Edit'
        editTask.id = 'edit'
        newTask.classList.add('task')
        newTask.id = 'todo'
        editTask.addEventListener('click', () => {
            const newText = prompt('Edit task:')
            if (newText !== null){
                newTask.textContent = time + ' - ' + newText
            }
        })
        newTask.addEventListener('click', changeTaskStatus)
        newTask.textContent = time + ' - ' + value
        holeDiv.appendChild(newTask)
        holeDiv.appendChild(editTask)
        main.prepend(holeDiv)
        e.target.reset()
    })

    setDate();
})