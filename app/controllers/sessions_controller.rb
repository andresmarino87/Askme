class SessionsController < Devise::SessionsController  
	clear_respond_to  
	respond_to :json

	def new
		super
	end
end
