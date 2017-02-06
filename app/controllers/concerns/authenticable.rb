module Authenticable
	##
	# Authenticates an user
	def authenticate_with_in_session!
		if(!(user_signed_in?))
			unauthorized_access
		end
	end

	##
	# Verifies that there is a user logged in
	def user_signed_in?
		current_user.present?
	end

	def unauthorized_access
		render json: { errors: "Not authorized" }, status: :unauthorized
	end
end