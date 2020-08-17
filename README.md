qudb
====

quickly start and manage databases

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/qudb.svg)](https://npmjs.org/package/qudb)
[![Downloads](https://img.shields.io/npm/dt/qudb.svg)](https://npmjs.org/package/qudb)
[![License](https://img.shields.io/npm/l/qudb.svg)](https://github.com/trulyronak/qudb/blob/master/package.json)

### individual command reference

1. [init](docs/init.md)
2. [start](docs/start.md)
3. [status / ps](docs/ps.md)
4. [help](docs/help.md)

### installation

QUDB can be installed by `npm`, or if you don't want to install it, it can be used with `npx`.

		npm install -g qudb
		qdb --help
		
		# no install
		npx qudb --help # replace qdb with npx qudb

### usage

```
# start up a postgres database
qdb start postgres

# start up a postgres database and see whats happening
qdb start postgres

# see running databases
qudb ps # qdb status also works

# start a database on a specific port
qdb start postgres -p 3000

# start a database on a specific network
qdb start postgres --network amazing

# start a database and save data in a specific dir (defaults to ./qudb/data)
qdb start postgres --data path/to/dir

# start a database with a specific name
qudb start postgres --name fantastic

# kill a database (terminates process, does not mess with data)
qudb stop <name>

# nuke a database (no data saved, db stopped, config stays)
qudb nuke <name>

# start a database with credentials
qudb start postgres -u root -p securityismypassion

# start a database but pass in environment variables
qudb start postgres -e "amazing=true"

```

### why this exists

- half the projects on the internet assume you have mongo or postgres or mysql or something setup and running
- legit no one likes to have that on their computer, even less people really want to clean out their databases or keep them up to date or keep them installed


### solution

- use docker to make any db you need, using volumes stored at a consistent location to allow for persistence
- allow for temporary development sessions, where `qudb` will save your data until you want to erase it or whatever


### qudb File

You can also save credentials in a folder so you don't need to remember a name

qudb.yaml

```yaml
name: my_db
type: postgres | redis | mysql (file an issue for more types!
username: root
password: password
save: true
store: path to qudb file directory
data: ./.qudb/data # default
exposedPorts:
  - hostPort: 5432
    containerPort: 5432
```

Now, you can streamline your commands - no more name needed

```
qudb start
qudb stop
qudb status
```


### wait, isn't this just a wrapper for docker?

yes indeed! I'm just lazy of looking up the *right* docker command for each db type, and it's getting real frustrating
