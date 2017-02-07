class AnswersController < ApplicationController
	before_action :authenticate_with_in_session!, only: [:create]
	respond_to :json
	
    ##
    # Returns the information of an specific Answer
    #
    # Params By url
	#	[
	#	  {
	#	    "id": 1,
	#	    "user_id": 1,
	#	    "question_id": 1,
	#	    "answer": "Yes it is a question!",
	#	    "created_at": "2017-02-04T19:53:40.917Z",
	#	    "updated_at": "2017-02-04T19:53:40.917Z"
	#	  }
	#	]
    #
    # Returns
    #  account: the bank account being consulted
	def show
		@answer = Answer.where(question_id: params[:question_id],id: params[:id])
		render json: @answer
	end

    ##
    # Create a new answer for a question
    #
    # Params By url
    #   question_id = Question's id
    #   
    #   body
	#	{
	#		"answer":{
	#			"answer":"The Answer is 42"
	#		}
	#	}
    #
    # Returns
	#	{
	#	  "id": 23,
	#	  "user_id": 1,
	#	  "question_id": 1,
	#	  "answer": "The Answer is 42",
	#	  "created_at": "2017-02-07T04:24:43.145Z",
	#	  "updated_at": "2017-02-07T04:24:43.145Z"
	#	}    #
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
