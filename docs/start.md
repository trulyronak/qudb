`qdb start`
===========

starts up a database

* [`qdb start [DATABASE]`](#qdb-start-database)

## `qdb start [DATABASE]`

starts up a database

```
USAGE
  $ qdb start [DATABASE]

ARGUMENTS
  DATABASE  (postgres|mysql|redis) type of database to start (postgres | mysql | redis). If you'd like more, support can
            be added easily (file an issue!)

OPTIONS
  -e, --env=env        environment variables to pass into the db
  -f, --force          override any existing configuration file
  -h, --help           show CLI help

  -p, --port=port      port to expose the database on (identifies where the db is listening and maps it to the desired
                       local port. defaults to exposing the db on its standard output port

  -s, --save           save data

  -t, --tail           follow output as it happens

  -v, --data=data      [default: ./.qudb/data] where to store the data in this database — defaults to ./.qudb/data

  --load=load          [default: .] directory where your qudb.yaml file is located

  --name=name          [default: Rpl4cTIULj] the name to give this database - autogenerates one for you otherwise

  --network=network    docker network to connect db to

  --password=password  [default: password] root password for db - defaults to password

  --store=store        location where to save data - defaults to current directory

  --username=username  [default: root] root username for db - defaults to root

EXAMPLE
  $ qdb start postgres
```

_See code: [src/commands/start/index.ts](https://github.com/trulyronak/qudb/blob/v1.0.0/src/commands/start/index.ts)_
