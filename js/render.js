import { createTaskElement } from "./createTask.js";
import { filterTaskList } from "./utils.js";
import variables from "./variables.js";

const { tasksСontent } = variables;

export const renderTasksList = ({ tasksList, currentActiveTab }) => {
	tasksСontent.innerHTML = "";

	if (tasksList.length === 0) {
		tasksСontent.innerHTML = '<p class="tasks__content-message">No todos...</p>';
	};

	let tasks = [...tasksList];

	if (currentActiveTab && currentActiveTab.dataset.tab !== "allTasks") {
		tasks = filterTaskList(tasks, currentActiveTab);
	};

	const tasksListElement = document.createElement("ul");
	tasksListElement.classList.add("tasks__list");
	tasksСontent.append(tasksListElement);

	const tasksElements = tasks.map((task) => createTaskElement(task)).join("");
	tasksListElement.innerHTML = tasksElements;
};