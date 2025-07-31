import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "~/store";

import { jwtDecode } from "jwt-decode";
import type { Credential } from "~/types/login";

const initialState: Credential = {
	user: null,
	accessToken: "",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action: PayloadAction<string>) => {
			state.user = jwtDecode(action.payload);
			state.accessToken = action.payload;

			localStorage.setItem("user", JSON.stringify(state.user));
			localStorage.setItem("token", JSON.stringify(state.accessToken));
		},
	},
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.accessToken;
