# frozen_string_literal: true

class ReceiptsController < InheritedResources::Base
  before_action :authenticate_user!
  before_action :set_payment, only: [:create]

  def create
    @receipt = @payment.receipts.build(
      amount_paid: @payment.amount_paid,
      date_range: @payment.date_range,
      tenant_name: @payment.tenant_name,
      user_id: current_user.id,
    )
    respond_to do |format|
      if @receipt.save
        format.html { redirect_to receipt_url(@receipt), notice: "Receipt was successfully created." }
        format.json { render :show, status: :created, location: @receipt }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @receipt.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def set_payment
    @payment = Payment.find(params[:payment_id])
  end
end
