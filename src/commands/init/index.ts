import {Command, flags} from "@oclif/command"
import {generateString} from "../../utils"
import {Database, DB_Types, presetFor} from "../../core/database"
import { cli } from 'cli-ux'
import inquirer = require('inquirer')

export default class Init extends Command {
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
			description: "port to expose the database on (identifies where the db is listening and maps it to the desired local port, defaults to db default",
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
			description: "root username for db - defaults to root",
			default: "root",
			dependsOn: ["password"],
		}),
		password: flags.string({
			description: "root password for db - defaults to password",
			default: "password",
			dependsOn: ["username"],
		}),
		force: flags.boolean({
			char: "f",
			description: "override any existing configuration file",
			default: false,
		}),
		data: flags.string({
			char: "v",
			description: "where to store the data in this database — defaults to ./.qudb/data",
			default: "./.qudb/data"
		})
	}

	static args = [{
		name: "database",
		required: false,
		description: "type of database to start. If you'd like more, support can be added easily (file an issue!)",
		options: ["postgres", "mysql", "redis"]
	}, {
		name: "store",
		description: "location where to save data - defaults to current directory",
		default: ".",
	}]

	async run() {
		const {args, flags} = this.parse(Init)
		let type: DB_Types, port = flags.port, data = flags.data

		if (args.database) {
			type = args.database
		} else {
			// time to walk through with the user
			const responses: any = await inquirer.prompt([
				{
					name: 'type',
					message: 'select a db type',
					type: 'list',
					choices: Object.keys(DB_Types).map(type => { return { name: type } }),
				}, 
				{
					name: 'port',
					message: (answers: any) => {
						return `what port should the DB be exposed on? (defaults to ${presetFor(DB_Types[answers.type as DB_Types]).port})`
					},
					default: (answers: any) => {
						return presetFor(DB_Types[answers.type as DB_Types]).port
					},
					type: 'number'
					
				},
				{
					name: 'data',
					message: "where do you want to store the data for this db? (defaults to ./.qudb/data)",
					default: flags.data || "./.qudb/data",
					type: 'input'
				}
			])
			type = responses.type
			port = responses.port
			data = responses.data
		}

		console.log(`creating database "${flags.name}"`)
			const db = new Database({
				name: flags.name,
				type: type,
				username: flags.username,
				password: flags.password,
				save: true,
				store: args.store,
				data: data
			}, port)
			await db.save(flags.force)
	}
}
