# frozen_string_literal: true

json.extract! payment, :id, :amount, :phone_number, :tenant_name, :nin_number, :date_range, :property, :created_at,
              :updated_at
json.url payment_url(payment, format: :json)
