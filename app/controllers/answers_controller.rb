class AnswersController < ApplicationController
    before_action :authenticate_with_in_session!, only: [:create]
	skip_before_action :verify_authenticity_token
	respond_to :json
	
	def show
		@answer = Answer.where(question_id: params[:question_id],id: params[:id])
		render json: @answer
	end

	def create
		@answer = current_user.answers.new(answer_params.merge(question_id: params[:question_id]))
		if @answer.save
			render json: @answer, status: 201
		else
			render json: @answer.errors, status: 422
		end
	end

	private
	def answer_params
		params.require(:answer).permit(:answer)
	end
end
