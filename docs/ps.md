`qdb ps`
========

gets status of the database based on the current directory (or path otherwise specified). otherwise, it displays all docker statuses

* [`qdb ps [NAME] [CONFIG]`](#qdb-ps-name-config)

## `qdb ps [NAME] [CONFIG]`

gets status of the database based on the current directory (or path otherwise specified). otherwise, it displays all docker statuses

```
USAGE
  $ qdb ps [NAME] [CONFIG]

ARGUMENTS
  NAME    name of database to check the status of
  CONFIG  [default: .] directory of configuration file

OPTIONS
  -h, --help  show CLI help

ALIASES
  $ qdb status

EXAMPLES
  $ qdb ps
  $ qdb ps path/to/config
```

_See code: [src/commands/ps/index.ts](https://github.com/trulyronak/qudb/blob/v1.0.0/src/commands/ps/index.ts)_
