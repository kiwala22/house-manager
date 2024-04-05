# frozen_string_literal: true

class Payment < ApplicationRecord
  belongs_to :property
  belongs_to :user
  has_one :receipt
end
