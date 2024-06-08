# frozen_string_literal: true

class Payment < ApplicationRecord
  # belongs_to :rental
  # has_one :tenant, through: :rental
  # has_one :property, through: :rental
  belongs_to :user

  validates :payment_date, :amount, presence: true

  scope :ordered, -> { order(id: :desc) }
end
