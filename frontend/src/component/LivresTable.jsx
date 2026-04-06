import { useState } from "react";
import Form from "./Form";
import { useSelector, useDispatch } from "react-redux";
import { deleteBook, deleteBooks } from "../store/booksSlice";

function LivresTable () {
    const [showForm, setShowForm] = useState(false);
    const [editBook, setEditBook] = useState({});

    const books = useSelector(state => state.books);

    const dispatch = useDispatch();

    const closeForm = () => {
        setShowForm(false);
    }

    const add = ()=> {
        setEditBook({})
        setShowForm(true);
    }
    const edit = (book)=>{
        setEditBook(book);
        setShowForm(true);
    }

    const supp = (isbn) => {
        // dispatch(deleteBook(isbn));
        deleteBooks(dispatch, isbn);
    }
    return (
        <>
        <div className="table-container">
            <div className="pre-table">
                <h2 className="table-titre">Les livres</h2>
                <button className="ajt-btn" onClick={add}><span>+</span> Ajouter</button>
            </div>
            <div className="table-wrapper">
                <table className="livre-table">
                    <thead>
                        <tr>
                            <th>ISBN</th>
                            <th>Titre</th>
                            <th>Auteur</th>
                            <th>Année</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(b =>( 
                            <tr key={b.ISBN}>
                                <td>{b.ISBN}</td>
                                <td>{b.titre}</td>
                                <td>{b.auteur}</td>
                                <td>{b.annee}</td>
                                <td className="action-cell">
                                    <button className="row-btn edit-btn" onClick={() => edit(b)}>Modifier</button>
                                    <button className="row-btn delete-btn" onClick={()=>supp(b.ISBN)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        {showForm && <Form onClose={()=> closeForm()} book={editBook} />}
        </>
    )
}

export default LivresTable;