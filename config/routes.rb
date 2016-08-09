Rails.application.routes.draw do
  namespace :api do
    resources :users, only: [:new, :create, :show, :update]
    resource :session, only: [:new, :create, :destroy]
    resources :tracks, only: [:index, :show, :create, :update, :destroy] do
      resources :comments, only: [:index, :create, :update, :destroy]
    end

    get "users/url/:custom_url", to: "users#find_by_url"
    patch "users/url/:custom_url", to: "users#update_by_url"
  end
  root to:"static_pages#root"
end
