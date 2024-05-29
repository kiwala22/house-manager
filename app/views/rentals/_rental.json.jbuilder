# frozen_string_literal: true

# app/views/rentals/_rental.json.jbuilder
json.extract! rental, :id, :deposit, :active, :start_date, :end_date, :tenant, :property, :created_at,
              :updated_at
json.url rental_url(rental, format: :json)
