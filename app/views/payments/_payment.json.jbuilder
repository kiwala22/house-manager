# frozen_string_literal: true

json.extract! payment, :id, :amount, :payment_date, :created_at,
              :updated_at
json.url payment_url(payment, format: :json)
