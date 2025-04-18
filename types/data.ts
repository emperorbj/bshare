

export interface User{
    name?:string,
    email:string,
    password:string
}


export interface RegisterProps {
    isLoading:boolean,
    register:(data: { name: string; email: string; password: string; }) => Promise<{ success: boolean; error?: string }>,
    user:User,
    error: string | null;
    
    
  }

export interface LoginProps {
    isLoading:boolean,
    login:(data: { name?: string; email: string; password: string; }) => Promise<{ success: boolean; error?: string }>,
    user:User,
    error: string | null;
    
    
  }
