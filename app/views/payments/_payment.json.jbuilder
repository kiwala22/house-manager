# frozen_string_literal: true

json.extract! payment, :id, :amount, :phone_number, :tenant_name, :nin_number, :date_range, :property, :created_at,
              :updated_at
json.url property_url(payment, format: :json)
# json.property do
#   json.partial! "properties/property", property: payment.property
# end
