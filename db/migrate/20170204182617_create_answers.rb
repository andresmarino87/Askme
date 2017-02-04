class CreateAnswers < ActiveRecord::Migration[5.0]
	def change
	    create_table :answers do |t|
			t.references :user, index: true, foreign_key: true
			t.references :question, index: true, foreign_key: true
      		t.text :answer, null: false, default: "", limit: 5000
			t.timestamps
    	end
  	end
end
