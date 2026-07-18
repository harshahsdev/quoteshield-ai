import api from "../api/api";

export const registerUser = async(userData)=>{
    const res = await api.post("/users/register", userData);
    return res.data;
} ;
export const loginUser = async(Credential)=>{
    const res = await api.post("/users/login", Credential);
    return res.data;
};
export const refreshToken = async ()=>{
    const res = await api.get("/users/token");
    return res.data;
}