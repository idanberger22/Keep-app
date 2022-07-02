import { keepService } from './services/keep.service.js'
import { KeepList } from './cmps/keep-list.jsx'
import { KeepAdd } from './cmps/keep-add.jsx'
import { KeepFilter } from './cmps/keep-filter.jsx'

export class KeepMain extends React.Component {
    state = {
        notes: null,
        filterBy: null,
        add:true,
        name:null,
        txt:null

    }
    componentDidMount() {
        this.loadNotes()
        const params = new URLSearchParams(this.props.location.search)
         if (params){
            this.setState({add:false, name:params.get('name'),txt:params.get('txt')})
         } 
    }
    loadNotes = () => {
        keepService.query(this.state.filterBy)
            .then(notes => this.setState({ notes: notes }))
    }
    onChangeFilter = (filterBy) => {
        this.setState({ filterBy }, () => {
            this.loadNotes()
        })
    }
    render() {
        const { notes,add,name,txt } = this.state
        return <section>
            <div className='keep-forms-container'>
                {add && <KeepAdd loadNotes={this.loadNotes} />}
                {!add && <KeepAdd loadNotes={this.loadNotes} name={name} txt={txt}/>}
                <KeepFilter onChangeFilter={this.onChangeFilter} />
            </div>
            {notes && <KeepList notes={notes} loadNotes={this.loadNotes} />}
        </section>
    }
}