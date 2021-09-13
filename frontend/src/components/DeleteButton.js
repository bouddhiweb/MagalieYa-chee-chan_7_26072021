import '../style/main.scss'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Delete from "../constants/deletePost";

function DeleteButton() {


    return (
        <span onClick={{handleSubmit}} className='feed__post__icon'><DeleteOutlineIcon/></span>
    )
}

export default DeleteButton



