# frozen_string_literal: true

class Payment < ApplicationRecord
  belongs_to :property
  belongs_to :user
  has_one :receipt

  validates :payment_date, :amount, presence: true

  scope :ordered, -> { order(id: :desc) }
end
