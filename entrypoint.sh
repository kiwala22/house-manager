#!/bin/bash
# Exit on any error
set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f ./tmp/pids/server.pid

# Make sure db is ready to go
# Adding '2>/dev/null' sends output to nowhere in the case of an error and the
# error code also triggers the bash OR to run db:setup
echo "This is running database setups....."
bundle exec rails db:migrate 2>/dev/null || bundle exec rails db:prepare

# Then exec the container's main process (CMD in the Dockerfile).
exec "$@"