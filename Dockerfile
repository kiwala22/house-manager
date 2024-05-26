FROM ruby:3.2.2

ENV RAILS_SERVE_STATIC_FILES=true
ENV RAILS_LOG_TO_STDOUT=true

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev postgresql-client libxslt1-dev libxml2-dev libvips42 libheif1 libpoppler-glib8 libglib2.0-dev tzdata

WORKDIR /usr/src/app

RUN gem install bundler -v 2.4.10

COPY Gemfile Gemfile.lock ./

# RUN bundle config set --local without 'development test'

RUN bundle install

COPY . .

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

# Precompile assets
RUN RAILS_ENV=production bundle exec rake assets:precompile

EXPOSE 3000

# CMD ["bundle", "exec", "rails", "server"]
CMD ["rails", "server", "-b", "0.0.0.0"]