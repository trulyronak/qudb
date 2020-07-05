import {Command, flags} from "@oclif/command"
import {Database} from "../../core/database"

export default class Start extends Command {
	static description = "starts up a database"

	static examples = [
		"$ qdb stop fluffy-flamingo",
	]

	static flags = {
		help: flags.help({char: "h"}),
	}

	static args = [{
		name: "name",
		required: false,
		description: "name of database to stop",
	}, {
		name: "store",
		description: "location where to save data - defaults to current directory",
		default: ".",
	}]

	async run() {
		const {args} = this.parse(Start)
		if (args.name) {
			await Database.stop(args.name)
		} else {
			const db = await Database.load(args.store)
			await Database.stop(db.config.name)
		}
	}
}
