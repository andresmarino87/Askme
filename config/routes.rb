Rails.application.routes.draw do
	root :to => 'home#index' 
	devise_for :users, :controllers => {sessions: 'sessions', registrations: 'registrations'}
	resources :questions, only: [:index, :show, :create] do
		resources :answers, only: [:show, :create]
	end
end
