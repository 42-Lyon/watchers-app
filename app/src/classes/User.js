// login: { type: String, required: true, unique: true },
// firstname: { type: String , required: true },
// lastname: { type: String, required: true },
// image_url: { type: String, required: true },
// is_staff: { type: Boolean, default: false },
// nb_watch: { type: Number, default: 0 },
// last_watch: { type: Date, default: null },
// groups: [{ type: String }]


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

		this.updateFunction = updateFunction;
		this.deleteFunction = deleteFunction;
	}

}