`qdb init`
==========

creates a database configuration file

* [`qdb init [DATABASE] [STORE]`](#qdb-init-database-store)

## `qdb init [DATABASE] [STORE]`

creates a database configuration file

```
USAGE
  $ qdb init [DATABASE] [STORE]

ARGUMENTS
  DATABASE  (postgres|mysql|redis) type of database to start. If you'd like more, support can be added easily (file an
            issue!)

  STORE     [default: .] location where to save data - defaults to current directory

OPTIONS
  -e, --env=env        environment variables to pass into the db
  -f, --force          override any existing configuration file
  -h, --help           show CLI help

  -p, --port=port      port to expose the database on (identifies where the db is listening and maps it to the desired
                       local port, defaults to db default

  -t, --tail           follow output as it happens

  -v, --data=data      [default: ./.qudb/data] where to store the data in this database — defaults to ./.qudb/data

  --name=name          [default: QF5kz8oSFV] the name to give this database - autogenerates one for you otherwise

  --network=network    docker network to connect db to

  --password=password  [default: password] root password for db - defaults to password

  --username=username  [default: root] root username for db - defaults to root

EXAMPLE
  $ qdb save postgres <optional_path_to_directory_to_save_config>
```

_See code: [src/commands/init/index.ts](https://github.com/trulyronak/qudb/blob/v1.0.0/src/commands/init/index.ts)_
