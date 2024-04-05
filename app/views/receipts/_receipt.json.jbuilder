# frozen_string_literal: true

json.extract! receipt, :id, :amount_paid, :date_range, :tenant_name, :user_id, :payment_id, :created_at, :updated_at
json.url receipt_url(receipt, format: :json)
