// Функция наблюдатель за состоянием задач
export const createObservable = (initialState = []) => {
	let state = {
		tasksList: initialState,
		currentActiveTab: null
	};
	let observers = [];

	const notify = () => {
		observers.forEach((observer) => observer(state));
	};

	return {
		subscribe: (observer) => {
			observers = [...observers, observer];
		},
		unsubscribe: (observer) => {
			observers = observers.filter((observ) => observ !== observer)
		},
		setTasks: (newTasksList, currentActiveTab = state.currentActiveTab) => {
			state.tasksList = newTasksList;
			state.currentActiveTab = currentActiveTab;
			notify();
		},
		getTasks: () => state.tasksList
	};
};