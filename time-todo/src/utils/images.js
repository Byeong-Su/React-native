import CheckBoxOutline from '../../assets/icons/check_box_outline.png';
import CheckBox from '../../assets/icons/check_box.png';
import DeleteForever from '../../assets/icons/delete_forever.png';
import Edit from '../../assets/icons/edit.png';

const prefix =
    'https://firebasestorage.googleapis.com/v0/b/react-native-simple-chat-83b37.appspot.com/o';

export const images = {
    uncompleted: CheckBoxOutline,
    completed: CheckBox,
    delete: DeleteForever,
    update: Edit,

    logo: `${prefix}/logo.png?alt=media`,
    photh: `${prefix}/photo.png?alt=media`,
};