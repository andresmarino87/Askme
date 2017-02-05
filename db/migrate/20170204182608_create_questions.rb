class CreateQuestions < ActiveRecord::Migration[5.0]
	def change
    	create_table :questions do |t|
			t.references :user, index: true, foreign_key: true
      		t.string :question, null: false, limit: 400
			t.timestamps
	    end
	end
end
