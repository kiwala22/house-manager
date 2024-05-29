# frozen_string_literal: true

json.partial! "properties/property", property: @property

if @current_rental
  json.rental @current_rental, partial: "rentals/rental", as: :rental
else
  json.rental nil
end
