import { keepService } from "../services/keep.service.js"

export class KeepEdit extends React.Component {
    state = {
        note: null,
        name: '',
        txt: '',
        url: '',
        height: '340px'
    }
    nameRef = React.createRef()
    txtRef = React.createRef()
    imgRef = React.createRef()
    vidRef = React.createRef()

    componentDidMount() {
        const note = this.props.note
        this.setState({ note, name: note.name, height: this.props.height-10 + 'px' }, this.setInputs())
        if (this.props.height < 340) this.setState({ height: '340px' })
    }
    setInputs = () => {
        const note = this.props.note
        if (note.type === 'txt') this.setState({ ...this.state, txt: note.info.txt })
        else if (note.type === 'img' || note.type === 'video') this.setState({ ...this.state, url: note.info.url })

    }

    handleChange = ({ target }) => {
        const value = target.value
        const field = target.name
        this.setState({ ...this.state, [field]: value })
    }

    onEdit = (ev) => {
        ev.preventDefault()
        const name = this.nameRef.current.value
        const { note } = this.state
        if (note.type === 'video') keepService.editNote(note.id, name, this.vidRef.current.value).then(this.props.onDoneEdit())
        else if (note.type === 'img') keepService.editNote(note.id, name, this.imgRef.current.value).then(this.props.onDoneEdit())
        else if (note.type === 'txt') keepService.editNote(note.id, name, this.txtRef.current.value).then(this.props.onDoneEdit())
        else keepService.editNote(note.id, name).then(this.props.onDoneEdit())
    }

    render() {
        const { note, name, txt, url } = this.state
        if (!note) return <p>loading...</p>
        else return <div className='center' style={{ height: this.state.height }} >
            {note.type === 'txt' && <div className='center'><form className='center' onSubmit={this.onEdit}>
                <p>name:</p>
                <input type="text" value={name} onChange={this.handleChange} name="name" required ref={this.nameRef} className='keep-edit-input' />
                <p>note:</p>
                <textarea value={txt} onChange={this.handleChange} name="txt" required ref={this.txtRef} className='keep-edit-area'></textarea>
            </form> </div>}
            {note.type === 'img' && <div className='center'><form className='center' onSubmit={this.onEdit}>
                <p>name:</p>
                <input type="text" value={name} onChange={this.handleChange} name="name" required ref={this.nameRef} className='keep-edit-input' />
                <p>image address:</p>
                <input type="text" value={url} onChange={this.handleChange} name="url" required ref={this.imgRef} className='keep-edit-input' />
            </form> </div>}
            {note.type === 'video' && <div className='center'><form className='center' onSubmit={this.onEdit}>
                <p>name:</p>
                <input type="text" value={name} onChange={this.handleChange} name="name" required ref={this.nameRef} className='keep-edit-input' />
                <p>youtube link:</p>
                <input type="text" value={url} onChange={this.handleChange} name="url" required ref={this.vidRef} className='keep-edit-input' />

            </form> </div>}
            {note.type === 'todos' && <div className='center'><form className='center' onSubmit={this.onEdit} >
                <p>name:</p>
                <input type="text" value={name} onChange={this.handleChange} name="name" required ref={this.nameRef} className='keep-edit-input' />
            </form> </div>}
            <button onClick={this.onEdit} className='keep-edit-button' style={{ border: '2px solid #f59c58' }}>edit</button>
            <button onClick={this.props.onDoneEdit} className='keep-edit-button'>go back</button>
        </div>

    }
}