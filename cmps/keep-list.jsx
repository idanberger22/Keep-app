import { KeepPreview } from './keep-preview.jsx'

export function KeepList({notes,loadNotes}) {
    return <section className="keep-list-container">
        {notes.map(note =>
             {return <div className="keep-list-item" key={note.id}>
            <KeepPreview note={note} loadNotes={loadNotes}/>
            </div>})}
    </section>
}