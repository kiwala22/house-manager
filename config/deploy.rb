# frozen_string_literal: true

# config valid for current version and patch releases of Capistrano
lock '~> 3.18.1'

set :application, 'house-manager'
set :repo_url, 'git@github.com:kiwala22/house-manager.git'

# Deploy to the user's home directory
set :deploy_to, "/home/deploy/#{fetch :application}"

append :linked_dirs, 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', '.bundle', 'public/system',
       'public/uploads'

# Only keep the last 5 releases to save disk space
set :keep_releases, 5

set :branch, :main


# Optionally, you can symlink your database.yml and/or secrets.yml file from the shared directory during deploy
# This is useful if you don't want to use ENV variables
# append :linked_files, 'config/database.yml', 'config/secrets.yml'
