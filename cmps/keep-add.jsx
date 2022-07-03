import { keepService } from '../services/keep.service.js'
export class KeepAdd extends React.Component {
    state = {
        display: 'txt',
        name: '',
        txt: ''
    }
    nameRef = React.createRef()
    txtRef = React.createRef()
    imgRef = React.createRef()
    vidRef = React.createRef()
    listRef = React.createRef()

    componentDidMount() {
        if (this.props.name || this.props.txt) this.setState({ name: this.props.name, txt: this.props.txt })
    }

    onAdd = (display) => {
        if (display === 'txt') {
            keepService.addTxt(this.nameRef.current.value, this.txtRef.current.value)
                .then(this.props.loadNotes())
                .then(this.txtRef.current.value = '')
        }
        else if (display === 'vid') {
            keepService.addVid(this.nameRef.current.value, this.vidRef.current.value)
                .then(this.props.loadNotes())
                .then(this.vidRef.current.value = '')
        }
        else if (display === 'img') {
            keepService.addImg(this.nameRef.current.value, this.imgRef.current.value)
                .then(this.props.loadNotes())
                .then(this.imgRef.current.value = '')
        }
        else if (display === 'list') {
            keepService.addList(this.nameRef.current.value, this.listRef.current.value)
                .then(this.props.loadNotes())
                .then(this.listRef.current.value = '')
        }
        this.setState({ display: 'txt', name: '' })
        this.nameRef.current.value = ''

    }

    handleChange = ({ target }) => {
        const value = target.value
        const field = target.name
        this.setState({ [field]: value })
    }

    onChangeDisplay = (display) => {
        this.setState({ display })
    }

    render() {
        const { display, name, txt } = this.state
        return <section className='keep-add'>
            {display === 'txt' &&
                <input type="text" id="txt" placeholder="write a note..."
                    name="txt" ref={this.txtRef} className='keep-add-input' value={txt} onChange={this.handleChange} autoComplete="off" />}
            {display === 'img' &&
                <input type="text" id="img" placeholder="image address"
                    name="img" ref={this.imgRef} className='keep-add-input' autoComplete="off" />}
            {display === 'vid' &&
                <input type="text" id="vid" placeholder="youtube link"
                    name="vid" ref={this.vidRef} className='keep-add-input' autoComplete="off" />}
            {display === 'list' &&
                <input type="text" id="todo" placeholder="first task"
                    name="list" ref={this.listRef} className='keep-add-input' autoComplete="off" />}
            {display && <input type="text" id="name" placeholder='what should you call it?' className='keep-add-input'
                value={name} name="name" ref={this.nameRef} style={{ marginButtom: '6px' }} onChange={this.handleChange} autoComplete="off" />}

                
            <div className='keep-add-bar center-h'>
                <button onClick={() => this.onChangeDisplay('txt')} title='text' className='keep-add-button'>
                    <span className="material-icons">edit_note</span>
                </button>
                <button onClick={() => this.onChangeDisplay('img')} title='photo' className='keep-add-button'>
                <span className="material-icons">image</span>
                </button>
                <button onClick={() => this.onChangeDisplay('vid')} title='video' className='keep-add-button'>
                    <span className="material-icons">videocam</span>
                </button>
                <button onClick={() => this.onChangeDisplay('list')} title='list' className='keep-add-button'>
                    <span className="material-icons">checklist</span>
                </button>
                <button onClick={() => this.onAdd(display)} title='add' className='keep-add-button'>Add</button>
            </div>
        </section>
    }
}