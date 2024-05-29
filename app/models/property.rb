# frozen_string_literal: true

class Property < ApplicationRecord
  enum status: { occupied: 0, vacant: 1 }
  enum branch: { entebbe: 0, makindye: 1 }

  has_many :payments
  belongs_to :user
  has_many :rentals
  has_one :current_rental, -> { where(active: true) }, class_name: "Rental"
  has_one :tenant, through: :current_rental

  scope :ordered, -> { order(id: :asc) }

  validates :branch, :price, :status, :roomNumber, presence: true

  def current_rental_with_tenant
    current_rental
  end
end
