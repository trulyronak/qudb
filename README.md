qudb
====

quickly start and manage databases

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/qudb.svg)](https://npmjs.org/package/qudb)
[![Downloads/week](https://img.shields.io/npm/dw/qudb.svg)](https://npmjs.org/package/qudb)
[![License](https://img.shields.io/npm/l/qudb.svg)](https://github.com/trulyronak/qudb/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
* [start up a postgres database](#start-up-a-postgres-database)
* [start up a postgres database and see whats happening](#start-up-a-postgres-database-and-see-whats-happening)
* [see running databases](#see-running-databases)
* [start a database on a specific port](#start-a-database-on-a-specific-port)
* [start a database on a specific network](#start-a-database-on-a-specific-network)
* [start a database but preserve data](#start-a-database-but-preserve-data)
* [start a database with a specific name](#start-a-database-with-a-specific-name)
* [kill a database (terminates process, does not mess with data)](#kill-a-database-terminates-process-does-not-mess-with-data)
* [delete data for a database (fails if db is still running)](#delete-data-for-a-database-fails-if-db-is-still-running)
* [nuke a database (no data saved, db stopped)](#nuke-a-database-no-data-saved-db-stopped)
* [start a database with credentials](#start-a-database-with-credentials)
* [start a database but pass in environment variables](#start-a-database-but-pass-in-environment-variables)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g qudb
$ qdb COMMAND
running command...
$ qdb (-v|--version|version)
qudb/0.2.0 darwin-x64 node-v14.2.0
$ qdb --help [COMMAND]
USAGE
  $ qdb COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`qdb hello [FILE]`](#qdb-hello-file)
* [`qdb help [COMMAND]`](#qdb-help-command)
* [`qdb init DATABASE [STORE]`](#qdb-init-database-store)
* [`qdb start [DATABASE]`](#qdb-start-database)
* [`qdb stop [NAME] [STORE]`](#qdb-stop-name-store)

## `qdb hello [FILE]`

describe the command here

```
USAGE
  $ qdb hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ qdb hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/trulyronak/qudb/blob/v0.2.0/src/commands/hello.ts)_

## `qdb help [COMMAND]`

display help for qdb

```
USAGE
  $ qdb help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.1.0/src/commands/help.ts)_

## `qdb init DATABASE [STORE]`

creates a database configuration file

```
USAGE
  $ qdb init DATABASE [STORE]

ARGUMENTS
  DATABASE  type of database to start (postgres | mysql | etc)
  STORE     [default: .] location where to save data - defaults to current directory

OPTIONS
  -e, --env=env            environment variables to pass into the db
  -f, --force              override any existing configuration file
  -h, --help               show CLI help
  -p, --password=password  [default: password] root password for db - defaults to password

  -p, --port=port          port to expose the database on (identifies where the db is listening and maps it to the
                           desired local port

  -t, --tail               follow output as it happens

  -u, --username=username  [default: root] root username for db - defaults to root

  --name=name              [default: K60cs97E26] the name to give this database - autogenerates one for you otherwise

  --network=network        docker network to connect db to

EXAMPLE
  $ qdb save postgres <optional_path_to_directory_to_save_config>
```

_See code: [src/commands/init/index.ts](https://github.com/trulyronak/qudb/blob/v0.2.0/src/commands/init/index.ts)_

## `qdb start [DATABASE]`

starts up a database

```
USAGE
  $ qdb start [DATABASE]

ARGUMENTS
  DATABASE  type of database to start (postgres | mysql | etc)

OPTIONS
  -e, --env=env            environment variables to pass into the db
  -f, --force              override any existing configuration file
  -h, --help               show CLI help
  -p, --password=password  [default: password] root password for db - defaults to password

  -p, --port=port          port to expose the database on (identifies where the db is listening and maps it to the
                           desired local port

  -s, --save               save data

  -t, --tail               follow output as it happens

  -u, --username=username  [default: root] root username for db - defaults to root

  --load=load              [default: .] directory where your qudb.yaml file is located

  --name=name              [default: yf9v4bHXqe] the name to give this database - autogenerates one for you otherwise

  --network=network        docker network to connect db to

  --store=store            location where to save data - defaults to current directory

EXAMPLE
  $ qdb start postgres
```

_See code: [src/commands/start/index.ts](https://github.com/trulyronak/qudb/blob/v0.2.0/src/commands/start/index.ts)_

## `qdb stop [NAME] [STORE]`

starts up a database

```
USAGE
  $ qdb stop [NAME] [STORE]

ARGUMENTS
  NAME   name of database to stop
  STORE  [default: .] location where to save data - defaults to current directory

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ qdb stop fluffy-flamingo
```

_See code: [src/commands/stop/index.ts](https://github.com/trulyronak/qudb/blob/v0.2.0/src/commands/stop/index.ts)_
<!-- commandsstop -->

qudb (qdb)
====

quickly start and manage databases

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/qudb.svg)](https://npmjs.org/package/qudb)
[![Downloads/week](https://img.shields.io/npm/dw/qudb.svg)](https://npmjs.org/package/qudb)
[![License](https://img.shields.io/npm/l/qudb.svg)](https://github.com/trulyronak/qudb/blob/master/package.json)



`qdb` if the command exists, otherwise it'll be `quickdb` or something

- update - neither exists, we're now `qudb`
- i hate this command, i'll be providing a way for you to just use qdb when you've installed it

### problem

- half the projects on the internet assume you have mongo or postgres or mysql or something setup and running
- legit no one likes to have that on their computer, even less people really want to clean out their databases or keep them up to date or keep them installed



### solution

- use docker to make any db you need, using volumes stored at a consistent location to allow for persistence
- allow for temporary development sessions, where `qudb` will save your data until you want to erase it or whatever


### usage

```
# start up a postgres database
qudb start postgres:dockerTag # defaults to latest

# start up a postgres database and see whats happening
qudb start postgres --tail

# see running databases
qudb ps # returns the names

# start a database on a specific port
qudb start postgres -p 3000

# start a database on a specific network
qudb start postgres --network amazing

# start a database but preserve data
qudb start postgres --save-data

# start a database with a specific name
qudb start postgres --name fantastic

# kill a database (terminates process, does not mess with data)
qudb kill <name>

# delete data for a database (fails if db is still running)
qudb clear <name>

# nuke a database (no data saved, db stopped)
qudb nuke <name>

# start a database with credentials
qudb start postgres -u root -p securityismypassion

# start a database but pass in environment variables
qudb start postgres -e "amazing=true"

```

### qudb File

You can also save credentials in a folder so you don't need to remember a name

qudb.yaml

```yaml
name: my_db
type: postgres:latest
username: $USERNAME # suports environment variables, because more files == joy
password: $PASSWORD
store: repo | home # repo means we'll save the database information in this folder, home means we'll store it in ~/.qudb like we do everything else
env:
 - VARIABLE=VALUE # pass in all data you want here
```

Now, you can streamline your commands - no more name needed

```
qudb start
qudb kill 
qudb clear
qudb start
qudb nuke
```


### wait, isn't this just a wrapper for docker?

yes indeed! I'm just lazy of looking up the *right* docker command for each db type, and it's getting real frustrating
