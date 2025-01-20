
export const useGetUserID = () =>{
    return window.localStorage.getItem("userID")
};

//update with user prefernces, not userID, dark mode like things