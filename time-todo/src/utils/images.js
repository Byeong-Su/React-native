import CheckBoxOutline from '../../assets/icons/check_box_outline.png';
import CheckBox from '../../assets/icons/check_box.png';
import DeleteForever from '../../assets/icons/delete_forever.png';
import Edit from '../../assets/icons/edit.png';
import CalendarIcon from '../../assets/icons/calendar_icon.png';
import BallotIcon from '../../assets/icons/ballot_icon.png';
import AddIcon from '../../assets/icons/add_icon.png';
import PlayIcon from '../../assets/icons/play_icon.png';

const prefix =
    'https://firebasestorage.googleapis.com/v0/b/react-native-simple-chat-83b37.appspot.com/o';

export const images = {
    uncompleted: CheckBoxOutline,
    completed: CheckBox,
    delete: DeleteForever,
    update: Edit,
    calendaricon: CalendarIcon,
    balloticon: BallotIcon,
    addicon: AddIcon,
    playicon: PlayIcon,

    logo: `${prefix}/logo.png?alt=media`,
    photh: `${prefix}/photo.png?alt=media`,
};