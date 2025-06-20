import { handleCheckbox, handleRemoveButton } from "../main.js";
import { replaceTaskTextStyle } from "./utils.js";

// Функция создания разметки элемента задачи
export const createTaskElement = (task) => {
	const itemElement = document.createElement("li");
	itemElement.classList.add("tasks__item", "item");
	itemElement.dataset.idTask = `${task.id}`;
	itemElement.innerHTML = `
		<label class="item__checkbox-complete" title="Complete/active">
			<input class="item__checkbox-input-complete visually-hidden" type="checkbox">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M12 21C14.0822 21 16.1 20.278 17.7095 18.9571C19.3191 17.6362 20.4209 15.798 20.8271 13.7558C21.2333 11.7136 20.9188 9.59376 19.9373 7.75743C18.9558 5.9211 17.3679 4.48191 15.4442 3.68508C13.5205 2.88826 11.38 2.78311 9.38744 3.38754C7.3949 3.99197 5.67358 5.26858 4.51677 6.99987C3.35997 8.73115 2.83925 10.81 3.04334 12.8822C3.24743 14.9543 4.1637 16.8916 5.63604 18.364"
					stroke-width="2" stroke-linecap="round" />
				<path
					d="M16 10L12.402 14.3175C11.7465 15.1042 11.4187 15.4976 10.9781 15.5176C10.5375 15.5375 10.1755 15.1755 9.45139 14.4514L8 13"
					stroke-width="2" stroke-linecap="round" />
			</svg>
		</label>
		<p>${task.text}</p>
		<button class="item__button-remove button" type="button" title="Delete">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z"
					stroke-width="2" stroke-linecap="round" />
				<path d="M9 9L15 15" stroke-width="2" stroke-linecap="round" />
				<path d="M15 9L9 15" stroke-width="2" stroke-linecap="round" />
			</svg>
			<span class="visually-hidden">Remove tasks</span>
		</button>`;

	const inputCheckbox = itemElement.querySelector(".item__checkbox-input-complete");
	inputCheckbox.checked = task.completed;

	const taskTextElement = itemElement.querySelector("p");
	replaceTaskTextStyle(inputCheckbox.checked, taskTextElement)

	inputCheckbox.addEventListener("change", handleCheckbox);

	const removeButton = itemElement.querySelector(".item__button-remove");
	removeButton.addEventListener("click", handleRemoveButton);

	return itemElement;
};