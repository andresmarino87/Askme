class QuestionsController < ApplicationController
	before_action :authenticate_with_in_session!, only: [:create]
	respond_to :json
	
	##
    # Returns all questions
    #
    # Params 
    #
    # Returns
    #  [{
    #		"id": 1,
    #		"user_id": 1,
    #		"question": "is this a question?",
    #		"created_at": "2017-02-04T18:48:07.794Z",
    #		"updated_at": "2017-02-04T18:48:07.794Z"
  	#	},
  	#	{
	#	    "id": 2,
	#	    "user_id": 1,
	#	    "question": "are you sure this is a question?",
	#	    "created_at": "2017-02-04T18:48:28.045Z",
	#	    "updated_at": "2017-02-04T18:48:28.045Z"
	#	}]
	def index
		@questions = Question.all
		render json: @questions
	end

    ##
    # Returns a question with his answers
    #
    # Params By url
    #   id : Question's id 
    #
    # Returns
	#	[
	#	  {
	#	    "id": 1,
	#	    "user_id": 1,
	#	    "question": "is this a question?",
	#	    "created_at": "2017-02-04T18:48:07.794Z",
	#	    "updated_at": "2017-02-04T18:48:07.794Z",
	#	    "answers": [
	#	      {
	#	        "id": 1,
	#	        "answer": "Yes it is a question!"
	#	      },
	#	      {
	#	        "id": 22,
	#	        "answer": "tetteet"
	#	      }
	#	    ]
	#	  }
	#	]
	def show
		@questions = Question.includes(:answers).where(id: params[:id])
		render json: @questions, include: {answers: {only: [:id, :answer]}}
	end

    ##
    # Create a new question
    #
    # Params By url
	#	{
	#		"question":{
	#			"question":"test"
	#		}
	#	}
	#
    # Returns
	#	{
	#		"id":31,
	#		"user_id":1,
	#		"question":"The question?",
	#		"created_at":"2017-02-07T04:17:54.699Z",
	#		"updated_at":"2017-02-07T04:17:54.699Z"
	#	}
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
