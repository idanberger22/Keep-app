export class KeepFilter extends React.Component {
    state = {
        name:''
    }
    byNameRef = React.createRef()
    byTypeRef = React.createRef()

    setFilter = () => {
        const name = this.byNameRef.current.value
        const type = this.byTypeRef.current.value
        this.props.onChangeFilter({name:name,type:type})
    }

    handleChange = ({ target }) => {
        const value = target.value
        const field = target.name
        this.setState({ [field]: value },this.setFilter)
    }

    render() {
        const {name} = this.state
        return <div className='keep-filter'>
            <input type="text" placeholder='search' value={name} onChange={this.handleChange} name="name" ref={this.byNameRef} className='keep-input' autoComplete="off"/>
            <select name="type" ref={this.byTypeRef} onChange={this.setFilter} className='keep-input'>
                <option value="all">show all</option>
                <option value="txt">text</option>
                <option value="todos">todos</option>
                <option value="img">image</option>
                <option value="video">video</option>
            </select>
        </div>
    }
}