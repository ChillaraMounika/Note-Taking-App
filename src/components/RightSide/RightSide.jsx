
import MainPage from "../MainPage/MainPage";
import React, { useContext, useState, useEffect, useCallback } from "react";
import { NotesContext } from "../../context/NoteContext";
import { IoMdArrowRoundBack } from "react-icons/io";
import styles from "../RightSide/RightSide.module.css";
import { BiSolidSend } from "react-icons/bi";
import { nanoid } from "nanoid";

function RightSide() {
    const { currentGroup, hide, setHide, isMobile, noteHeadings, setNoteHeadings } = useContext(NotesContext);
    const { name, color } = currentGroup;
    const [noteText, setNoteText] = useState("");
    const [notes, setNotes] = useState(currentGroup.notes);
    const [isNoteTextEmpty, setIsNoteTextEmpty] = useState(true);

    // Function to generate initials for the group name
    // Function to generate initials for the group name
// Function to generate initials for the group name
// Function to generate initials for the group name
const generateLetters = (groupName) => {
    if (!groupName) return "NA";
    const words = groupName.split(" ");
    if (words.length === 1) {
        return groupName.charAt(0).toUpperCase();
    } else {
        return words.map((word) => word.charAt(0).toUpperCase()).join("");
    }
};



    const addNote = useCallback(() => {
        const currentDate = new Date();
        const currentTime = currentDate.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
        const currentShowDate = currentDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
        const newNote = {
            time: currentTime,
            date: currentShowDate,
            note: noteText,
        };
        setNotes((prevNotes) => [...prevNotes, newNote]);

        const updatedNoteHeadings = noteHeadings.map((noteHeading) =>
            noteHeading.name === name
                ? { ...noteHeading, notes: [...noteHeading.notes, newNote] }
                : noteHeading
        );
        setNoteHeadings(updatedNoteHeadings);
        setNoteText("");
        setIsNoteTextEmpty(true);
    }, [name, noteHeadings, noteText, setNoteHeadings]);

    useEffect(() => {
        setNotes(currentGroup.notes);
    }, [currentGroup.notes]);

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(noteHeadings));
    }, [noteHeadings]);

    useEffect(() => {
        function handleKeyPress(e) {
            if (e.key === "Enter") {
                if (noteText.trim() !== "") {
                    addNote();
                }
            }
        }
        window.addEventListener("keydown", handleKeyPress);

        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [addNote, noteText]);

    useEffect(() => {
        setIsNoteTextEmpty(noteText.trim() === "");
    }, [noteText]);

    if (!currentGroup && !isMobile) {
        return <MainPage />;
    }

    return (
        <div className={`${styles.container} ${!hide && isMobile && styles.hidden}`}>
            <div className={styles.header}>
                {isMobile && (
                    <div onClick={() => setHide(isMobile && false)}>
                        <IoMdArrowRoundBack size="1.25rem" />
                    </div>
                )}
                <div>
                    <div className={`${styles.icon} ${styles.iconCircle}`} style={{ backgroundColor: color }}>
                        {generateLetters(name)}
                    </div>
                    <div>{name}</div>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.notes}>
                    {notes && notes.map((note) => (
                        <div className={styles.note} key={nanoid()}>
                            <div className={styles.noteContentBox}>
                                <div className={styles.noteContent}>{note.note}</div>
                                <div className={styles.timestamp}>
                                    {note.date} &nbsp; ● &nbsp; {note.time}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.input}>
                <textarea
                    placeholder="Enter your text here..........."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                ></textarea>
                <div onClick={isNoteTextEmpty ? null : addNote} className={isNoteTextEmpty ? styles.disabled : null}>
                    <BiSolidSend style={{ color: "#001F8B" }} size="1.5rem" />
                </div>
            </div>
        </div>
    );
}

export default RightSide;
