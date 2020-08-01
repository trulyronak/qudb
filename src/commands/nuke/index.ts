import {Command, flags} from "@oclif/command"
import {Database} from "../../core/database"

export default class Nuke extends Command {
	static description = "removes all data and stops the current database"
	
	static examples = [
		"$ qdb nuke",
		"$ qdb nuke path/to/config",
	]

	static flags = {
		help: flags.help({char: "h"}),
	}

	static args = [{
		name: "config",
		default: ".",
		description: "directory of configuration file",
	}]

	async run() {
		const {args} = this.parse(Nuke)

        const db = await Database.load(args.config)
        await Database.stop(db.config.name)
        await db.nuke();
	}
}
