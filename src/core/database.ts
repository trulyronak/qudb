import execa = require("execa")
import {environmentVariable} from "../utils"

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
}

export class Database {
	config: DatabaseConfig

	constructor(config: DatabaseConfig, hostPort?: number, containerPort?: number) {
		this.config = config

		if (hostPort) {
			this.config.exposedPorts = this.config.exposedPorts || []
			this.config.exposedPorts.push(new PortMapping(hostPort, containerPort || 5432))
		}
	}

	private reduceArray(array: any[] | undefined, option: string): string[] {
		if (!array) {
			return [""]
		}

		const options: string[] = array.reduce((acc, curr) => {
			return acc.concat(curr.toString(), option)
		}, [option])
		options.pop()

		return options
	}

	async start() {
		console.log(`starting ${this.config.name}`)
		const {all} = await execa("docker", [
			"run",
			"-d",
			"--name",
			this.config.name,
			...this.reduceArray(this.config.exposedPorts, "-p"),
			"-e",
			environmentVariable("postgres_username", this.config.username),
			"-e",
			environmentVariable("postgres_password", this.config.password),
			this.config.type,
		])
		console.log(all)
	}

	kill() {
		console.log(`stopping ${this.config.name}`)
	}

	static async stop(name: string) {
		const {all} = await execa("docker", ["stop", name])
		console.log(all)
	}
}
