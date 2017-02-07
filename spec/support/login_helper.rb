module LoginHelper
	def login_user
		user = FactoryGirl.create(:user)
		sign_in user
#		token = ApiKey.create(user: user)
#		@login_user = { id: token[:user_id], token: token[:token], user: user }
	end
end
