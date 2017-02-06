class QuestionsController < ApplicationController
	before_action :authenticate_user!, only: [:create]
	skip_before_action :verify_authenticity_token
	respond_to :json
	
	def index
		@questions = Question.all
		render json: @questions
	end

	def show
		@questions = Question.includes(:answers).where(id: params[:id])
		render json: @questions, include: {answers: {only: [:id, :answer]}}
	end

	def create
		@questions = current_user.questions.new question_params
		if @questions.save
			render json: @questions, status: 201
		else
			render json: @questions.errors, status: 422
		end
	end

	private
	def question_params
		params.require(:question).permit(:question)
	end
end
