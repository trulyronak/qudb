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
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g qudb
$ qdb COMMAND
running command...
$ qdb (-v|--version|version)
qudb/0.0.0 darwin-x64 node-v14.2.0
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

_See code: [src/commands/hello.ts](https://github.com/trulyronak/qudb/blob/v0.0.0/src/commands/hello.ts)_

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