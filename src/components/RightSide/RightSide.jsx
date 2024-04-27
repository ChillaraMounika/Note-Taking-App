import React, { useContext, useState, useEffect, useCallback } from "react";
import MainPage from "../MainPage/MainPage";
import { NotesContext } from "../../context/NoteContext";
import { IoMdArrowRoundBack } from "react-icons/io";
import styles from "./RightSide.module.css";
import { BiSolidSend } from "react-icons/bi";
import { nanoid } from "nanoid";

function RightSide() {
    const { currentGroup, hide, setHide, isMobile, noteHeadings, setNoteHeadings } = useContext(NotesContext);
    const [noteText, setNoteText] = useState("");
    const [notes, setNotes] = useState([]);
    const [isNoteTextEmpty, setIsNoteTextEmpty] = useState(true);

    useEffect(() => {
        if (currentGroup && currentGroup.notes) {
            setNotes(currentGroup.notes);
        }
    }, [currentGroup]);

    useEffect(() => {
        setIsNoteTextEmpty(noteText.trim() === "");
    }, [noteText]);

    const addNote = useCallback(() => {
        if (!noteText.trim()) return;

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
            noteHeading.name === currentGroup.name
                ? { ...noteHeading, notes: [...noteHeading.notes, newNote] }
                : noteHeading
        );
        setNoteHeadings(updatedNoteHeadings);
        setNoteText("");
        setIsNoteTextEmpty(true);
    }, [noteText, noteHeadings, setNoteHeadings, currentGroup.name]);

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(noteHeadings));
    }, [noteHeadings]);

    useEffect(() => {
        function handleKeyPress(e) {
            if (e.key === "Enter" && !isNoteTextEmpty) {
                addNote();
            }
        }
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [addNote, isNoteTextEmpty]);

    const generateLetters = (groupName) => {
        if (!groupName) return "NA";
        return groupName.split(" ").map((word) => word[0].toUpperCase()).join("");
    };

    if (!noteHeadings || !Array.isArray(noteHeadings)) {
        console.error('Expected noteHeadings to be an array, but got:', noteHeadings);
        return <div>Error: Data is corrupted.</div>;
    }

    if (!currentGroup && !isMobile) {
        return <MainPage />;
    }

    return (
        <div className={`${styles.container} ${!hide && isMobile ? styles.hidden : ""}`}>
            <div className={styles.header}>
                {isMobile && (
                    <div onClick={() => setHide(false)}>
                        <IoMdArrowRoundBack size="1.25rem" />
                    </div>
                )}
                <div className={`${styles.icon} ${styles.iconCircle}`} style={{ backgroundColor: currentGroup.color }}>
                    {generateLetters(currentGroup.name)}
                </div>
                <div>{currentGroup.name}</div>
            </div>

            <div className={styles.content}>
                <div className={styles.notes}>
                    {notes.map((note) => (
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
                    placeholder="Enter your text here..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                ></textarea>
                <div onClick={!isNoteTextEmpty ? addNote : null} className={isNoteTextEmpty ? styles.disabled : ""}>
                    <BiSolidSend style={{ color: "#001F8B" }} size="1.5rem" />
                </div>
            </div>
        </div>
    );
}

export default RightSide;
