import { EditActions, EditActionTypes } from "app/modules/markdown/actions/edit";

export interface State {
    save: boolean;
}

export const initialState: State = {
    save: false
}

export function reducer(state = initialState, action: EditActions) {
    switch (action.type) {
        case EditActionTypes.Save: {
            return {
                ...state,
                save: true
            }
        }
        default:
            return state;
    }
}

export const getSave = (state: State) => state.save;