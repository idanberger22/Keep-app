import { storageService } from './storage.service.js'

export const keepService = {
    query,
    addTxt,
    addVid,
    addImg,
    addList,
    editNote,
    deleteNote,
    pinNote,
    changeColor,
    deleteTodo,
    addTodo,
    findById,
}

let gNotes

function query(filterBy = null) {
    // localStorage.clear()
    gNotes = storageService.loadFromStorage('keepDB')
    if (!gNotes) {
        gNotes = createNotes()
        storageService.saveToStorage('keepDB', gNotes)
    }
    if (filterBy) {
        let { name, type } = filterBy
        if (!name) name = ''
        if (!type || type === 'all') type = ''
        gNotes = gNotes.filter(note => {
            return (note.name.includes(name) &&
                note.type.includes(type))
        })
    }
    gNotes.sort(function(a, b) {
        return b.isPinned-a.isPinned;
      });
    return Promise.resolve(gNotes)
}

function editNote(id, name, val) {
    let note = findById(id)
    if (name === '') return Promise.reject()
    if (note.type === 'txt') {
        note.name = name
        note.info.txt = val
    }
    else if (note.type === 'img') {
        note.name = name
        note.info.url = val
    }
    else if (note.type === 'video') {
        note.name = name
        note.info.url = getEmbedLink(val)
    }
    else note.name = name
    storageService.saveToStorage('keepDB', gNotes)
    return Promise.resolve()
}

function deleteNote(id) {
    gNotes = storageService.loadFromStorage('keepDB')
    gNotes = gNotes.filter(note => note.id !== id)
    storageService.saveToStorage('keepDB', gNotes)
    return Promise.resolve()
}

function pinNote(id) {
    gNotes = storageService.loadFromStorage('keepDB')
    let note = findById(id)
    if (note.isPinned === 1) note.isPinned = 2
    else note.isPinned = 1
    storageService.saveToStorage('keepDB', gNotes)
}

function addTxt(name, txt) {
    gNotes = storageService.loadFromStorage('keepDB')
    if (name == '') return Promise.reject()
    gNotes.unshift({
        id: makeId(),
        name,
        type: "txt",
        color: getRandomColor(),
        isPinned: 1,
        info: {
            txt
        }
    })
    storageService.saveToStorage('keepDB', gNotes)
    return Promise.resolve()
}

function addVid(name, url, dup = false) {
    gNotes = storageService.loadFromStorage('keepDB')
    const embed = (!dup) ? getEmbedLink(url) : url
    if (name === '' || embed === 'error') return Promise.reject()
    gNotes.unshift({
        id: makeId(),
        name,
        type: "video",
        color: getRandomColor(),
        isPinned: 1,
        info: {
            url: embed
        }
    })
    storageService.saveToStorage('keepDB', gNotes)
    return Promise.resolve()
}
function addImg(name, url) {
    gNotes = storageService.loadFromStorage('keepDB')
    if (name === '' || url==='') return Promise.reject()
    gNotes.unshift({
        id: makeId(),
        name,
        type: "img",
        color: getRandomColor(),
        isPinned: 1,
        info: {
            url
        }
    })
    storageService.saveToStorage('keepDB', gNotes)
    return Promise.resolve()
}
function addList(value,firstTask) {
    gNotes = storageService.loadFromStorage('keepDB')
    let name = (typeof value == 'string') ? value : value.name
    let todos = (typeof value == 'string') ? [
        { txt: firstTask, id: makeId() },
    ] : value.info.todos

    if (name === '') return Promise.reject()
    gNotes.unshift({
        id: makeId(),
        name,
        type: "todos",
        color: getRandomColor(),
        isPinned: 1,
        info: {
            todos: todos
        }
    })
    storageService.saveToStorage('keepDB', gNotes)
    return Promise.resolve()
}

function changeColor(id, color) {
    gNotes = storageService.loadFromStorage('keepDB')
    let note = findById(id)
    note.color = color
    storageService.saveToStorage('keepDB', gNotes)
    return Promise.resolve()
}


function addTodo(id, txt) {
    gNotes = storageService.loadFromStorage('keepDB')
    let note = findById(id)
    note.info.todos.push({ txt: txt, id: makeId() })
    storageService.saveToStorage('keepDB', gNotes)
    return Promise.resolve()
}

function deleteTodo(noteId, todoId) {
    gNotes = storageService.loadFromStorage('keepDB')
    let note = findById(noteId)
    note.info.todos = note.info.todos.filter(todo => todo.id != todoId)
    storageService.saveToStorage('keepDB', gNotes)
    return Promise.resolve()
}

function findById(id) {
    gNotes = storageService.loadFromStorage('keepDB')
    const note = gNotes.find(note => note.id === id)
    return note
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}
function getEmbedLink(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return url.slice(0, 24) + 'embed/' + match[2]
    } else {
        return 'error';
    }
}
function createNotes() {
    const notes = [
        {
            id: "n101",
            name: 'fullstack',
            type: "txt",
            color: 'white',
            isPinned: 1,
            info: {
                txt: "Fullstack Me Baby!"
            }
        },
        {
            id: "n16661",
            name: 'Bitcoin',
            type: "txt",
            color: 'white',
            isPinned: 1,
            info: {
                txt: "Bitcoin price just spiked!"
            }
        },
        {
            id: "n102",
            name: 'meme',
            type: "img",
            color: 'rgba(255, 255, 122, 0.589)',
            isPinned: 1,
            info: {
                url: "http://codinginfinite.com/wp-content/uploads/2019/05/maxresdefault-1.jpg",
                title: "Bobi and Me"
            },

        },
        {
            id: "n1122",
            name: 'malenia',
            type: "img",
            color: 'rgba(255, 158, 158, 0.588)',
            isPinned: 1,
            info: {
                url: "https://static.kinguin.net/cdn-cgi/image/w=1140,q=80,fit=scale-down,f=auto/media/images/products/_WCCFeldenring.jpg",
                title: "Bobi and Me"
            },

        },
        {
            id: "n103",
            name: 'todo',
            type: "todos",
            color: 'rgba(166, 255, 166, 0.52)',
            isPinned: 1,
            info: {
                todos: [
                    { txt: "Driving liscence", id: makeId() },
                    { txt: "Upgrade Projects", id: makeId() },
                    { txt: "Buy new chair", id: makeId() },
                ]
            }
        },
        {
            id: "sre103",
            name: 'groceries:',
            type: "todos",
            color: 'white',
            isPinned: 1,
            info: {
                todos: [
                    { txt: "milk", id: makeId() },
                    { txt: "bread", id: makeId() },
                    { txt: "pasta", id: makeId() },
                ]
            }
        },
        {
            id: 'n157104',
            name: 'god of war',
            type: 'video',
            color: 'white',
            isPinned: 1,
            info: {
                url: 'https://www.youtube.com/embed/yegRHiaao7U'
            }
        },
        {
            id: 'n1056464',
            name: 'tom',
            type: 'video',
            color: 'rgba(189, 233, 247, 0.603)',
            isPinned: 1,
            info: {
                url: 'https://www.youtube.com/embed/-kF0xydrEAY'
            }
        }
    ];
    return notes;
}

function getRandomColor() {
    const num = Math.random()
    if (num < 0.2) return 'rgba(255, 158, 158, 0.588)'
    else if (num < 0.4) return 'rgba(189, 233, 247, 0.603)'
    else if (num < 0.6) return 'rgba(166, 255, 166, 0.52)'
    else if(num<0.8) return 'rgba(255, 255, 122, 0.589)'
    else return 'white'
}