// Функция для получения уникального ID
export const getUniqueForIDTask = () => `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

// Функция смены стиля текста для активных/завершенных задач
export const replaceTaskTextStyle = (taskState) => {
	if (taskState) {
		return "text-decoration: line-through; opacity: 0.7;"
	} else {
		return "text-decoration: none; opacity: 1;"
	};
};

// Функция фильтр задач все/активные/завершенные
export const filterTaskList = (tasks, currentActiveTab) => {
	if (currentActiveTab.dataset.tab === "activeTasks") {
		const filterTasks = tasks.filter(task => task.completed === false);
		
		return filterTasks;
	};

	if (currentActiveTab.dataset.tab === "completedTasks") {
		const filterTasks = tasks.filter(task => task.completed !== false);
		
		return filterTasks;
	};
};