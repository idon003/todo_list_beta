import "./App.css";
import TaskForm from "./components/TaskForm";
import Task from "./components/Task";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
	const [tasks, setTasks] = useState([]);
	const HOST = "http://127.0.0.1:8000/api/";
	useEffect(() => {
		axios
			.get(HOST)
			.then((response) => {
				setTasks(response.data);
			})
			.catch((error) => {
				console.error("Error fetching todos:", error);
			});
	}, []);
	function addTask(name) {
		axios
			.post(HOST, { name: name, done: false })
			.then((response) => {
				setTasks((prevTasks) => [...prevTasks, response.data]);
			})
			.catch((error) => {
				console.error("Error adding task:", error);
			});
	}
	function updateComplete(index, done) {
		const task = tasks[index];
		axios
			.put(`${HOST}${task.id}/`, { ...task, done: done })
			.then((response) => {
				const updatedTasks = [...tasks];
				updatedTasks[index] = response.data;
				setTasks(updatedTasks);
			})
			.catch((error) => {
				console.error("Error updating task:", error);
			});
	}
	function removeTask(index) {
		const task = tasks[index];
		axios
			.delete(`${HOST}${task.id}/`)
			.then(() => {
				setTasks((prevTasks) =>
					prevTasks.filter((_, taskIndex) => index !== taskIndex)
				);
			})
			.catch((error) => {
				console.error("Error removing task:", error);
			});
	}
	function renameTask(name, index) {
		const task = tasks[index];
		axios
			.put(`${HOST}${task.id}/`, { ...task, name: name })
			.then((response) => {
				const updatedTasks = [...tasks];
				updatedTasks[index] = response.data;
				setTasks(updatedTasks);
			})
			.catch((error) => {
				console.error("Error renaming task:", error);
			});
	}
	return (
		<div className="card">
			<main>
				<TaskForm onAdd={addTask} />
				{tasks.map((task, index) => (
					<Task
						{...task}
						onToggle={(done) => updateComplete(index, done)}
						onTrash={() => removeTask(index)}
						onRename={(name) => renameTask(name, index)}
					/>
				))}
			</main>
		</div>
	);
}

export default App;
