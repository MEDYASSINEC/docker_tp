import { useDispatch } from "react-redux";
import { addBook, addBooks, editBook, editBooks } from "../store/booksSlice";

function Form ( {onClose, book} ) {
    const dispatch = useDispatch();
    const add = Object.keys(book).length === 0 ? true : false;
    const submit = (e)=> {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());    

        if (add) {
            // dispatch(addBook(data));
            addBooks(dispatch, data);
        }else {
            // dispatch(editBook(data));
            editBooks(dispatch, data);
        }

        onClose();
    }
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>Ajouter un livre</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <form className="modal-form" onSubmit={(e)=>submit(e)}>
                    <div className="form-group">
                        <label>ISBN</label>
                        <input type="text" name="ISBN" placeholder="ISBN du livre" defaultValue={book?.ISBN || ""} />
                    </div>

                    <div className="form-group">
                        <label>Titre</label>
                        <input type="text" name="titre" placeholder="Titre du livre" defaultValue={book?.titre || ""} />
                    </div>

                    <div className="form-group">
                        <label>Auteur</label>
                        <input type="text" name="auteur" placeholder="Nom de l’auteur" defaultValue={book?.auteur || ""} />
                    </div>

                    <div className="form-group">
                        <label>Année</label>
                        <input type="number" name="annee" placeholder="2024" defaultValue={book?.annee || 2025} />
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn cancel" onClick={onClose}>Annuler</button>
                        <button type="submit" className="btn confirm">
                            {add ? 'Ajouter': 'Modiifer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Form;