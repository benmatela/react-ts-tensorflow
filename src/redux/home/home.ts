import { createSlice } from "@reduxjs/toolkit";
import { IToast } from "../../models/toast.model";

// https://dev.to/johongirr/react-todo-crud-app-with-redux-and-typescript-584m
// https://www.youtube.com/watch?v=iBUJVy8phqw&ab_channel=NetN

// Shape of toasts array
interface IDeviceInterface {
  toast: IToast;
  toasts: IToast[];
}

// Initial devices state
const initialState: IDeviceInterface = {
  toast: {} as IToast,
  toasts: [],
};

/**
 * Redux-Toolkit uses `Immutable.js` which allows us to mutate(change) `STATE` but
 * in the background everything works as immutated state.
 */
export const homeSlice = createSlice({
  /**
   * 🍰  SLICE NAME
   *
   * A slice of cake(a particular domain eg orders, products) 🍰 taken from a whole cake 🥮 (`Our app`)
   *
   */
  name: "home",
  /**
   * 🍽️ STATE
   *
   * Initial state of your plate
   *
   */
  initialState,
  /**
   *  👨🏿‍🍳 REDUCER
   *
   *  Response from a called `🍴 ACTION`.
   *  Performs actions to our immutable `🍽️ STATE` and returns the new state.
   *
   */
  reducers: {
    /**
     *
     * Adds a new `ℹ️ TOAST` to the `🍽️ STATE`.
     *
     * 🍴 ACTION
     *
     * @param {any} state
     * @param {IToast} newToast
     *
     */
    addToast: (
      state,
      {
        payload: {
          id,
          message,
          toastType,
          payload,
          isActive,
          headerText,
          timestamp,
          toastOwner,
        },
      }
    ) => {
      try {
        let newToast: IToast = {
          id,
          message,
          toastType,
          payload,
          isActive,
          headerText,
          timestamp,
          toastOwner,
        };
        console.log("newToast: ", newToast);

        state.toast = newToast;

        console.log("[ADDED NEW TOAST]: ", newToast);
      } catch (error) {
        console.error(error);
      }
    },
    /**
     *
     * Deletes a `ℹ️ TOAST` from the `🍽️ STATE`.
     *
     * 🍴 ACTION
     *
     * @param {any} state
     * @param {IToast} newToast
     *
     */
    deleteToast: (state, { payload: { toastId } }) => {
      try {
        console.log("delete toast: ", toastId);

        state.toast = initialState.toast;

        console.log("[DELETED TOAST]: ", toastId);
      } catch (error) {
        console.error(error);
      }
    },
    /**
     *
     * Edits a `ℹ️ TOAST` in a `🍽️ STATE`.
     *
     * 🍴 ACTION
     *
     * @param {any} state
     * @param {string} deviceId
     *
     */
    editToast: (state, { payload: { editedToast } }) => {
      try {
        console.log("editedToast: ", editedToast);

        // Edit current toast
        state.toast = editedToast;

        console.log("[UPDATED TOAST]: ", editedToast);
      } catch (error) {
        console.error(error);
      }
    },
  },
});

// `🍴 ACTIONS` for telling the `👨🏿‍🍳 REDUCER` what to do with the `🍽️ STATE`, they can also include
// payload for changing the state
export const { addToast, deleteToast, editToast } = homeSlice.actions;

// `👨🏿‍🍳 REDUCER` to change the `🍽️ STATE` through an `🍴 ACTION`
export default homeSlice.reducer;
