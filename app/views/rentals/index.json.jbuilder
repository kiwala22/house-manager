# frozen_string_literal: true

json.array! @rentals, partial: 'rentals/rental', as: :rental
