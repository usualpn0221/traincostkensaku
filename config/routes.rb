Rails.application.routes.draw do
  root 'checks#index'
  get 'checks/index'
  post 'checks_new' => 'checks#new'
  get 'checks/create'
  get 'checks/delete'
  get 'checks/show'
  get 'checks/edit'
  get 'checks/update'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
