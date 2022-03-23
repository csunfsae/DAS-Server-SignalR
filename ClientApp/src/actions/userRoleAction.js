export const LOGGEDIN = "LOGGEDIN";
export const LOGGEDOUT = "LOGGEDOUT";

export const loggedin = role => ({
    type: LOGGEDIN,
    payload: role
});

export const loggedout = () => ({
    type: LOGGEDOUT
});