FROM ruby:3.2.2

ENV RAILS_SERVE_STATIC_FILES=true
ENV RAILS_LOG_TO_STDOUT=true

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev postgresql-client libxslt1-dev libxml2-dev libvips42 libheif1 libpoppler-glib8 libglib2.0-dev tzdata

# Install Node.js and npm (which includes npx)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Install Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y yarn

WORKDIR /usr/src/app

RUN gem install bundler -v 2.4.10

COPY Gemfile Gemfile.lock ./

# RUN bundle config set --local without 'development test'

RUN bundle install

COPY . .

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

# Install JavaScript dependencies
RUN yarn install

RUN yarn build

# Precompile assets
ARG SECRET_KEY_BASE
ENV SECRET_KEY_BASE=${SECRET_KEY_BASE}
RUN RAILS_ENV=production bundle exec rails assets:precompile

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]