#!/bin/bash

cd ${0%/*}
set -e

function devDo() {
    docker-compose -f docker/docker-compose.dev.yml -p CHANGEME_dev "$@"
}

function prodDo() {
    docker-compose -f docker/docker-compose.prod.yml -p CHANGEME_prod "$@"
}

function devUsage() {
    echo "usage: $0 dev <command> [args]"
    echo
    echo "Manage the dev environment."
    echo
    echo " clean            Clears the database."
    echo " help             Displays this help message."
    echo " makemigrations   Generates new migrations."
    echo " migrate          Applies migrations to the database."
    echo " run              Runs a command in the dev environment."
    echo " start            Starts the dev environment."
    echo " stop             Stops all the docker containers."
}

function prodUsage() {
    echo "usage: $0 prod <command> [args]"
    echo
    echo "Manage the prod environment."
    echo
    echo " build        Builds the docker containers."
    echo " clean        Clears the database."
    echo " help         Displays this help message."
    echo " migrate      Applies migrations to the database."
    echo " run          Runs a command in the prod environment."
    echo " start        Starts the prod environment."
    echo " stop         Stops all the docker containers."
}

function usage() {
    echo "usage: $0 <command> [args]"
    echo
    echo "commands:"
    echo " dev      runs the docker dev environment"
    echo " prod     runs the docker production environment"
    echo " help     display this help text."
}

case "$1" in
dev)
    shift
    cmd=$1

    if [[ $# > 0 ]]; then
        shift
    fi

    case "$cmd" in
    "" | start)
        mkdir -p dist/client dist/django

        devDo up -d db
        devDo up --build
        ;;
    run)
        devDo run --rm django $@
        ;;
    clean)
        echo "Are you sure? [y/n]"
        read answer

        if [[ $answer = "y" ]]; then
            devDo down
        fi
        ;;
    stop)
        devDo stop
        ;;
    makemigrations)
        devDo up -d db
        devDo run --rm django poetry run ./manage.py makemigrations $@
        ;;
    migrate)
        devDo up -d db
        devDo run --rm django /bin/sh -c "poetry run ./wait_for_postgres.py \
            && poetry run ./manage.py migrate $@"
        ;;
    help | "-h" | "--help")
        devUsage
        ;;
    *)
        echo "Unknown command '$1'"
        devUsage
        exit 1
        ;;
    esac
    ;;

prod)
    shift
    cmd=$1

    if [[ $# > 0 ]]; then
        shift
    fi

    case "$1" in
    "" | start)
        mkdir -p dist/client dist/server
        prodDo up -d db django nginx
        ;;
    build)
        # Start the database.
        prodDo up -d db

        # Build the client assets.
        prodDo up --build parcel

        # Collect django static files.
        prodDo run --rm -v "$(pwd)/dist/django:/app/dist/" django \
            poetry run ./manage.py collectstatic --no-input -v 0

        # Build nginx
        prodDo build nginx
        ;;
    clean)
        echo "Are you sure? [y/n]"
        read answer

        if [[ $answer = "y" ]]; then
            prodDo down
        fi
        ;;
    migrate)
        prodDo up -d db

        prodDo run --rm django /bin/sh -c "poetry run ./wait_for_postgres.py \
            && poetry run ./manage.py migrate $@"
        ;;
    run)
        prodDo run --rm django $@
        ;;
    stop)
        prodDo stop
        ;;
    help | "-h" | "--help")
        prodUsage
        ;;
    *)
        echo "Unknown command '$1'"
        prodUsage
        exit 1
        ;;
    esac
    ;;
"" | help | "-h" | "--help")
    usage
    ;;
*)
    echo "Unknown command '$1'"
    usage
    exit 1
    ;;
esac
