# frozen_string_literal: true

# app/views/properties/_property.json.jbuilder

json.extract! property, :id, :branch, :price, :room_number, :status, :created_at, :updated_at, :user
json.url property_url(property, format: :json)

json.payments property.payments do |payment|
  json.partial! 'payments/payment', payment:
end
