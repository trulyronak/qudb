import {Command, flags} from "@oclif/command"
import {generateString} from "../../utils"
import {Database} from "../../core/database"

export default class Start extends Command {
	static description = "creates a database configuration file"

	static examples = [
		"$ qdb save postgres <optional_path_to_directory_to_save_config>",
	]

	static flags = {
		help: flags.help({char: "h"}),
		tail: flags.boolean({
			char: "t",
			description: "follow output as it happens",
		}),
		port: flags.integer({
			char: "p",
			description: "port to expose the database on (identifies where the db is listening and maps it to the desired local port",
		}),
		network: flags.string({
			description: "docker network to connect db to",
		}),
		name: flags.string({
			description: "the name to give this database - autogenerates one for you otherwise",
			default: generateString(),
		}),
		env: flags.string({
			char: "e",
			description: "environment variables to pass into the db",
		}),
		username: flags.string({
			char: "u",
			description: "root username for db - defaults to root",
			default: "root",
			dependsOn: ["password"],
		}),
		password: flags.string({
			char: "p",
			description: "root password for db - defaults to password",
			default: "password",
			dependsOn: ["username"],
		}),
		force: flags.boolean({
			char: "f",
			description: "override any existing configuration file",
			default: false,
		}),
	}

	static args = [{
		name: "database",
		required: true,
		description: "type of database to start (postgres | mysql | etc)",
	}, {
		name: "store",
		description: "location where to save data - defaults to current directory",
		default: ".",
	}]

	async run() {
		const {args, flags} = this.parse(Start)

		console.log(`creating database "${flags.name}"`)
		const db = new Database({
			name: flags.name,
			type: args.database,
			username: flags.username,
			password: flags.password,
			save: true,
			store: args.store,
		}, flags.port)
		await db.save(flags.force)
	}
}
