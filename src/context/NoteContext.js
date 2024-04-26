import { createContext, useState, useEffect } from "react";

export const NotesContext = createContext(null);

export const NotesProvider = (props) => {


    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal((prev) => !prev);
    const [noteHeadings, setNoteHeadings] = useState(
        localStorage.getItem("notes")
            ? JSON.parse(localStorage.getItem("notes"))
            : ""
    );
    const [hide, setHide] = useState(false);
    const [currentGroup, setCurrentGroup] = useState("");

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth > 768) {
                setHide(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setCurrentGroup(false);
            }
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("keydown", handleEscape);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("keydown", handleEscape);
        };
    }, []);



    return <NotesContext.Provider
        value={{
            modal,
            toggleModal,
            noteHeadings,
            setNoteHeadings,
            hide,
            setHide,
            isMobile,
            setIsMobile,
            currentGroup,
            setCurrentGroup,
        }}
    >
        {props.children}
    </NotesContext.Provider>;
};