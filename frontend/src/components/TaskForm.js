import { useState } from "react";

export default function TaskForm({ onAdd }) {
	const [taskName, setTaskName] = useState("");
	function handleSubmit(ev) {
		ev.preventDefault();
		onAdd(taskName);
		setTaskName("");
	}
	return (
		<form className="task-form" onSubmit={handleSubmit}>
			<input
				type="text"
				value={taskName}
				onChange={(ev) => setTaskName(ev.target.value)}
				placeholder="Your next task..."
			/>
			<button>Add</button>
		</form>
	);
}
