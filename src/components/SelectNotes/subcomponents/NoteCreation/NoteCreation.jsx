import React, { useContext, useEffect, useState, useRef } from "react";
import styles from "../../SelectNotes.module.css";

import { FaPlus } from "react-icons/fa";
import { NotesContext } from "../../../../context/NoteContext";

function NoteCreation() {
	const { modal, toggleModal, setNoteHeadings } = useContext(NotesContext);
	function randomLetters(s) {
		if (!s) {
			return "NA";
		}
	
		const words = s.split(" ");
		let letters = "";
	
		if (words.length === 1) {
			letters = words[0].charAt(0).toUpperCase();
		} else if (words.length === 2) {
			letters = words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
		} else if (words.length >= 3) {
			letters = words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
		}
	
		return letters;
	}
	
	const [grpName, setGrpName] = useState("");
	const [selectedColor, setSelectedColor] = useState("");
	const [error, setError] = useState(false);
	const tempColor = useRef();

	const colors = [
		"#B38BFA",
		"#FF79F2",
		"#43E6FC",
		"#F19576",
		"#0047FF",
		"#6691FF",
	];

	const addNote = () => {
		const letters = randomLetters(grpName);
		if (grpName && selectedColor) {
			setNoteHeadings((prevNoteHeadings) => [
				...prevNoteHeadings,
				{
					name: grpName,
					color: selectedColor,
					letters: letters,
					notes: [],
				},
			]);
			toggleModal();
			setGrpName("");
			setSelectedColor("");
			setError(false);
		} else {
			setError(true);
		}
	};

	useEffect(() => {
		if (modal) {
			const handleKeyDown = (event) => {
				if (event.key === "Escape") {
					setGrpName("");
					setSelectedColor("");
					setError(false);
					toggleModal();
				}
			};

			window.addEventListener("keydown", handleKeyDown);

			return () => {
				window.removeEventListener("keydown", handleKeyDown);
			};
		}
	}, [modal, toggleModal]);

	const handleClickOutside = (event) => {
		if (event.target.classList.contains(styles.modal)) {
			toggleModal();
			setGrpName("");
			setSelectedColor("");
			setError(false);
		}
	};

	return (
		<>
			<button className={styles.plusButton} onClick={toggleModal}>
				{" "}
				<div className={styles.plusCircle}>
                    <FaPlus size="1em" />
                </div>
			</button>
			{modal && (
				<div className={styles.modal} onClick={handleClickOutside}>
					<div className={styles.modalContent}>
						<h3>Create New group</h3>
						<div>
							<label className={styles.label}>Group Name</label>
							<input
								type="text"
								onChange={(e) => setGrpName(e.target.value)}
								placeholder="Enter group name"
							/>
						</div>
						<div className={styles.colorComp}>
							<label className={styles.label}>Choose colour</label>
							<div>
								{colors.map((color) => {
									const colorId = color.replace("#", "");
									return (
										<div
											id={`${colorId}`}
											key={colorId}
											onClick={() => {
												setSelectedColor(color);
												tempColor.current = color;
											}}
											className={`${styles.color}  ${
												selectedColor && styles.selectedColor
											} ${tempColor.current === color && styles.selected}`}
											style={{ backgroundColor: color }}
										></div>
									);
								})}
							</div>
						</div>
						<button onClick={addNote}>Create</button>
						{error && (
							<label
								id="error"
								className="hidden"
								style={{ marginTop: "-.5rem" }}
							>
								Please complete all fields
							</label>
						)}
					</div>
				</div>
			)}
		</>
	);
}

export default NoteCreation;