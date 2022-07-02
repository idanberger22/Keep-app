import { keepService } from '../services/keep.service.js'
import { KeepEdit } from './keep-edit.jsx'
export class KeepPreview extends React.Component {

    state = {
        note: '',
        isEdit: false
    }
    heightRef = React.createRef()
    todoRef = React.createRef()

    componentDidMount() {
        this.setState({ note: this.props.note })
    }
    renderNote = () => {
        this.setState({ note: keepService.findById(this.state.note.id) })
    }

    onDeleteNote = () => {
        keepService.deleteNote(this.state.note.id)
            .then(this.props.loadNotes())
    }

    onEditNote = () => {
        this.setState({ ...this.state, isEdit: true })
        this.renderNote()
    }
    onDoneEdit = () => {
        this.setState({ ...this.state, isEdit: false })
        this.renderNote()
    }

    onDupNote = (note) => {
        if (note.type === 'txt') {
            keepService.addTxt(note.name, note.info.txt)
                .then(this.props.loadNotes())
        }
        else if (note.type === 'video') {
            keepService.addVid(note.name, note.info.url, true)
                .then(this.props.loadNotes())
        }
        else if (note.type === 'img') {
            keepService.addImg(note.name, note.info.url)
                .then(this.props.loadNotes())
        }
        else if (note.type === 'todos') {
            keepService.addList(note)
                .then(this.props.loadNotes())
        }
    }

    onPinNote = () => {
        const { note } = this.state
        keepService.pinNote(note.id)
        this.renderNote()
        this.props.loadNotes()
    }

    onChangeColor(color) {
        let { note } = this.state
        keepService.changeColor(note.id, color)
            .then(this.renderNote())
    }

    onDeleteToDo = (noteId, todoId) => {
        keepService.deleteTodo(noteId, todoId)
            .then(this.renderNote())
    }
    onAddTodo = (id) => {
        const value = this.todoRef.current.value
        keepService.addTodo(id, value)
            .then(this.renderNote())
    }

    render() {
        const { note, isEdit } = this.state
        const color = this.state.note.color

        return <div className='keep-inside center' style={{ backgroundColor: color }} ref={this.heightRef}>
            {!isEdit && <div className='center'><p className='keep-name'>{note.name}</p>
                {note.isPinned === 2 && <div onClick={this.onPinNote} className='center keep-pin'>
                <span className="material-icons">push_pin</span>
                    </div>}
                {note.type === 'txt' && <p>{note.info.txt}</p>}

                {note.type === 'img' && <img src={note.info.url} className='keep-list-img' />}

                {note.type === 'todos' && note.info.todos.map(todo => {
                    return <div className='keep-space-between' key={todo.id}><p >{todo.txt}</p>
                        <button onClick={() => this.onDeleteToDo(note.id, todo.id)} >x</button></div>
                })}
                {note.type === 'todos' && <div className='center'><input type="text" id="todo" name="todo"
                    required ref={this.todoRef} style={{ width: '250px', height: '25px' }} />
                    <button onClick={() => this.onAddTodo(note.id)} style={{ width: '100px', marginTop: '8px' }}>add todo</button></div>}
                {
                    note.type === 'video' && <iframe width="290" height="180"
                        src={note.info.url}
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
                }
                <div className='keep-preview-bar center-h'>
                    <div onClick={() => this.onChangeColor('rgba(255, 255, 122, 0.589)')} className='keep-yellow center keep-color-button'>🎨</div>
                    <div onClick={() => this.onChangeColor('rgba(255, 158, 158, 0.588)')} className='keep-lightCoral center keep-color-button'>🎨</div>
                    <div onClick={() => this.onChangeColor('rgba(166, 255, 166, 0.52)')} className='keep-lightGreen center keep-color-button'>🎨</div>
                    <div onClick={() => this.onChangeColor('rgba(189, 233, 247, 0.603)')} className='keep-lightBlue center keep-color-button'>🎨</div>
                    <div onClick={() => this.onChangeColor('white')} className='keep-white center keep-color-button'>🎨</div>

                </div>
                <div className='keep-preview-bar center-h'>
                    <div className='keep-item-button center' title='duplicate' onClick={() => this.onDupNote(note)}>
                        <span className="material-icons">file_copy</span>
                    </div>
                    <div className='keep-item-button center' onClick={() => this.onEditNote()} title='edit' >
                    <span className="material-icons">edit</span>
                    </div>
                    <div className='keep-item-button center' title='pin/unpin' onClick={this.onPinNote}>
                        <span className="material-icons">push_pin</span>
                    </div>
                    <div className='keep-item-button center' title='delete' onClick={this.onDeleteNote}>
                       <span className="material-icons"> delete</span>
                    </div>
                </div>
            </div>
            }
            {isEdit && <KeepEdit note={note} onDoneEdit={this.onDoneEdit} height={this.heightRef.current.clientHeight} />}
        </div >
    }
}