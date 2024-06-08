# frozen_string_literal: true

class Rental < ApplicationRecord
  belongs_to :tenant
  belongs_to :property
  belongs_to :user
  # has_many :payments

  validates :start_date, :end_date, presence: true
  validate :end_date_after_start_date

  private

  def end_date_after_start_date
    if end_date <= start_date
      errors.add(:end_date, "must be after the start date")
    end
  end
end
