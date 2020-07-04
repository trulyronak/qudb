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
		required: true,
		description: "name of database to stop",
	}]

	async run() {
		const {args} = this.parse(Start)

		Database.stop(args.name)
	}
}
