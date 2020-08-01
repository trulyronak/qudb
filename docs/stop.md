`qdb stop`
==========

stops a database

* [`qdb stop [NAME] [STORE]`](#qdb-stop-name-store)

## `qdb stop [NAME] [STORE]`

stops a database

```
USAGE
  $ qdb stop [NAME] [STORE]

ARGUMENTS
  NAME   name of database to stop
  STORE  [default: .] location where to load configuration file from

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ qdb stop fluffy-flamingo
```

_See code: [src/commands/stop/index.ts](https://github.com/trulyronak/qudb/blob/v1.0.0/src/commands/stop/index.ts)_
