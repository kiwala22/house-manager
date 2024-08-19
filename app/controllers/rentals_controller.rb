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
  
    respond_to do |format|
      if @rental.save
        @rental.property.update(status: 'occupied')
        format.html { redirect_to rental_url(@rental), notice: 'Rental was successfully created.' }
        format.json { render :show, status: :created, location: @rental }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @rental.errors, status: :unprocessable_entity }
      end
    end
  end
  

  # PATCH/PUT /rentals/1
  def update
    respond_to do |format|
      if @rental.update(rental_params)
        format.html { redirect_to tenant_url(@rental), notice: 'Rental was successfully updated.' }
        format.json { render :show, status: :ok, location: @rental }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @rental.errors, status: :unprocessable_entity }
      end
    end
  end 

  # DELETE /rentals/1
  def destroy
    @rental.destroy
    @rental.property.update(status: 'vacant')

    respond_to do |format|
      format.html { redirect_to rentals_url, notice: 'Rental was successfully destroyed.' }
      format.json { head :no_content }
    end
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
