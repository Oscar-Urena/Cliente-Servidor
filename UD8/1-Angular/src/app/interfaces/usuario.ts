export interface Usuario {
    _id?: string;
    name?: string;  
    email: string;
    password: string; 
    role?: string;  
    active?: boolean; 

}

export interface AuthResponse {
  message: string;
  data: {
    accessToken: string;
  };
}


