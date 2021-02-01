# Books-api
This an example of Rest framework api built using express.js.
This should be tested with POSTMAN.

# Endpoints and their Uses

 1. **GET**: </br>
    **URL** : https://l1w5qlr3ke.execute-api.us-east-1.amazonaws.com/dev/books</br>
    **Body**:  Not required</br>
    **Response**:  List of all the books present in the database</br>
	
 2. **POST**:</br>
    **URL**: https://l1w5qlr3ke.execute-api.us-east-1.amazonaws.com/dev/books</br>
    **Body**: In postman select body->choose raw option -> Json format.</br>
    Example data to be inserted in the body.</br>
                    ``` {
                        "name" : "name of the book",
                        "price" : "price of that book",
                        "author" : "author of that book"
                    }```</br>
    **Response**: </br>
    ```{ "_id": "unique id generated", name" : "name of the book", "price" : "price of that book", "author" : "author of that book" }```</br>
			
 3. **Patch** (requires book id):</br>
    **URL**: https://l1w5qlr3ke.execute-api.us-east-1.amazonaws.com/dev/books/{id}</br>
    **Body**: In postman select body->choose raw option -> Json format.</br>
    Example data to be inserted in the body.</br>
                    ``` {
                        "name" : "name of the book",
                        "price" : "price of that book",
                        "author" : "author of that book"
                    }```(All fields are required during updation too)</br>
						 
 4.  **GET**  (particular book):</br>
    **URL** : https://l1w5qlr3ke.execute-api.us-east-1.amazonaws.com/dev/books/{id}</br>
    **Body**:  Not required</br>
    **Response**:  information about that book</br>
 5. **DELETE** (requires book id):</br>
    **URL** : https://l1w5qlr3ke.execute-api.us-east-1.amazonaws.com/dev/books/{id}</br>
	**Body**:  Not required

	
