import { useEffect, useState } from "react";
import axios from "axios";
import Books from "./books";

function Read() {

    const [data, setData] = useState([]);

    useEffect(
        () => {

            axios.get('http://localhost:4000/api/books')//get data from server.js
                .then(
                    (response) => {
                        setData(response.data)
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                    }
                )

        }, []
    );

    //annonomus function to reload the page
    const Reload = (e) => {
        axios.get('http://localhost:4000/api/books')//get data from server.js
                .then(
                    (response) => {
                        setData(response.data)
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                    }
                )
    }

    return (
        <div>
            <h2>Hello from Read Component!</h2>
            {/* passing the data and reload variable function to the child books.js */}
            <Books myBooks={data} ReloadData={Reload}></Books>
        </div>
    );

}

export default Read;