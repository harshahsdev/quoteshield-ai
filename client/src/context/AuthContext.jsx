import { createContext, useState, useContext } from "react";
import { loginUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token , setToken]= useState(null);
    const [loading, setLoading]= useState(false);

    const login = async(Credential) => {
        setLoading(true);

        try{
            const data = await loginUser(Credential);
            localStorage.setItem("token", data.token);

            console.log(data);
            
            setUser(data.user);
            setToken(data.token);
            return data;
        }finally{
            setLoading(false);
        }
    }
    const logout=()=>{
        setUser(null);
        setToken(null);
    };
    
    return(
        <AuthContext.Provider 
        value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
    }}
    >
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);