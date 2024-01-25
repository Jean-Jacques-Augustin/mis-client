// userSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface UserSliceInterface {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    token: string;
    isLogged: boolean;
    profileImage: string;
}

interface InitialState {
    user: UserSliceInterface;
}

const initialState: InitialState = {
    user: {
        id: '',
        name: '',
        email: '',
        isAdmin: false,
        token: '',
        isLogged: false,
        profileImage: '',
    } as UserSliceInterface,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserSliceInterface>) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = initialState.user;
        },
        updateProfileImage: (state, action: PayloadAction<string>) => {
            if (state.user) {
                state.user.profileImage = action.payload;
            }
        },
        updateStatus: (state, action: PayloadAction<boolean>) => {
            if (state.user) {
                state.user.isLogged = action.payload;
            }
        }
    },
});

export const {setUser, clearUser, updateStatus, updateProfileImage} = userSlice.actions;
export default userSlice.reducer;
