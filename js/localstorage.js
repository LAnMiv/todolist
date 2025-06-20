const TODOS_KEY = "tasks";

export const saveTasksInLocalStorageve = (tasks) => {
	localStorage.setItem(TODOS_KEY, JSON.stringify(tasks));
};

export const getTasksFromLocalStorage = () => {
	return JSON.parse(localStorage.getItem(TODOS_KEY)) || [];
};