class QuestionsController < ApplicationController
#    before_filter :authenticate_user!, only: [:create]
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
        byebug
        @questions = current_user.questions.new(question_params)
        byebug
        user_signed_in?

        if @questions
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
