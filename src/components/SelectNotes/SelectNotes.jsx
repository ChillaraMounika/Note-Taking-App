// SelectNotes.jsx
import React, { useContext } from "react";
import styles from "../SelectNotes/SelectNotes.module.css";
import NoteCreation from "./subcomponents/NoteCreation/NoteCreation";
import NoteHeading from "./subcomponents/NoteName/NoteName";
import { NotesContext } from "../../context/NoteContext";

function SelectNotes() {
    const { modal, toggleModal, noteHeadings, hide, isMobile } = useContext(NotesContext);

    return (
        <div className={`${styles.container} ${hide && styles.hidden}`}>
            <h2>Pocket Notes</h2>
            <NoteCreation />
            <div className={`${styles.noteHeadingsContainer} ${isMobile && styles.mobile}`}>
                {noteHeadings.map((noteHeading) => (
                    <NoteHeading key={noteHeading.id} noteHeading={noteHeading} />
                ))}
            </div>
        </div>
    );
}

export default SelectNotes;
