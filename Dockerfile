FROM ruby:3.2.2

# Set environment variables
ENV RAILS_SERVE_STATIC_FILES=true \
    RAILS_LOG_TO_STDOUT=true \
    SECRET_KEY_BASE="64fd4b8f8bf15d2c9683ae4382c01acfca30424701cf83e9587a721ac34d14b9181fb617a29b5c4210f3ec559df50b2c4a182090b2bacb87042503c5cabaaaf0"

# Install dependencies
RUN apt-get update -qq && apt-get install -y \
    build-essential libpq-dev postgresql-client libxslt1-dev libxml2-dev \
    libvips42 libheif1 libpoppler-glib8 libglib2.0-dev tzdata \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update && apt-get install -y yarn

WORKDIR /usr/src/app

# Install bundler and gems
RUN gem install bundler -v 2.4.10
COPY Gemfile Gemfile.lock ./
RUN bundle install

# Precompile assets
RUN RAILS_ENV=production bundle exec rails assets:precompile

# Copy application code
COPY . .

# Setup entrypoint
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

# Expose port
EXPOSE 3000

# Start the Rails server
CMD ["rails", "server", "-b", "0.0.0.0"]
