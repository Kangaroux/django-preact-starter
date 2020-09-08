This is a boilerplate project for creating a SPA using Preact with Django and Postgres as the backend.

The project includes a `tasks.sh` script to help with a lot of common tasks.

## Main Dependencies

- Django 3.1
- Django Rest Framework
- Typescript
- Preact
- SASS
- Docker
- Postgres
- nginx

## Quickstart
Search the repo for the text **CHANGEME** and modify as needed.

For development:

```bash
# Apply database migrations
./tasks.sh dev migrate

# Create a superuser (optional). This gives you access to the admin panel at /admin/
./tasks.sh dev run poetry run ./manage.py createsuperuser

# Start the server at http://localhost:8000/
./tasks.sh dev
```

For production:

```bash
# Create prod env file, modify as needed
cp docker/dev.env docker/prod.env

# Apply database migrations
./tasks.sh prod migrate

# Create a superuser
./tasks.sh prod run poetry run ./manage.py createsuperuser

# Build assets
./tasks.sh prod build

# Start the production server at http://localhost:8000/
./tasks.sh prod
```

## Project Structure

```bash
client/         # Typescript, CSS, etc. Compiled with Parcel
dist/           # The output dir for static files to be served
  client/       # Compiled assets from the client/ dir
  django/       # Collected static files from django
docker/         # Docker configs
nginx/          # Nginx config and any static html files
server/         # Django API server
```

## Docker Services

- **db** runs a Postgres container that hosts the site's database
- **django** runs a Django web server. This is only responsible for handling the backend (such as /api/ and /admin/). On startup this container collects internal Django static files to `dist/django/`
- **nginx** runs an nginx container that handles static content and forwarding requests to django
- **parcel** runs a nodejs container that builds all of the client assets to `dist/client/`

## Build Process

1. Client assets are built in the **parcel** container and written to `dist/client/`
2. Django static files are collected and written to `dist/django/`
3. The image for the **nginx** container is built and copies the files under `dist/` to `/var/www/static`

## Static Files

Javascript and CSS files that are built in the **parcel** container are baked into the **nginx** container.

However, uploaded files (such as artist photos) are accessed at runtime using a volume.

1. **django** writes uploads to disk inside the container
2. A write mount is created between **django** and the host, storing the uploaded files at `/var/rouxcyrgallery/dev/uploads/`
3. A read mount is created between the host and **nginx**
