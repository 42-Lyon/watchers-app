import config from "config";
import User from "./User";

export default class Watcher extends User {

	constructor(watcher, updateFunction, deleteFunction, exam) {
		super(watcher, updateFunction, deleteFunction);
		this.exam = exam;
	}

	async unregister() {
		const response = await fetch(`${config.apiUrl}/exams/${this.exam._id}/watchers/${this.login}`, {
			method: 'DELETE',
			credentials: 'include',
		});
		if (response.ok) {
			this.exam.setWatchers(await response.json());
			if (this.exam.updateFunction) this.exam.updateFunction(this.exam);
			if (this.updateFunction) this.updateFunction(this);
		}
		return response;
	}

}