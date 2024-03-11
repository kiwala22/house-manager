# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :managers, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  devise_for :users, skip: %i[sessions registrations]
  devise_scope :user do
    get 'login', to: 'users/sessions#new', as: :new_user_session, defaults: { format: :html }
    post 'login', to: 'users/sessions#create', as: :user_session, defaults: { format: :json }
    get 'logout', to: 'users/sessions#destroy', as: :destroy_user_session, defaults: { format: :json }
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'home#index'

  scope '/', defaults: { format: :json } do
    resources :properties do
      resources :payments, shallow: true
    end
  end

  # unmatched routes for the FE
  get '*unmatched', to: 'home#index'
  # get '*path', to: 'home#index', constraints: ->(request) { !request.xhr? && request.format.html? }
end
