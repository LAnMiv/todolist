
import { saveTasksInLocalStorageve, getTasksFromLocalStorage } from "./js/localstorage.js";
import { getUniqueForIDTask, replaceTaskTextStyle, filterTaskList } from "./js/utils.js";
import { renderTasksList } from "./js/render.js";
import variables from "./js/variables.js";

const { addTaskInput, addTaskButton, tabElementsContainer, tabElements, tabActiveButton } = variables;

export let tasksList = getTasksFromLocalStorage();
let currentActiveTab = tabActiveButton;

addTaskButton.addEventListener("click", (event) => {
	const taskText = addTaskInput.value.trim();

	if (taskText) {
		event.preventDefault();

		const newTask = {
			id: getUniqueForIDTask(),
			text: taskText,
			completed: false,
		};

		tasksList.push(newTask);
		addTaskInput.value = "";
		
		saveTasksInLocalStorageve(tasksList);
		renderTasksList(currentActiveTab, tasksList);
	};
});

tabElementsContainer.addEventListener("click", (event) => {
	const parentTarget = event.target.parentElement;

	tabElements.forEach((tab) => {
		tab.classList.remove("active");
	});

	parentTarget.classList.add("active");
	currentActiveTab = parentTarget;

	renderTasksList(currentActiveTab, tasksList);
});

export const handleCheckbox = (event) => {
	const taskElement = event.target.closest(".tasks__item");
	const taskTextElement = taskElement.querySelector("p");
	const taskElementId = taskElement.dataset.idTask;

	tasksList = tasksList.map((item) => {
		if (item.id === taskElementId) {
			item.completed = event.target.checked;

			replaceTaskTextStyle(event.target.checked, taskTextElement);
		};

		return item;
	});

	saveTasksInLocalStorageve(tasksList);
	renderTasksList(currentActiveTab, tasksList);
};

export const handleRemoveButton = (event) => {
	const taskElement = event.target.closest(".tasks__item");
	const taskElementId = taskElement.dataset.idTask;

	tasksList = tasksList.filter((item) => {
		if (item.id !== taskElementId) {
			return item;
		}
	})

	saveTasksInLocalStorageve(tasksList);
	taskElement.remove();
};

renderTasksList(currentActiveTab, tasksList);