import { useSelector } from 'react-redux';

function Edit(){

    const movieToEdit = useSelector(store => store.edit);

    console.log(movieToEdit);

    const handleEdit = (event) => {
        event.preventDefault();
    }

    return(
        <div>
            
        </div>
    ) // end return

} // end edit fn

export default Edit;

