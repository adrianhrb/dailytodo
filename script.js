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
            newTask.style.backgroundColor = green
        } else {
            e.target.id = 'done'
            newTask.style.backgroundColor = gray
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
        const editHour = document.createElement('button')
        const changeColor = document.createElement('button')
        changeColor.type = 'button'
        changeColor.textContent = 'Color'
        changeColor.id = 'edit'
        editTask.type = 'button'
        editTask.textContent = 'Edit'
        editTask.id = 'edit'
        editHour.type = 'button'
        editHour.textContent = 'Hour'
        editHour.id = 'edit'
        newTask.classList.add('task')
        newTask.id = 'todo'
        editTask.addEventListener('click', () => {
            const newText = prompt('Edit task:')
            if (newText !== null){
                newTask.textContent = time + ' - ' + newText
            }
        })
        editHour.addEventListener('click', () => {
            const newHour = prompt('Qué nueva hora quieres indicar (Ej: 12:20):')
            const taskText = newTask.textContent.split('-')[1]
            newTask.textContent = newHour + ' - ' + taskText
        })
        changeColor.addEventListener('click', () => {
            const newColor = prompt('What color you want to apply? (Hex or normal color):')
            newTask.style.backgroundColor = newColor
        })
        newTask.addEventListener('click', () => {
            if (newTask.id == 'done'){
                newTask.id = 'todo'
                newTask.style.backgroundColor = 'green'
            } else {
                newTask.id = 'done'
                newTask.style.backgroundColor = 'gray'
            }
        })
        newTask.textContent = time + ' - ' + value
        holeDiv.appendChild(newTask)
        holeDiv.appendChild(editTask)
        holeDiv.appendChild(editHour)
        holeDiv.appendChild(changeColor)
        main.prepend(holeDiv)
        e.target.reset()
    })

    setDate();
})