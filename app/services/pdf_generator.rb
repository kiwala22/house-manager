# frozen_string_literal: true

# app/services/pdf_generator.rb
require "prawn"

class PdfGenerator
  def self.create_payment_pdf(payment)
    Prawn::Document.new do |pdf|
      pdf.font "Times-Roman"
      pdf.text "LandLord Rent Receipt", size: 20, style: :bold, align: :center
      pdf.move_down 40

      pdf.font "Times-Roman"
      pdf.text("Date: <u>#{payment.created_at.strftime("%d/%m/%Y")}</u>",
               inline_format: true, size: 15)
      pdf.move_down 15

      pdf.font "Times-Roman"
      pdf.text("Tenant's Name: <u>#{payment.tenant_name}</u>",
               inline_format: true, size: 15)
      pdf.move_down 30

      pdf.font "Times-Roman"
      pdf.text("Tenant's Rental Property Address: <u>#{payment.property.branch}</u>#{Prawn::Text::NBSP * 10}Room Number: <u>#{payment.property.room_number}</u>",
               inline_format: true, size: 15)

      pdf.move_down 20

      pdf.font "Times-Roman"
      pdf.text("Amount Of Rent Paid: shs.<u>#{payment.amount}</u>#{Prawn::Text::NBSP * 27}Balance: shs.<u>#{payment.property.price - payment.amount}</u>",
               inline_format: true, size: 15)
      pdf.move_down 20

      pdf.font "Times-Roman", style: :bold
      formatted_date_range = payment.date_range.to_s.to_s.gsub("...", "                 to:          ")
      pdf.text "From:   #{formatted_date_range}", size: 15
      pdf.move_down 40

      pdf.font "Times-Roman"
      pdf.text("LandLord Name: #{payment.user.username}", size: 15, inline_format: true)
      pdf.move_down 20

      pdf.font "Times-Roman"
      pdf.text("Phone Number: <b>0704634829</b>", size: 15, inline_format: true)
      pdf.move_down 30

      pdf.font "Times-Roman", style: :bold
      pdf.text "This receipt is an electronic document and does not require a signature to be legally valid.
       All payments are subject to the terms and conditions as agreed upon in the rental agreement.
       This document is confidential and intended solely for the use of the individual or entity to whom it is addressed.",
               align: :center, size: 10, style: :italic
    end.render
  end
end
