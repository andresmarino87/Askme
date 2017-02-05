class RegistrationsController < Devise::RegistrationsController  
	skip_before_action :verify_authenticity_token
	clear_respond_to  
	respond_to :json
end
