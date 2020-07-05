import {Command, flags} from "@oclif/command"
import {generateString} from "../../utils"
import {Database} from "../../core/database"

export default class Start extends Command {
	static description = "gets status of the database based on the current directory (or path otherwise specified). otherwise, it displays all docker statuses"

	static examples = [
		"$ qdb ps",
		"$ qdb ps path/to/config",
	]

	static flags = {
		help: flags.help({char: "h"}),
	}

	static args = [{
		name: "name",
		required: false,
		description: "name of database to check the status of",
	}, {
		name: "config",
		default: ".",
		description: "directory of configuration file",
	}]

	async run() {
		const {args, flags} = this.parse(Start)

		let dbName: string = args.name

		if (!args.name) {
			const db = await Database.load(args.config)
			dbName = db.config.name
		}

		await Database.status(dbName)
	}
}
