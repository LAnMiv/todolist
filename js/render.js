import { tasksList } from "../main.js";
import { createTaskElement } from "./create-task.js";
import { filterTaskList } from "./utils.js";
import variables from "./variables.js";

const { tasksСontent } = variables;

export const renderTasksList = (currentActiveTab, tasks = tasksList) => {
	tasksСontent.innerHTML = "";

	if (currentActiveTab.dataset.tab !== "allTasks") {
		tasks = filterTaskList(currentActiveTab, tasks);
	};

	if (tasks.length === 0) {
		tasksСontent.innerHTML = '<p class="tasks__content-message">No todos...</p>';
	};

	const tasksListElement = document.createElement("ul");
	tasksListElement.classList.add("tasks__list");
	tasksСontent.append(tasksListElement);

	tasks.forEach((task) => {
		tasksListElement.append(createTaskElement(task));
	});
};