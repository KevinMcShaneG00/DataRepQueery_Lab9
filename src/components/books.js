import BookItem from "./bookItem";

function Books(props){

    return props.myBooks.map(
        (book)=>{
            // reload the page with each book and pass the reload function to bookItem.js
            return <BookItem myBook={book} key={book._id} Reload={()=>{props.ReloadData();}}></BookItem>
        }
    );

}

export default Books;