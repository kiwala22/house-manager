# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :managers, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  devise_for :users, skip: %i[sessions registrations]
  devise_scope :user do
    get "login", to: "users/sessions#new", as: :new_user_session, defaults: { format: :html }
    post "login", to: "users/sessions#create", as: :user_session, defaults: { format: :json }
    get "logout", to: "users/sessions#destroy", as: :destroy_user_session, defaults: { format: :json }
  end

  root "home#index"
  get "payments/:id/download_pdf", to: "payments#download_pdf", as: "download_pdf_payment", defaults: { format: :pdf }

  scope "/", defaults: { format: :json } do
    resources :rentals, only: [:index, :show]
    resources :payments, only: [:index]

    resources :tenants do
      resources :rentals, shallow: true
      resources :payments, shallow: true
    end

    resources :properties do
      resources :rentals
      resources :payments, shallow: true
    end
  end

  # unmatched routes for the FE
  get "*unmatched", to: "home#index"
  # get '*path', to: 'home#index', constraints: ->(request) { !request.xhr? && request.format.html? }
end
