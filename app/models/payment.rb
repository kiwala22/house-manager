# frozen_string_literal: true

class Payment < ApplicationRecord
  belongs_to :property
  belongs_to :user
  has_one :receipt

  validates :amount, :tenant_name, :nin_number, :phone_number, presence: true
  validate :date_range_format
  scope :ordered, -> { order(id: :desc) }

  private

  def date_range_format
    unless date_range.is_a?(Range)
      errors.add(:date_range, 'must be a range')
      return
    end

    return if date_range.begin.is_a?(Date) || date_range.end.is_a?(Date)

    errors.add(:date_range, 'must start and end with date')
  end
end
