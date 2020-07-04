import {Command, flags} from "@oclif/command"
import {generateString} from "../../utils"
import {Database} from "../../core/database"

export default class Start extends Command {
	static description = "starts up a database"

	static examples = [
		"$ qdb start postgres",
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
		save: flags.boolean({
			char: "s",
			description: "save data",
		}),
		store: flags.boolean({
			description: "location where to save data - defaults to ~/.qudb",
			dependsOn: ["save"],
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
	}

	static args = [{
		name: "database",
		required: true,
		description: "type of database to start (postgres | mysql | etc)",
	}]

	async run() {
		const {args, flags} = this.parse(Start)

		const db = new Database({
			name: flags.name,
			type: args.database,
			username: flags.username,
			password: flags.password,
		}, flags.port)

		db.start()
	}
}
