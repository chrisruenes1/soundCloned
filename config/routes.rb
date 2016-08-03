Rails.application.routes.draw do
  namespace :api do
    resources :users, only: [:new, :create, :show]
    resource :session, only: [:new, :create, :destroy]
  end
  root to:"static_pages#root"
end
