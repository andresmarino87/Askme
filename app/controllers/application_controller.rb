class ApplicationController < ActionController::Base
	protect_from_forgery with: :null_session
	after_action :set_csrf_cookie

	include Authenticable

	def set_csrf_cookie
		cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
	end

	def verified_request?
		super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
	end
end
