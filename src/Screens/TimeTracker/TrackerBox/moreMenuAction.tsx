import { IoPause, IoRefresh } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { Colors } from '../../../Utilities/Colors';

export const MenuItem = (
  pauseFunction: (string: string) => void,
  resetFunction: (string: string) => void,
  deleteFunction: (string: string) => void,
  activityId: string,
  isPause: boolean,
  isRunnuing: boolean,
  currentTimer: any
) => {
  const menuItems = [
    {
      id: 'delete',
      label: 'Delete',
      onClick: () => deleteFunction(activityId),
      icon: <MdDelete fontSize="16" color="red" />,
    },
  ];

  if (isRunnuing || isPause) {
    menuItems.push({
      id: 'pause',
      label: 'Pause',
      onClick: () => pauseFunction(activityId),
      icon: <IoPause fontSize="16" color={Colors.darkOrgane} />,
    });
  }

  if (currentTimer?.durationInSeconds && currentTimer?.durationInSeconds > 0) {
    menuItems.push({
      id: 'reset',
      label: 'Reset',
      onClick: () => resetFunction(activityId),
      icon: <IoRefresh fontSize="16" color="blue" />,
    });
  }

  return menuItems;
};
