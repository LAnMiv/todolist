import { saveTasksInLocalStorageve, getTasksFromLocalStorage } from "./js/localstorage.js";
import { getUniqueForIDTask } from "./js/utils.js";
import { createObservable } from "./js/createObservable.js";
import { renderTasksList } from "./js/render.js";
import variables from "./js/variables.js";

const { addTaskInput, addTaskButton, tabElementsContainer, tabElements, tasksСontent } = variables;

// Создаем наблюдатель состояния с начальным значением
let tasksObservebale = createObservable(getTasksFromLocalStorage());

// Подписываемся на наблюдатель состояния
tasksObservebale.subscribe(renderTasksList);

// Обработчик добавления новой задачи
addTaskButton.addEventListener("click", (event) => {
	const taskText = addTaskInput.value.trim();

	if (taskText) {
		event.preventDefault();

		const newTask = {
			id: getUniqueForIDTask(),
			text: taskText,
			completed: false,
		};

		const newTasksList = [...tasksObservebale.getTasks(), newTask]

		addTaskInput.value = "";

		tasksObservebale.setTasks(newTasksList);
		saveTasksInLocalStorageve(tasksObservebale.getTasks());
	};
});

// Обработчик фильтра задач
tabElementsContainer.addEventListener("click", (event) => {
	const currentActiveTab = event.target.parentElement;

	tabElements.forEach((tab) => {
		tab.classList.remove("active");
	});

	currentActiveTab.classList.add("active");

	let tasksList = [...tasksObservebale.getTasks()];

	tasksObservebale.setTasks(tasksList, currentActiveTab);
});

// Обработчик завершенных/незавершенных задач
tasksСontent.addEventListener("change", (event) => {
	if (event.target.closest(".item__checkbox-complete")) {
		const taskElement = event.target.closest(".tasks__item");
		const inputCheckboxElement = taskElement.querySelector(".item__checkbox-input-complete");
		const taskElementId = taskElement.dataset.idTask;

		const tasksList = [...tasksObservebale.getTasks()];
		const newTasksList = tasksList.map((task) => {
			if (task.id === taskElementId) {
				task.completed = inputCheckboxElement.checked;
			};

			return task;
		});

		tasksObservebale.setTasks(newTasksList);
		saveTasksInLocalStorageve(tasksObservebale.getTasks());
	};
});

// Обработчик удаления задачи
tasksСontent.addEventListener("click", (event) => {
	if (event.target.closest(".item__button-remove")) {
		const taskElement = event.target.closest(".tasks__item");
		const taskElementId = taskElement.dataset.idTask;

		const tasksList = [...tasksObservebale.getTasks()];

		const newTasksList = tasksList.filter((item) => {
			if (item.id !== taskElementId) {
				return item;
			}
		})

		tasksObservebale.setTasks(newTasksList);
		saveTasksInLocalStorageve(tasksObservebale.getTasks());
	};
});

// Рендер списка задач при первом запуске приложения
document.addEventListener("DOMContentLoaded", () => {
	const tasksList = [...tasksObservebale.getTasks()];
	tasksObservebale.setTasks(tasksList);
});