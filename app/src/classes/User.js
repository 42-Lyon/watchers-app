// login: { type: String, required: true, unique: true },
// firstname: { type: String , required: true },
// lastname: { type: String, required: true },
// image_url: { type: String, required: true },
// is_staff: { type: Boolean, default: false },
// nb_watch: { type: Number, default: 0 },
// last_watch: { type: Date, default: null },
// groups: [{ type: String }]

import config from "config";
import Exam from "./Exam";


export default class User {
	
	constructor(user, updateFunction, deleteFunction) {
		this._id = user._id;
		this.login = user.login;
		this.firstname = user.firstname;
		this.lastname = user.lastname;
		this.image_url = user.image_url;
		this.is_staff = user.is_staff;
		this.nb_watch = user.nb_watch;
		this.last_watch = user.last_watch;
		this.groups = user.groups;
		this.logs = user.logs ?? [];
		this.exams = user.exams ?? [];

		this.updateFunction = updateFunction;
		this.deleteFunction = deleteFunction;
	}

	async delete(){
		const response = await fetch(`${config.apiUrl}/users/${this.login}`, {
			method: 'DELETE',
			credentials: 'include'
		});
		if (response.ok)
			if (this.deleteFunction) this.deleteFunction(this._id);
		return response;
	}

	async update(user) {
		const response = await fetch(`${config.apiUrl}/users/${this.login}`, {
			method: 'PATCH',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});
		if (response.ok) {
			const user = await response.json();
			for (const key in user) {
				this[key] = user[key];
			}
			if (this.updateFunction) this.updateFunction(this);
		}
		return response;
	}

	async fetchExams() {
		const response = await fetch(`${config.apiUrl}/users/${this.login}/exams`, {
			credentials: 'include'
		});
		if (response.ok) {
			const data = await response.json();
			this.exams = data.map(e => new Exam(e, this.updateFunction, this.deleteFunction));
			if (this.updateFunction) this.updateFunction(this);
		}
		return response;
	}

	async fetchLogs() {
		const response = await fetch(`${config.apiUrl}/logs?query[user]=${this.login}`, {
			credentials: 'include'
		});
		if (response.ok) {
			const data = await response.json();
			this.logs = data;
			if (this.updateFunction) this.updateFunction(this);
		}
		return response;
	}

}