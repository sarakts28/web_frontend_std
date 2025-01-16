import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '../Store';

export const useThunkDispatch = () => useDispatch<ThunkDispatch>();
