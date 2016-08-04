Rails.application.routes.draw do
  namespace :api do
    resources :users, only: [:new, :create, :show]
    resource :session, only: [:new, :create, :destroy]
    get "users/url/:custom_url", to: "users#find_by_url"
  end
  root to:"static_pages#root"
end
