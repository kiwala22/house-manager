# frozen_string_literal: true

class Rental < ApplicationRecord
  belongs_to :tenant
  belongs_to :property
  belongs_to :user
  # has_many :payments

  # Scope for ordering rentals by most recent
  scope :ordered, -> { order(id: :desc) }

  # Validations
  validates :start_date, :end_date, :deposit, presence: true
  validate :end_date_after_start_date
  validate :property_must_be_vacant, on: :create

  private

  # Custom validation to ensure the end date is after the start date
  def end_date_after_start_date
    if end_date <= start_date
      errors.add(:end_date, "must be after the start date")
    end
  end

  # Custom validation to ensure the property is vacant before renting
  def property_must_be_vacant
    if property&.status == "occupied"
      errors.add(:property, "is currently occupied and cannot be rented")
    end
  end
end
