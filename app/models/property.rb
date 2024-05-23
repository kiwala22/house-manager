# frozen_string_literal: true

class Property < ApplicationRecord
  enum status: { occupied: 0, vacant: 1 }
  enum branch: { entebbe: 0, makindye: 1 }

  has_many :rentals
  has_many :tenants, through: :rentals
  has_many :payments
  belongs_to :user
  scope :ordered, -> { order(id: :asc) }

  validates :branch, :price, :status, :room_number, presence: true
end
