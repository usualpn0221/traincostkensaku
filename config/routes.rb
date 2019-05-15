Rails.application.routes.draw do
  root 'checks#index'
  post 'checks_new' => 'checks#new'
  post 'checks_show' => 'checks#show'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
