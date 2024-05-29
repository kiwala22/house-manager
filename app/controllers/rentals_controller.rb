# frozen_string_literal: true

class RentalsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_rental, only: %i[show edit update destroy]

  # GET /rentals
  def index
    @rentals = Rental.includes(:property, :tenant).all
  end

  # GET /rentals/1
  def show
  end

  # GET /rentals/new
  def new
    @rental = Rental.new
  end

  # GET /rentals/1/edit
  def edit; end

  # POST /rentals
  def create
    @rental = current_user.rentals.build(rental_params)

    if @rental.save
      @rental.property.update(status: 'occupied')
      redirect_to @rental, notice: 'Rental was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /rentals/1
  def update
    if @rental.update(rental_params)
      redirect_to @rental, notice: 'Rental was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /rentals/1
  def destroy
    @rental.destroy
    redirect_to rentals_url, notice: 'Rental was successfully destroyed.'
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_rental
    @rental = current_user.rentals.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def rental_params
    params.require(:rental).permit(:tenant_id, :property_id, :deposit, :start_date, :end_date)
  end
end
