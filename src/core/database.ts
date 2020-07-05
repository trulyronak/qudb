import execa = require("execa")
import * as path from "path"
import {environmentVariable} from "../utils"
import {safeLoad, safeDump} from "js-yaml"
import {outputFileSync, readFileSync, existsSync} from "fs-extra"
import {cli} from "cli-ux"

class PortMapping {
	hostPort: number;
	containerPort: number;

	constructor(hostPort: number, containerPort: number) {
		this.hostPort = hostPort
		this.containerPort = containerPort
	}

	public toString(): string {
		return `${this.containerPort}:${this.hostPort}`
	}
}

export interface DatabaseConfig {
	name: string;
	type: string;
	exposedPorts?: PortMapping[];
	username: string;
	password: string;
	save: boolean;
	store?: string;
}

export class Database {
	config: DatabaseConfig

	constructor(config: DatabaseConfig, hostPort?: number, containerPort?: number) {
		this.config = config
		if (hostPort) {
			this.config.exposedPorts = this.config.exposedPorts || []
			this.config.exposedPorts.push(new PortMapping(hostPort, containerPort || 5432))
		}
		if (this.config.save) {
			this.config.store = this.config.store || "." // setup default store
			this.config.store = path.resolve(this.config.store)
		}
	}

	private reduceArray(array: any[] | undefined, option: string): string[] {
		if (!array) {
			return []
		}

		const options: string[] = array.reduce((acc, curr) => {
			return acc.concat(curr.toString(), option)
		}, [option])
		options.pop()

		return options
	}

	async start() {
		const args = ["-d"]

		args.push(...this.reduceArray(this.config.exposedPorts, "-p"))
		args.push(...["-e", environmentVariable("postgres_username", this.config.username)])
		args.push(...["-e", environmentVariable("postgres_password", this.config.password)])
		args.push(...["--name", `${this.config.name}`])

		const {stdout, stderr} = await execa("docker", [
			"run",
			...args,
			this.config.type,
		])
		console.error(stderr || "")
		console.error(stdout || "")
	}

	kill() {
		console.log(`stopping ${this.config.name}`)
	}

	/**
	 * Saves the configuration and status of this database
	 * @param {boolean} override - optional parameter to override existing configuration file
	 */
	async save(override = false) {
		try {
			const fileLoc = path.resolve(this.config.store!, "qudb.yaml")
			if (!override && existsSync(fileLoc)) {
				override = await cli.confirm(`There is already a database configuration at ${fileLoc}. Override?`)
				if (!override) {
					return
				}
			}
			outputFileSync(fileLoc, safeDump(this.config))
		} catch (error) {
			console.log(error)
		}
	}

	static async load(dir: string) {
		try {
			const fileLoc = path.resolve(dir, "qudb.yaml")
			const configuration = safeLoad(readFileSync(fileLoc, "utf8")) as DatabaseConfig

			return new Database(configuration)
		} catch (error) {
			console.log(`Could not load configuration file at ${dir}`)
			throw new Error(error)
		}
	}

	static async stop(name: string) {
		let {all} = await execa("docker", ["stop", name])
		console.log(all || `stopped container ${name}`)
		all = (await execa("docker", ["rm", name])).all
		console.log(all || `removed container ${name}`)
	}
}
