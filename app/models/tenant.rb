# frozen_string_literal: true

class Tenant < ApplicationRecord
  has_many :payments
  belongs_to :user
end
