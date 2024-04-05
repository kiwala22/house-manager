# frozen_string_literal: true

class Receipt < ApplicationRecord
  belongs_to :user
  belongs_to :payment
end