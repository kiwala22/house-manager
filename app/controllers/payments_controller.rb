# frozen_string_literal: true

class PaymentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_payment, only: %i[download_pdf show edit update destroy formatted_date_range]
  before_action :set_property, only: %i[new create]

  # GET /payments or /payments.json
  def index
    @payments = Payment.includes(:user).all.ordered
  end

  # GET /payments/1 or /payments/1.json
  def show; end

  # GET /payments/new
  def new
    @payment = Payment.new
  end

  # GET /payments/1/edit
  def edit; end

  # POST /payments or /payments.json
  def create
    @payment = @property.payments.new(payment_params.merge(
      user_id: current_user.id,
    ))

    respond_to do |format|
      if @payment.save
        format.html { redirect_to payment_url(@payment), notice: "Payment was successfully created." }
        format.json { render :show, status: :created, location: @payment }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @payment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /payments/1 or /payments/1.json
  def update
    respond_to do |format|
      if @payment.update(payment_params)
        format.html { redirect_to payment_url(@payment), notice: "Payment was successfully updated." }
        format.json { render :show, status: :ok, location: @payment }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @payment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /payments/1 or /payments/1.json
  def destroy
    @payment.destroy

    respond_to do |format|
      format.html { redirect_to payments_url, notice: "Payment was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def download_pdf
    respond_to do |format|
      format.pdf do
        pdf = PdfGenerator.create_payment_pdf(@payment)
        send_data pdf, filename: "payment_receipt_#{@payment.id}.pdf", type: "application/pdf", disposition: "inline"
      end
    end
  end

  private

  def set_property
    @property = Property.find(params[:property_id])
  end

  def set_payment
    @payment = Payment.find(params[:id])
  end

  def payment_params
    params.require(:payment).permit(:payment_date, :amount)
  end
end
