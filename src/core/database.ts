import execa = require("execa")
import * as path from "path"
import {environmentVariable} from "../utils"
import {safeLoad, safeDump} from "js-yaml"
import {outputFileSync, readFileSync, existsSync, mkdirpSync, remove} from "fs-extra"
import {cli} from "cli-ux"
import { env } from 'process'
import { string } from '@oclif/command/lib/flags'

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

export enum DB_Types {
	postgres = "postgres",
	mysql = "mysql",
	redis = "redis"
}



export interface DatabaseConfig {
	name: string;
	type: DB_Types;
	exposedPorts?: PortMapping[]; // multiple so we can later support unlimited port mappings
	username: string;
	password: string;
	save: boolean;
	store?: string;
	data: string;
}

interface DB_Preset {
	port: number;
	username: (u: string) => string[];
	password: (p: string) => string[];
	volume: (dataDir: string) => string[];
}

export function presetFor(type: DB_Types): DB_Preset {
	switch(type) {
		case DB_Types.postgres: {
			return {
				port: 5432, 
				username: (usernameValue: string) => {
					return [`-e`, `${environmentVariable("POSTGRES_USERNAME", usernameValue)}`]
				}, password: (passwordValue: string) => {
					return [`-e`, `${environmentVariable("POSTGRES_PASSWORD", passwordValue)}`]
				}, volume: (dataDir: string) => {
					return [`-v`, `${dataDir}:/var/lib/postgresql/data`]
				}
			}
		}
		case DB_Types.mysql: {
			return {
				port: 3306, 
				username: (_: string) => {
					return []
				}, password: (passwordValue: string) => {
					return [`-e`, `${environmentVariable("MYSQL_ROOT_PASSWORD", passwordValue)}`]
				}, volume: (dataDir: string) => {
					return [`-v`,  `${dataDir}:/var/lib/mysql`]
				}
			} 
		}			
		case DB_Types.redis: {
			return {
				port: 6379, 
				username: (_: string) => {
					return []
				}, password: (passwordValue: string) => {
					return [`-e`, `${environmentVariable("REDIS_PASSWORD", passwordValue)}`]
				}, volume: (dataDir: string) => {
					return [`-v`,  `${dataDir}:/data`]
				}
			}
		}
	}
}
	
export class Database {
	config: DatabaseConfig
	preset: DB_Preset

	constructor(config: DatabaseConfig, hostPort?: number, containerPort?: number) {
		this.config = config
		this.preset = presetFor(config.type)

		if (!this.config.exposedPorts) {
			this.config.exposedPorts = [new PortMapping(hostPort || this.preset.port, containerPort || this.preset.port)]
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

	async start(tail: boolean = false) {
		const args: string[] = tail ? [] : ["-d"]
		// create directory if it doesn't exist
		const dataLoc = path.resolve(this.config.data)
		mkdirpSync(dataLoc)
		args.push.apply(args, this.preset.volume(dataLoc))

		args.push(...this.reduceArray(this.config.exposedPorts, "-p"))
		args.push.apply(args, this.preset.username(this.config.username))
		args.push.apply(args, this.preset.password(this.config.password))

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

	async nuke() {
		try {
			await remove(path.resolve(this.config.data))
		} catch (error) {
			console.log(error)
		}
	}

	static async load(dir: string) {
		try {
			const fileLoc = path.resolve(dir, "qudb.yaml")
			const configuration = safeLoad(readFileSync(fileLoc, "utf8")) as DatabaseConfig

			if (configuration.exposedPorts) { // shape exposed ports to fit class
				configuration.exposedPorts = configuration.exposedPorts.map(ports => {
					return new PortMapping(ports.hostPort, ports.containerPort)
				})
			}
			return new Database(configuration)
		} catch (error) {
			console.log(`Could not load configuration file at ${dir}`)
			throw new Error(error)
		}
	}

	static async stop(name: string) {
		let result = await execa("docker", ["stop", name])
		console.log(result.stderr || `stopped container ${name}`)

		result = await execa("docker", ["rm", name])
		console.log(result.stderr || `removed container ${name}`)
	}

	static async status(name: string) {
		const {stdout, stderr}  = await execa.command(`docker ps --filter name=${name}`)
		console.log(stdout)
		console.log(stderr || "")
	}

}
